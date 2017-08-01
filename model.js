const mongoose = require('mongoose')

const outfitSchema = mongoose.Schema({
  // not sure what this would be-- if it would list photos?
  //wait! just kidding. image = link = string right?? =D
  headpiece: {type: String, required: false},
  body: {type: String, required: false},
  bottom: {type: String, required: false},
  shoes: {type: String, required: false},
  accessories: {
    accessoryOne: String,
    accessoryTwo: String,
    accessoryThree: String,
    accessoryFour: String,
    accessoryFive: String,
    required: false
    //not sure what to do if they have more than five accessories?
  },
  publishDate: {type: Date, default: Date.now()}
});

outfitSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    headpiece: this.headpiece,
    body: this.body,
    bottom: this.bottom,
    shoes: this.shoes,
    accessories: this.accessories,
    publishDate: this.publishDate
  };
}

const Outfit = mongoose.mode('Outfit', outfitSchema);

modult.exports = {Outfit};
