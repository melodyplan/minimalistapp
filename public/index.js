function addOutfit() {
  $('.question-form').submit(function(event) {
    event.preventDefault()
    let headpiece = $('.headpiece-input').val()
    let body = $('.body-input').val()
    let bottom = $('.bottom-input').val()
    let shoes = $('.shoes-input').val()
    let accessories = []
    accessories.push($('.accessories-input').val())
    const outfitData = {
      headpiece: headpiece,
      body: body,
      bottom: bottom,
      shoes: shoes,
      accessories: accessories
    }
    console.log(headpiece, body, bottom, shoes, accessories)
    $.ajax({
      method: 'POST',
      url: '/outfits',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(outfitData),
      success: function(data) {
        console.log('post request worked!')
        // addOutfit()
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
      console.log('display/render outfits')
      /*i was trying to reference my APOD app that used axios, but i don't
      think it'll work because it's already grabbing from an existing server
      and mine doesn't really exist yet...*/
    }
  })
}

// function deleteOutfit(outfitId) {
//   console.log('delete outfit worked');
//   $.ajax({
//     url: '/outfits' + '/' + outfitId,
//     method: 'DELETE',
//     success:
//   })
// }
