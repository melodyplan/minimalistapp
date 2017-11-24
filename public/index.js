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

function fetchOutfit() {
  $.ajax({
    method: 'GET',
    url: '/outfits',
    dataType: 'json',
    success: function(res) {
      console.log('display/render outfits', res);
    }
  });
}

/*maybe add a refresh of some kind so newest outfit can be seen when adding
outfit initially and then checking the display in the same session.*/
const outfitTemplate = outfit => {
  return (
    '<div class="outfit js-outfit">' +
    '<h3 class="js-outfit-date">' +
    outfit.date +
    '<h3>' +
    '<hr>' +
    '<ul class="js-outfit-headpiece">' +
    outfit.headpiece +
    '</ul>' +
    '<ul class="js-outfit-body">' +
    outfit.body +
    '</ul>' +
    '<ul class="js-outfit-bottom">' +
    outfit.bottom +
    '</ul>' +
    '<ul class="js-outfit-shoes">' +
    outfit.shoes +
    '</ul>' +
    '<ul class="js-outfit-accessories">' +
    outfit.accessories +
    '</ul>' +
    //should probably add the drop down list here?
    '<div class="outfit-controls">' +
    //on click only delete button is working. need to be able to throw in the get request
    '<button class="js-outfit-delete">' +
    '<span class="button-label">Delete</span>' +
    '</button>' +
    '<button class="js-outfit-update">' +
    '<span class="button-label">Update</span>' +
    '</button>' +
    '</div>' +
    '</div>'
  );
};

var serverBase = '//localhost:8080/';
var OUTFITS_URL = serverBase + 'outfits';
var outfits = [];

function displayFetchOutfit() {
  $.getJSON(OUTFITS_URL, function(outfits) {
    let outfitsHtml = outfits.map(outfitTemplate);
    // console.log(outfitsElement.map(element => element.html()));
    $('.display').html(outfitsHtml.join(''));
  });
  /*var outfitsElement = outfits.map(function(outfit) {
    var element = $(outfitTemplate);
    console.log(element);
    element.attr('id', `${data.id}`);
    // element.attr('date', outfit.date);
    element.find('.js-outfit-date').text(outfit.date);
    outfit.headpiece.forEach(function(headpiece) {
      element.find('js-outfit-headpiece').append('<li>' + headpiece + '</li>');
    });
    outfit.body.forEach(function(body) {
      element.find('js-outfit-body').append('<li>' + body + '</li>');
    });
    outfit.headpiece.forEach(function(bottom) {
      element.find('js-outfit-bottom').append('<li>' + bottom + '</li>');
    });
    outfit.shoes.forEach(function(shoes) {
      element.find('js-outfit-shoes').append('<li>' + shoes + '</li>');
    });
    outfit.accessories.forEach(function(accessories) {
      element
        .find('js-outfit-accessories')
        .append('<li>' + accessories + '</li>');
    });
    return element;
  });
  $('.display').html(outfitsElement);*/
}

//do i still need this (lines 113-120) since it is being over ridden by outfitTemplate?
function setupDisplayOutfit() {
  $('.show-display-outfit').submit(function(event) {
    console.log('display outfit button clicked');
    event.preventDefault();
    fetchOutfit();
  });
}

function deleteOutfit(outfitId) {
  console.log('Deleting outfit `' + outfitId + '`');
  $.ajax({
    url: OUTFITS_URL + '/' + outfitId,
    method: 'DELETE',
    success: displayFetchOutfit
  });
}

//needs button for updating outfit-- this isn't hooked to anything yet
function updateOutfit(outfit) {
  console.log('Updating outfit' + outfit.id + '``');
  $.ajax({
    url: OUTFITS_URL + '/' + outfit.id,
    method: 'PUT',
    data: JSON.stringify(outfit),
    success: function(data) {
      displayFetchOutfit();
    },
    dataType: 'json',
    contentType: 'application/json'
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

function clickHandler() {
  $('.add-outfit-button').on('click', function(event) {
    event.preventDefault();

    $('.question-form').removeClass('hidden').toggle();
    $('.display').hide();
    $('.display-chart').hide();
  });

  $('.display-outfits-button').on('click', function(event) {
    event.preventDefault();

    $('.display').removeClass('hidden').toggle();
    $('.question-form').hide();
    $('.display-chart').hide();
  });

  $('.display-stats-button').on('click', function(event) {
    event.preventDefault();

    $('.display-chart').removeClass('hidden').toggle();
    $('.question-form').hide();
    $('.display').hide();
  });
}

function handleDeleteOutfit() {
  $('.js-outfit').on('click', 'js-outfit-delete', function(event) {
    event.preventDefault();
    deleteAnOutfit($(event.currentTarget).closest('js-outfit').attr('id'));
  });
}

$(function() {
  addOutfit();
  fetchOutfit();
  setupPieChart();
  displayFetchOutfit();
  setupDisplayOutfit();
  // setupBarChart();
  clickHandler();
  deleteOutfit();
  handleDeleteOutfit();
});
