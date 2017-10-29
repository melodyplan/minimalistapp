$('.submit').click(function(event) {
  event.preventDefault()
  let headpiece = $('.headpiece-input').val()
  let body = $('.body-input').val()
  let bottom = $('.bottom-input').val()
  let shoes = $('.shoes-input').val()
  let accessories = $('.accessories-input').val()
  console.log(headpiece, body, bottom, shoes, accessories)
})

function addOutfit(headpiece, body, bottom, shoes, accessories, callback) {
  $.ajax({
    url: '/outfits',
    contentType: 'application/json',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify({
      headpiece: headpiece,
      body: body,
      bottom: bottom,
      shoes: shoes,
      accessories: accessories
    }),
    success: function(data) {
      callback()
    }
  })
}
