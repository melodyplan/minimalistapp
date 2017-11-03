const chai = require('chai')
const chaiHttp = require('chai-http')
const faker = require('faker')
const mongoose = require('mongoose')

const { app, runServer, closeServer } = require('../server')
const { Outfit } = require('../model')
const { DATABASE_URL } = require('..config')
const { TEST_DATABASE_URL } = require('..config')

const should = chai.should()

chai.use(chaiHttp)

function seedOutfitData(){
  console.log('seeding outfit data')
  const seedData = [];
  for (let i=1; i<=10; i++) {
    seedData.push({
      seedData.push({
        headpiece: faker.name.headpiece(),
        //do the rest based on the keys in postman
      })
    })
  }
}


describe('Minimalist App', function() {
  before(function() {
    return runServer()
  })

  after(function() {
    return closeServer()
  })

  it('should list outfits on GET', function() {
    return chai.request(app).get('/outfits').then(function(res) {
      res.should.have.status(200)
      res.should.be.json
    })
  })
})
