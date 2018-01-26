//create
function addOutfit() {
  $('.question-form').submit(function(event) {
    event.preventDefault();
    let headpiece = $('.js-headpiece-input').val();
    let body = $('.js-body-input').val();
    let bottom = $('.js-bottom-input').val();
    let shoes = $('.js-shoes-input').val();
    let accessories = [];
    accessories.push($('.js-accessories-input').val());
    let occasion = $('.js-occasion-input').val();
    const outfitData = {
      headpiece: headpiece,
      body: body,
      bottom: bottom,
      shoes: shoes,
      accessories: accessories,
      occasion: occasion
    };
    console.log(headpiece, body, bottom, shoes, accessories, occasion);
    $.ajax({
      method: 'POST',
      url: '/outfits',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(outfitData),
      success: function(data) {
        console.log('post request worked!');
      }
    });
    reloadPage();
  });
}

function reloadPage() {
  document.location.reload();
}

//read

const outfitTemplate = outfit => {
  let utcDate = outfit.date;
  let dt = new Date(utcDate);

  return `<div class="outfit js-outfit" id="${outfit.id}">
      <h3 class="js-outfit-date">On ${dt.toString()} you wore<h3>
        <hr>
          <ul class="js-outfit-headpiece">${outfit.headpiece}</ul>
          <ul class="js-outfit-body">${outfit.body}</ul>
          <ul class="js-outfit-bottom">${outfit.bottom}</ul>
          <ul class="js-outfit-shoes">${outfit.shoes}</ul>
          <ul class="js-outfit-accessories">${outfit.accessories}</ul>
          <ul class="js-outfit-occasion">${outfit.occasion}</ul>
    <div class="outfit-controls">
      <button class="js-outfit-delete">Delete</button>
      <button class="js-outfit-update">Update</button>
    </div>
  </div>`;
};

const OUTFITS_URL = '/outfits';
// const outfits = [];

function displayFetchOutfit() {
  $.getJSON(OUTFITS_URL, function(outfits) {
    let outfitsHtml = outfits.map(outfitTemplate);
    $('.display').html(outfitsHtml.join(''));
  });
}

function setupPieChart() {
  new Chart(document.getElementById('pie-chart'), {
    type: 'pie',
    data: {
      labels: ['Headpiece', 'Body', 'Bottom', 'Shoes', 'Accessories'],
      datasets: [
        {
          label: 'How often worn (percent)',
          backgroundColor: [
            '#3e95cd',
            '#8e5ea2',
            '#3cba9f',
            '#e8c3b9',
            '#c45850'
          ],
          data: [8, 30, 30, 30, 15]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'How often outfit articles were worn this month'
      }
    }
  });
}

/*function setupBarChart() {
  new Chart(document.getElementById('bar-chart'), {
    type: 'bar',
    data: {
      labels: [
        'Black Tie',
        'Cocktail',
        'Everyday',
        'Family Get Together',
        'Holiday',
        'Night Out',
        'Weekend',
        'Work',
        'Wedding'
      ],
      datasets: [
        {
          label: 'Outfits by occasion',
          backgroundColor: [
            '#3e95cd',
            '#8e5ea2',
            '#3cba9f',
            '#e8c3b9',
            '#c45850'
          ],
          data: [4, 0, 135, 2, 30, 9, 15, 1]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Outfits worn by occasion this year'
      }
    }
  });
}*/

//update
function updateOutfit(outfitId) {
  console.log('Updating outfit `' + outfitId + '`');
  $.ajax({
    url: '/outfits/' + outfitId,
    type: 'PUT',
    dataType: 'json',
    data: outfitId
  })
    .done(function(done) {
      console.log('done');
      displayFetchOutfit();
    })
    .fail(function(fail) {
      console.log(fail);
    });
}

//req.body.id does not match req.params.id in server.js

/*function updateShoppingListitem(item) {
  console.log('Updating shopping list item `' + item.id + '`');
  $.ajax({
    url: SHOPPING_LIST_URL + '/' + item.id,
    method: 'PUT',
    data: JSON.stringify(item),
    success: function(data) {
      getAndDisplayShoppingList()
    },
    dataType: 'json',
    contentType: 'application/json'
  });
}*/

//delete

function deleteOutfit(outfitId) {
  console.log('Deleting outfit `' + outfitId + '`');
  $.ajax({
    method: 'DELETE',
    url: '/outfits/' + outfitId,
    dataType: 'json',
    success: displayFetchOutfit
  });
  console.log(outfitId);
}

//click

function clickHandler() {
  $('.reload-home').on('click', function(event) {
    event.preventDefault();

    $('.splash-container').removeClass('hidden');
    $('.question-form').addClass('hidden');
    $('.display').addClass('hidden');
    $('.display-chart').addClass('hidden');
  });

  $('.add-outfit-button').on('click', function(event) {
    event.preventDefault();

    $('.question-form').removeClass('hidden');
    $('.display').addClass('hidden');
    $('.display-chart').addClass('hidden');
    $('.splash-container').addClass('hidden');
  });

  $('.display-outfits-button').on('click', function(event) {
    event.preventDefault();

    $('.display').removeClass('hidden');
    $('.question-form').addClass('hidden');
    $('.display-chart').addClass('hidden');
    $('.splash-container').addClass('hidden');
  });

  $('.display-stats-button').on('click', function(event) {
    event.preventDefault();

    $('.display-chart').removeClass('hidden');
    $('.question-form').addClass('hidden');
    $('.display').addClass('hidden');
    $('.splash-container').addClass('hidden');
  });

  /*$('.sign-up').on('click', function(event) {
    event.preventDefault();

    $('.content-wrapper').animate(
      {
        marginTop: '-50vh'
      },
      200
    );
  });*/
}

function deleteButtonWork() {
  $('.display').on('click', '.js-outfit-delete', function(event) {
    // console.log('i got a click!');
    event.preventDefault();
    const outfitId = $(event.target)
      .closest('.js-outfit')
      .attr('id');
    // console.log(outfitId);
    deleteOutfit(outfitId);
  });
}

function updateButton() {
  $('.display').on('click', '.js-outfit-update', function(event) {
    console.log('clicking update');
    event.preventDefault();
    const outfitId = $(event.target)
      .closest('.js-outfit')
      .attr('id');
    updateOutfit(outfitId);
  });
}

$(function() {
  addOutfit();
  setupPieChart();
  displayFetchOutfit();
  // setupBarChart();
  clickHandler();
  deleteButtonWork();
  updateButton();
});
