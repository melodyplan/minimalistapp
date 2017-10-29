function addOutfit() {
  $('.submit').click(function(event) {
    event.preventDefault()
    let headpiece = $('.headpiece-input').val()
    let body = $('.body-input').val()
    let bottom = $('.bottom-input').val()
    let shoes = $('.shoes-input').val()
    let accessories = $('.accessories-input').val()
    const outfitData = {
      headpiece: headpiece,
      body: body,
      bottom: bottom,
      shoes: shoes,
      accessories: accessories
    }
    console.log(headpiece, body, bottom, shoes, accessories)
  })

  $.ajax({
    url: '/outfits',
    contentType: 'application/json',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(outfitData),
    success: function(data) {
      console.log('post request worked!')
    }
  })
}
