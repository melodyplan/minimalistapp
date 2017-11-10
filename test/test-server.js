const chai = require('chai')
const chaiHttp = require('chai-http')
const faker = require('faker')
const mongoose = require('mongoose')

const { app, runServer, closeServer } = require('../server')
const { Outfit } = require('../model')
const { DATABASE_URL } = require('../config')
const { TEST_DATABASE_URL } = require('../config')

const should = chai.should()

chai.use(chaiHttp)

function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting database')
    mongoose.connection
      .dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err))
  })
}

/*function seedOutfitData() {
  console.log('seeding outfit data')
  const seedData = []
  for (let i = 1; i <= 10; i++) {
    seedData.push({
      headpiece: faker.random.words(),
      body: faker.random.words(),
      bottom: faker.random.words(),
      shoes: faker.random.words(),
      accessories: faker.random.words()
      //do the rest based on the keys in postman
      //will eventually be image.fashion()?
      //accessories might still need help for multiple accessories? push()?
    })
  }
  return Outfit.insertMany(seedData)
}*/

describe('Minimalist App', function() {
  before(function() {
    return runServer(TEST_DATABASE_URL)
  })

  beforeEach(function() {
    return seedOutfitData()
  })

  afterEach(function() {
    return tearDownDb()
  })

  after(function() {
    return closeServer()
  })

  describe('GET endpoint', function() {
    it('should return all existing outfits', function() {
      let res
      return chai
        .request(app)
        .get('/outfits')
        .then(_res => {
          res = _res
          res.should.have.status(200)
          res.body.should.have.length.of.at.least(1)

          return Outfit.count()
        })
        .then(count => {
          res.body.should.have.length.of(count)
        })
    })

    it('shoud return outfits with right fields', function() {
      let resOutfit
      return chai
        .request(app)
        .get('/outfits')
        .then(function(res) {
          res.should.have.status(200)
          res.should.be.json
          res.body.should.be.a('array')
          res.body.should.have.length.of.at.least(1)

          res.body.forEach(function(outfit) {
            outfit.should.be.a('object')
            outfit.should.include.keys(
              'id',
              'headpiece',
              'body',
              'bottom',
              'shoes',
              'accessories',
              'date'
            )
          })
          resOutfit = res.body[0]
          return Outfit.findById(resOutfit.id)
        })
        .then(outfit => {
          resOutfit.headpiece.should.equal(outift.headpiece)
          resOutfit.body.should.equal(outfit.body)
          resOutfit.bottom.should.equal(outfit.bottom)
          resOutfit.shoes.should.equal(outfit.shoes)
          resOutfit.accessories.should.equal(outift.accessories)
        })
    })
  })

  describe('POST endpoint', function() {
    it('should add a new outfit', function() {
      const newOutfit = {
        headpiece: faker.random.words(),
        body: faker.random.words(),
        bottom: faker.random.words(),
        shoes: faker.random.words(),
        accessories: faker.random.wordss()
      }

      return chai
        .request(app)
        .post('/outfits')
        .send(newOutfit)
        .then(function(res) {
          res.should.have.status(201)
          res.should.be.json
          res.body.should.be.a('object')
          res.body.should.include.keys(
            'id',
            'headpiece',
            'body',
            'bottom',
            'shoes',
            'accessories',
            'date'
          )
          res.body.headpiece.should.equal(newOutfit.headpiece)
          res.body.id.should.not.be.null
          res.body.body.should.equal(newOutfit.body)
          res.body.bottom.should.equal(newOutfit.bottom)
          res.body.shoes.should.equal(newOutfit.shoes)
          res.body.accessories.should.equal(newOutfit.accessories)
          return Outfit.findById(res.body.id)
        })
        .then(function(outfit) {
          outfit.headpiece.should.equal(newOutfit.headpiece)
          outfit.body.should.equal(newOutfit.body)
          outfit.bottom.should.equal(newOutfit.bottom)
          outfit.shoes.should.equal(newOutfit.shoes)
          outfit.accessories.should.equal(newOutfit.accessories)
        })
    })
  })

  describe('PUT endpoint', function() {
    it('should updated fields you send over', function() {
      const updateData = {
        headpiece: 'Sleepless hat',
        body: 'Rise tee',
        bottom: 'black pants',
        shoes: 'Payless boots',
        accessories: 'rosegold ring'
      }

      return Outfit.findOne()
        .then(outfit => {
          updateData.id = outfit.id

          return chai.request(app).put(`/outfits/${outfit.id}`).send(updateData)
        })
        .then(outfit => {
          outfit.headpiece.should.equal(updateData.headpiece)
          outfit.body.should.equal(updateData.body)
          outfit.bottom.should.equal(updateData.bottom)
          outfit.shoes.should.equal(updateData.shoes)
          outfit.accessories.should.equal(updateData.accessories)
        })
    })
  })

  describe('DELETE endpoint', function() {
    it('should delete a post by id', function() {
      let outfit

      return Outfit.findOne()
        .then(_outfit => {
          outfit = _outfit
          return chai.request(app).delete(`/outfits/${outfit.id}`)
        })
        .then(res => {
          res.should.have.status(204)
          return Outfit.findById(outfit.id)
        })
        .then(_outfit => {
          should.not.exist(_outfit)
        })
    })
  })

  it('should list outfits on GET', function() {
    return chai.request(app).get('/outfits').then(function(res) {
      res.should.have.status(200)
      res.should.be.json
    })
  })
})
