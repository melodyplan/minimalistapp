function addOutfit(outfitData) {
  $('.submit').click(function(event) {
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
    console.log(headpiece, body, bottom, shoes, accessories, date)
  })

  $.ajax({
    method: 'POST',
    url: '/outfits',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(outfitData),
    success: function(data) {
      console.log('post request worked!')
      addOutfit()
    }
  })
}

$(function() {
  addOutfit()
})

// function deleteOutfit(outfitId) {
//   console.log('delete outfit worked');
//   $.ajax({
//     url: '/outfits' + '/' + outfitId,
//     method: 'DELETE',
//     success:
//   })
// }
