const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closerServer} = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('Minimalist App', function() {
  before(function() {
    return runServer();
  });

  after(function() {
    return closerServer();
  });

  it('should list outfits on GET', function() {
    return chai.request(app)
    .get('/outfits')
    .then(function(res) {
      res.should.have.status(200);
      res.should.be.json;

  
    })
  })

})
