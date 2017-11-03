const mongoose = require('mongoose')

const outfitSchema = mongoose.Schema({
  // not sure what this would be-- if it would list photos?
  //wait! just kidding. image = link = string right?? =D
  headpiece: String,
  body: String,
  bottom: String,
  shoes: String,
  accessories: String,
  date: {
    type: Date,
    default: Date.now()
  }
})

outfitSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    headpiece: this.headpiece,
    body: this.body,
    bottom: this.bottom,
    shoes: this.shoes,
    accessories: this.accessories,
    date: this.date
  }
}

const Outfit = mongoose.model('Outfit', outfitSchema)

module.exports = { Outfit }
