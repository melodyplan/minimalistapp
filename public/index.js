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
        // reference shopping list app getAndDisplayOutfits()
      }
    });
  });
}

function fetchOutfit() {
  $.ajax({
    method: 'GET',
    url: '/outfits',
    dataType: 'json',
    success: function(res) {
      console.log('display/render outfits');
    }
  });
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
  //on click only delete button is working. need to be able to throw in the get request
  '<button class="js-outfit-delete">' +
  '<span class="button-label">Delete</span>' +
  '</button>' +
  '</div>' +
  '</div>';

var serverBase = '//localhost:8080/';
var OUTFITS_URL = '/outfits';
var outfits = [];

function displayFetchOutfit() {
  console.log('test');
  $.getJSON(OUTFITS_URL, function(outfits) {
    let outfitsElement = outfits.map(function(outfits) {
      let element = $(outfitTemplate);
      element.attr('id', outfits._id);
      let outfitName = element.find('.js-outfit');
      outfitName.text(outfits.headpiece);
      return element;
    });
    $('.display').html(outfitsElement);
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

function setupDisplayOutfit() {
  $('.show-display-outfit').submit(function(event) {
    console.log('display outfit button clicked');
    event.preventDefault();
    fetchOutfit();
  });
}
/*    let element = $(outfitTemplate);
    $('.display').html(element);
    /*var headpiece = $(e.currentTarget)
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
  });
}*/

function deleteOutfit(outfitId) {
  console.log('Deleting outfit `' + outfitId + '`');
  $.ajax({
    url: OUTFITS_URL + '/' + outfitId,
    method: 'DELETE',
    success: setupFetchOutfit
  });
}

/*function deleteRecipe(recipeId) {
  console.log('Deleting recipe `' + recipeId + '`');
  $.ajax({
    url: RECIPES_URL + '/' + recipeId,
    method: 'DELETE',
    success: getAndDisplayRecipes
  });
}*/

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
  let form = $('.show-question-form');

  form.submit(function(event) {
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

  $('.display-stats').on('click', function(event) {
    event.preventDefault();

    $('.display-chart').removeClass('hidden').toggle();
    $('.question-form').hide();
    $('.display').hide();
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
});
