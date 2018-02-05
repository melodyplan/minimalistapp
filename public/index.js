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
  // let dt = new Date(utcDate);
  // ${dt.toString()}

  let dt = new Date(utcDate),
    hours = dt.getHours(),
    minutes = dt.getMinutes();
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  let suffix = 'AM';
  if (hours >= 12) {
    suffix = 'PM';
    hours = hours - 12;
  }
  if (hours === 0) {
    hours = 12;
  }
  let finalTime = `${hours}:${minutes} ${suffix}`;
  let dayArray = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  let monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  let monthName = monthNames[dt.getMonth()];
  let dayName = dayArray[dt.getDay()];
  let numberDay = dt.getDate();
  let year = dt.getFullYear();

  return `<div class="outfit" id="${outfit.id}">
      <h4 class="js-outfit-date">On ${dayName} ${monthName} ${numberDay}, ${year} at ${hours}:${minutes} ${suffix} you wore a...</h4>
        <hr>
      <div class="js-outfit">
        <div class="outfit-section">
            <ul class="js-outfit-headpiece">${outfit.headpiece}</ul>
            <ul class="js-outfit-body">${outfit.body}</ul>
            <ul class="js-outfit-bottom">${outfit.bottom}</ul>
            <ul class="js-outfit-shoes">${outfit.shoes}</ul>
            <ul class="js-outfit-accessories">${outfit.accessories}</ul>
        </div>
        <div class="occasion-section">
            <ul class="js-outfit-occasion">...for ${
              outfit.occasion
            } attire. </ul>
        </div>
      </div>
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

//update
function updateOutfit(outfitId, outfit) {
  console.log('Updating outfit `' + outfitId + '`');
  $.ajax({
    url: '/outfits/' + outfitId,
    method: 'PUT',
    dataType: 'json',
    // data: outfitId
    contentType: 'application/json',
    data: JSON.stringify(outfit),
    success: function(data) {
      displayFetchOutfit();
    },
    error: function(err) {
      console.log(err);
    }
  });
}

function updateOutfitForm(id, element) {
  // let authToken = localStorage.getItem('authToken');
  $.ajax({
    method: 'GET',
    url: '/outfits/' + id,
    contentType: 'application/json',
    success: function(outfitId) {
      console.log(outfitId);

      let updateTemplate = `
				<form class="row updateOutfitSection" data-id=${outfitId}>
					<h2>Update this outfit</h2><br>
					<label for="updateHeadpiece">Head:</label>
					<input type="text" name="updateHeadpiece" class="updateHeadpiece" value=${
            outfitId.headpiece
          }>
					<label for="updateBody">Body:</label>
					<input type="text" name="updateBody" class="updateBody" value=${outfitId.body}>
					<label for="updateBottom">Bottom:</label>
					<input type="text" name="updateBottom" class="updateBottom" value=${
            outfitId.bottom
          }>
					<label for="updateShoes">Shoes:</label>
					<input type="text" name="updateShoes" class="updateShoes" value=${
            outfitId.shoes
          }>
          <label for="updateAccessories">Accessories:</label>
					<input type="text" name="updateAccessories" class="updateAccessories" value=${
            outfitId.accessories
          }>
          <label for="updateOccasion">Occasion:</label>
					<input type="text" name="updateOccasion" class="updateOccasion" value=${
            outfitId.occasion
          }>
					<button type="submit" id="updateOutfitInfo" class="outfit-controls">Update it!</button>
				</form>`;
      $(element).after(updateTemplate);
    }
  });
}

function handleOutfitUpdate() {
  $('#updateOutfitInfo').on('click', function(e) {
    console.log('you updated your outfit!');
    e.preventDefault();
    updateOutfit({
      headpiece: $(e.currentTarget)
        .find('.updateHeadpiece')
        .val(),
      body: $(e.currentTarget)
        .find('.updateBody')
        .val(),
      bottom: $(e.currentTarget)
        .find('.updateBottom')
        .val(),
      shoes: $(e.currentTarget)
        .find('.updateShoes')
        .val(),
      accessories: $(e.currentTarget)
        .find('.updateAccessories')
        .val(),
      occasion: $(e.currentTarget)
        .find('.updateOccasion')
        .val()
    });
  });
}

function displayUpdateForm() {
  $('.display').on('click', '.js-outfit-update', function(event) {
    console.log('clicking update');
    event.preventDefault();
    let outfit = $(this)
      .parent()
      .parent();
    const outfitId = $(event.target)
      .closest('.js-outfit')
      .attr('id');
    updateOutfitForm(outfitId, outfit);
  });
}

function updateButton() {
  $('body').on('submit', '.updateOutfitSection', function(e) {
    e.preventDefault();
    const outfitId = $(event.target)
      .closest('.js-outfit')
      .attr('id');
    console.log(`you submitted updateOutfitSection for ${outfitId}`);
    let newUpdatedOutfit = {
      id: outfitId,
      headpiece: $('.updateHeadpiece').val(),
      body: $('.updateBody').val(),
      bottom: $('.updateBottom').val(),
      shoes: $('.updateShoes').val(),
      accessories: $('.updateAccessories').val(),
      occasion: $('.updateOccasion').val()
    };
    console.log(newUpdatedOutfit);
    updateOutfit(outfitId, newUpdatedOutfit);
    console.log('outfit updated');
  });
}

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

//Chart

/*function fetchOutfitData() {
  $.getJSON(OUTFITS_URL, function(outfits) {
    let outfitsHtml = outfits.map(outfitTemplate);
    $('.display').html(outfitsHtml.join(''));
  });
}*/
//possible lines 316-321 to get array of garment types

function setupPieChart() {
  new Chart(document.getElementById('pie-chart').getContext('2d'), {
    type: 'pie',
    data: {
      labels: ['Headpiece', 'Body', 'Bottom', 'Shoes', 'Accessories'],
      datasets: [
        {
          label: 'How often worn (percent)',
          backgroundColor: [
            '#2ecc71',
            '#3498db',
            // "#95a5a6",
            '#9b59b6',
            '#f1c40f',
            '#e74c3c'
            // "#34495e"
          ],
          data: [18, 30, 30, 30, 15]
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

$(function() {
  addOutfit();
  setupPieChart();
  displayFetchOutfit();
  // setupBarChart();
  clickHandler();
  handleOutfitUpdate();
  deleteButtonWork();
  displayUpdateForm();
  updateButton();
});
