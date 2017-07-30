const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config')
const {Outfit} = require('.models')

const app = express();
app.use(bodyParser.json());

app.get('/outfits', (req,res) => {
  Outfit
    .find()
    .exec()
    .then(outfits => {
      res.json({
        // not sure what to put here because i don't even know what my schema looks like
      })
      .catch(
        err => {
          console.error(err);
          res.status(400).json({message: 'Bad request error: a field is missing'});
        });
      }
    })
})

app.use(express.static('public'));
app.listen(process.env.PORT || 8080);
