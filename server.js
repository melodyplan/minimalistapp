const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = require('./config');
const { Outfit } = require('./model');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/outfits', (req, res) => {
  console.log('outfits');
  Outfit.find()
    .then(outfits => {
      console.log('outfits found');
      res.json(outfits.map(outfit => outfit.apiRepr()));
    })
    .catch(err => {
      console.error(err);
      res
        .status(400)
        .json({ message: 'Bad request error: a field is missing' });
    });
});

app.get('/outfits/:id', (req, res) => {
  Outfit.findById(req.params.id)
    .then(post => res.json(post.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something did not go so well' });
      //want to get a 404 but it's throwing a 500
    });
});

app.post('/outfits', (req, res) => {
  Outfit.create({
    headpiece: req.body.headpiece,
    body: req.body.body,
    bottom: req.body.bottom,
    shoes: req.body.shoes,
    accessories: req.body.accessories,
    occasion: req.body.occasion
  })
    .then(outfits => res.status(201).json(outfits.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

/*app.delete('outfits/:id', (req, res) => {
  console.log(req.params.id);
  Outfit.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).json({ message: 'success!' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something did not do what you intended' });
    });
});*/

app.put('/outfits/:id', (req, res) => {
  console.log(req.body.id);
  if (!(req.params.id && req.body.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }

  const updated = {};
  const updateableFields = [
    'headpiece',
    'body',
    'bottom',
    'shoes',
    'accessories',
    'occasion'
  ];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Outfit.findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedPost => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Something went wrong' }));
});

app.delete('/outfits/:id', (req, res) => {
  Outfit.findByIdAndRemove(req.params.id).then(() => {
    console.log(`Deleted outfit with id \`${req.params.ID}\``);
    res.status(204).end();
  });
});

// app.delete('/outfits/:id', (req, res) => {
//   Outfit.remove(req.params.id);
//   console.log(`Deleted shopping list item \`${req.params.id}\``);
//   res.status(204).end();
// });

app.use('*', function(req, res) {
  res.status(404).json({ message: 'Not Found' });
});

let server;

function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(port, () => {
          console.log(`Your app is listening on ${port}`);
          resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

//close server and return promise
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
