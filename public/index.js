function addOutfit() {
  $('.question-form').submit(function(event) {
    event.preventDefault()
    let headpiece = $('.js-headpiece-input').val()
    let body = $('.js-body-input').val()
    let bottom = $('.js-bottom-input').val()
    let shoes = $('.js-shoes-input').val()
    let accessories = []
    accessories.push($('.js-accessories-input').val())
    let occasion = $('.js-occasion-input').val()
    const outfitData = {
      headpiece: headpiece,
      body: body,
      bottom: bottom,
      shoes: shoes,
      accessories: accessories,
      occasion: occasion
    }
    console.log(headpiece, body, bottom, shoes, accessories, occasion)
    $.ajax({
      method: 'POST',
      url: '/outfits',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(outfitData),
      success: function(data) {
        console.log('post request worked!')
        // reference shopping list app getAndDisplayOutfits()
      }
    })
  })
}

function fetchOutfit() {
  $.ajax({
    method: 'GET',
    url: '/outfits',
    dataType: 'json',
    success: function(res) {
      console.log('display/render outfits')
      displayFetchOutfit()
    }
  })
}

//work on lines 51-74 on getting outfits to dislay on landing page
const outfitTemplate =
  '<div class="outfit js-outfit">' +
  '<h3 class="js-outfit-date"><h3>' +
  '<hr>' +
  '<ul class="js-outfit-headpiece">' +
  '</ul>' +
  '<ul class="js-outfit-body">' +
  '</ul>' +
  '<ul class="js-outfit-bottom">' +
  '</ul>' +
  '<ul class="js-outfit-shoes">' +
  '</ul>' +
  '<ul class="js-outfit-accessories">' +
  '</ul>' +
  //should probably add the drop down list here?
  '<div class="outfit-controls">' +
  '<button class="js-outfit-delete">' +
  '<span class="button-label">Delete</span>' +
  '</button>' +
  '</div>' +
  '</div>'

var serverBase = '//localhost:8080/'
var OUTFITS_URL = serverBase + 'outfits'

function displayFetchOutfit() {
  var outfitsElement = outfits.map(function(outfit) {
    var element = $(outfitTemplate)
    element.attr('id', outfit.id)
    // element.attr('date', outfit.date);
    element.find('.js-outfit-date').text(outfit.date)
    outfit.headpiece.forEach(function(headpiece) {
      element.find('js-outfit-headpiece').append('<li>' + headpiece + '</li>')
    })
    outfit.body.forEach(function(body) {
      element.find('js-outfit-body').append('<li>' + body + '</li>')
    })
    outfit.headpiece.forEach(function(bottom) {
      element.find('js-outfit-bottom').append('<li>' + bottom + '</li>')
    })
    outfit.shoes.forEach(function(shoes) {
      element.find('js-outfit-shoes').append('<li>' + shoes + '</li>')
    })
    outfit.accessories.forEach(function(accessories) {
      element
        .find('js-outfit-accessories')
        .append('<li>' + accessories + '</li>')
    })
    return element
  })
  $('.display-outfits').html(outfitsElement)
}

function handleDisplayOutfit() {
  $('.display-outfits-form').submit(function(e) {
    e.preventDefault()
    var headpiece = $(e.currentTarget)
      .find('#js-headpiece')
      .val()
      .split(',')
      .map(function(headpiece) {
        return headpiece.trim()
      })
    var body = $(e.currentTarget)
      .find('#js-body')
      .val()
      .split(',')
      .map(function(body) {
        return body.trim()
      })
    var bottom = $(e.currentTarget)
      .find('#js-bottom')
      .val()
      .split(',')
      .map(function(bottom) {
        return bottom.trim()
      })
    var shoes = $(e.currentTarget)
      .find('#js-shoes')
      .val()
      .split(',')
      .map(function(shoes) {
        return shoes.trim()
      })
    var accessories = $(e.currentTarget)
      .find('#js-accessories')
      .val()
      .split(',')
      .map(function(accessories) {
        return accessories.trim()
      })
    addOutfit({
      date: $(e.currentTarget).find('#js-date').val(),
      headpiece: headpiece,
      body: body,
      bottom: bottom,
      shoes: shoes,
      accessories: accessories
    })
  })
}

function handleRecipeAdd() {
  $('#js-recipe-form').submit(function(e) {
    e.preventDefault()
    var ingredients = $(e.currentTarget)
      .find('#ingredients-list')
      .val()
      .split(',')
      .map(function(ingredient) {
        return ingredient.trim()
      })
    addRecipe({
      name: $(e.currentTarget).find('#recipe-name').val(),
      ingredients: ingredients
    })
  })

  function deleteOutfit(outfitId) {
    console.log('Deleting outfit `' + outfitId + '`')
    $.ajax({
      url: OUTFITS_URL + '/' + outfitId,
      method: 'DELETE',
      success: displayFetchOutfit
    })
  }

  /*function deleteRecipe(recipeId) {
  console.log('Deleting recipe `' + recipeId + '`');
  $.ajax({
    url: RECIPES_URL + '/' + recipeId,
    method: 'DELETE',
    success: getAndDisplayRecipes
  });
}*/

  $(function() {
    addOutfit()
    fetchOutfit()
  })
}
