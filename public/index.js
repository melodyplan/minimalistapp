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

$(function() {
  addOutfit()
})

function fetchOutfit() {
  $.ajax({
    method: 'GET',
    url: '/outfits',
    dataType: 'json',
    success: function(res) {
      console.log('display/render outfits');
      displayFetchOutfit()
    });
  })
}

//work on lines 51-74 on getting outfits to dislay on landing page
const outfitTemplate = (
  '<div class="outfit js-outfit">' +
  '<h3 class="js-outfit-name"><h3>' +
  '<hr>' +
  '<ul class="js-outfit-accessories">' +
  //keep modifying from shopping list template
  '</ul>' +
  '<div class="recipe-controls">' +
    '<button class="js-recipe-delete">' +
      '<span class="button-label">delete</span>' +
    '</button>' +
  '</div>' +
'</div>'
);

function displayFetchOutfit() {
  var outfitsElement = outfits.map(function(outfit) {
    element.attr('id', outfit.id);
    element.attr('date', outfit.date);
  });

  $('.display-outfits').html(/*?*/)
  return element;
}


// function deleteOutfit(outfitId) {
//   console.log('delete outfit worked');
//   $.ajax({
//     url: '/outfits' + '/' + outfitId,
//     method: 'DELETE',
//     success:
//   })
// }
