'use strict'

const GOOGLE_MAP_URL = "https://maps.googleapis.com/maps/api/staticmap";
const GOOGLE_MAP_KEY = "AIzaSyDKhoEyXMCpnWzwGiEqzfnffZEQijVkGek";
const FOOD2FORK_KEY = 'a5b4b941891f56d391acab1758d6f6fd';
const FOOD2FORK_URL  = "https://www.food2fork.com/api/search";
let   FOOD2FORK_PAGE = 1;
const RECIPES_TO_DISPLAY= 5;

let food2Fork_data = {
    food2ForkResults: null,
      query: "",
      page:0,
      resultsFrom: 0,
      resultsThru: 0,
      maxResults: 30    
}

let EVENT = 
  {     name: "Tailgate Party",
        host: "Jeffrey Adams",
        date: "12-01-2018",
    location: "ASU Campus",
    address1: "1151 S Forest Ave",
    address2: "",
        city: "Tempe",
       state: "AZ",
         zip: "85281",
    startTime: "3:00 p.m.",
     endTime: "11:00 p.m.",
       phone: "623-111-1111",
       email: "jeffreyn@eventMenuTest.com",     
  }    

let MENU = 
  { courses: [
        {         course: "Appetizer",
               menuItems: [ 
                            {menuItem: "Hot wings",
                         contributors: [ { contributor: "Jason"}],
                                vegan: false,
                           vegetarian: false,
                                 nuts: false },
                            {menuItem: "Cowboy Nachos",
                         contributors: [ { contributor: "Jason"}],
                                vegan: false,
                           vegetarian: false,
                                 nuts: false },                      
                            {menuItem: "Charleston Cheese Dip",
                         contributors: [ { contributor: "Julia"}],
                                vegan: false,
                           vegetarian: false,
                                 nuts: false },
                            {menuItem: "Roasted Jalapeno Poppers",
                         contributors: [ { contributor: "Maria"}],
                                vegan: false,
                           vegetarian: false,
                                 nuts: false },                                                                                   
                      ]
        },
        {         course: "Entrees",
               menuItems: [ 
                            {menuItem: "Baked Ziti",
                         contributors: [ { contributor: "Jason"},{ contributor: "Lisa"}],
                                vegan: true,
                           vegetarian: true,
                                 nuts: false },   
                            {menuItem: "Chili Mac",
                         contributors: [],
                         vegan: false,
                         vegetarian: true,
                               nuts: false },     
                            {menuItem: "Fresh Vegetable Spring Rolls with Two Dipping Sauces",
                         contributors: [ { contributor: "Julia"}],
                         vegan: false,
                         vegetarian: true,
                               nuts: false },    
                            {menuItem: "Italian Meatball Meatloaf Sandwiches",
                         contributors: [ { contributor: "Maria"}],
                         vegan: false,
                         vegetarian: true,
                               nuts: false },   
                            {menuItem: "Confetti Pasta Salad",
                         contributors: [ { contributor: "Maria"}],
                         vegan: false,
                         vegetarian: true,
                               nuts: false },                                                      
                      ]
        },  
        {        course: "Deserts",
              menuItems: [ 
                     {menuItem: "PB&J Chocolate Bars ",
                  contributors: [ { contributor: "Mason"}]},
                     {menuItem: "Chunky Chocolate Brownies",
                  contributors: [ { contributor: "Jason"}]}, 
                     {menuItem: "Whiskey Whoopie Pies",
                  contributors: [ { contributor: "Jason"}]},                                         
               ]
       } ,           
       {         course: "Drinks",
              menuItems: [ 
                     {menuItem: "Berried Beer Punch",
                  contributors: [ { contributor: "Mason"}]},
                     {menuItem: "Sodas",
                  contributors: [ { contributor: "Julia"}]}, 
                     {menuItem: "Beers",
                  contributors: [ { contributor: "Hubert"}]},  
                     {menuItem: "Magaritas to go",
                  contributors: [ { contributor: "Tammy"}]},  
                     {menuItem: "Rum Brandy Punch",
                  contributors: [ { contributor: "Maria"}]}                                                                                                
               ]
       }            
     ]
  } 

  let ATTENDEES = 
  { ATTENDEE: [
        {     name: "Jason",
          nickName: "Jason",
             email: "jason@eventMenuTest.com",
             phone: "",
          okToText: "Y",
         okToEmail: "Y",
         headCount: "2",
         allergies: "None",
             vegan: "N",
        vegetarian: "N",
             other: ""
        }    
     ]
  } 

function submitAPIForRecipes(queryString) {
  $('#js-error-message').empty();
  $('#js-error-message').prop("hidden", true);
  const encodedQuery = encodeURIComponent(queryString);
  const url =  `${FOOD2FORK_URL}?key=${FOOD2FORK_KEY}&q=${encodedQuery}&page=${food2Fork_data.page}`;
  food2Fork_data.query = queryString;
  food2Fork_data.food2ForkResults = null;

  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => displayFood2ForkResults(responseJson))
  .catch(error => {
    $('#js-error-message').prop("hidden", false);
    $('#js-error-message').text(`Something went wrong: ${error}`);
  });
  
} 

function generateGoogleMap() {
   const address = `${encodeURIComponent(EVENT.address1)},${encodeURIComponent(EVENT.city)},${encodeURIComponent(EVENT.state)}+${EVENT.zip}`;
   const markers = `markers=color:red%7Clabel:L%7C${address}`;
   const googleMapUrl = `${GOOGLE_MAP_URL}?center=${address}&zoom=15&size=300x250&${markers}&key=${GOOGLE_MAP_KEY}`; 
   let mappedEvent = `<img src="${googleMapUrl}" alt="google map image" />`;
   $(".js-map-canvas").html(mappedEvent);
}

function generateEventDetails() {
  let eventDetails = `
    <h2>Event: ${EVENT.name}</h2> <a class="js-edit" alt="edit event details" id="EditHost" href=#>edit</a>
    <div  class="eventLocation"><strong>Host: ${EVENT.host}</strong></div>
    <div  class="eventLocation"><strong>Date: </strong> <span id="event-date" class="js-event-date"> ${EVENT.date}</span></div>
    <div  class="eventLocation"><strong>Location: </strong> <span id="event-location" class="js-event-location"> ${EVENT.location}</span></div>
    <div  class="eventLocation"><strong>Address: </strong>  <address id="event-address" class="js-event-address">${EVENT.address1}, ${EVENT.city}, ${EVENT.state} ${EVENT.zip}</address></div>
    <div  class="eventLocation"><strong>Start time:</strong><span id="event-startTime"> ${EVENT.startTime}</span></div>`;
    $(".js-event-hosts").html(eventDetails);
    generateGoogleMap();
    watchEditLinkClick();
}
 
  function showContributorDetails(thisContributor) {   
    let courseAndItems = `<h3>${thisContributor}</h3>  <a id="showMenu" href="#" class=" js-edit js-show-menu"> Show Menu</a> <br> `;  
    let menuItms = "";
    let courseHeading = "";
    MENU.courses.map( function (thisCourse) {       
      jQuery.each( thisCourse.menuItems, function( i, menuItems ) {
        if ( menuItems.contributors.filter( c => c.contributor == `${thisContributor}`).length > 0) {  
           courseHeading = `<h3>${thisCourse.course}</h3>`; 
           menuItms += `<p class="contributed">${menuItems.menuItem}</p>`           
        }  
    }); 
    courseAndItems += `${courseHeading}${menuItms}`; 
    menuItms = "";
    courseHeading= ""; 
  }); 
  
  $(".js-menu").html(courseAndItems);  
  $(".js-menu").prop("hidden", false);  
  watchEditLinkClick(); 
  }

function generateCoursesLinks(recipeId) {  
  let coursesOption = "";
  MENU.courses.map( function(courses) {
   coursesOption+=`
      <a class="add-recipe-to js-add-recipe-to" id="add-${courses.course}-${recipeId}" href=#>${courses.course}</a>, `;   
  });
  return coursesOption.substring(0, coursesOption.length-2);
}

function continueRecipesAfterPaging(searchResults, navigation) { 
  const data = searchResults.food2ForkResults;  
  if (navigation == "next" && searchResults.resultsThru < data.count) {      
      searchResults.resultsFrom += RECIPES_TO_DISPLAY;
      searchResults.resultsThru += RECIPES_TO_DISPLAY;
      $( ".search-nav" ).prop( "hidden", false )  
  } 
  if (navigation == "prev" && searchResults.resultsFrom > 0) {   
    searchResults.resultsFrom -= RECIPES_TO_DISPLAY;
    searchResults.resultsThru -= RECIPES_TO_DISPLAY;
    $( ".search-nav" ).prop( "hidden", false )      
  }  
  
  if (navigation == "next" && searchResults.resultsThru > searchResults.maxResults) {
    searchResults.resultsFrom = 0;
    searchResults.resultsThru = RECIPES_TO_DISPLAY;
    searchResults.page += 1;      
    submitAPIForRecipes(searchResults.query); 
    return false;
  }

  if (navigation == "prev" && searchResults.resultsFrom == 0 && searchResults.page >0 ) {
    searchResults.resultsFrom = searchResults.maxResults - RECIPES_TO_DISPLAY;
    searchResults.resultsThru = searchResults.maxResults;
    searchResults.page -= 1;      
    submitAPIForRecipes(searchResults.query); 
    return false;
  }

  if (navigation == "prev" && searchResults.resultsFrom > 0) {   
    searchResults.resultsFrom -= RECIPES_TO_DISPLAY;
    searchResults.resultsThru -= RECIPES_TO_DISPLAY;
    $( ".search-nav" ).prop( "hidden", false )      
  }    
  return true;
}
function renderRecipe(searchResults, navigation) { 
  let slideCount = 1; 
  $( ".slider-gallery" ).html('<div class="row">');
  if (!continueRecipesAfterPaging(searchResults, navigation)) return;

  const data = searchResults.food2ForkResults;     
  data.recipes.slice(searchResults.resultsFrom,searchResults.resultsThru).map( function(recipe) {    
  const recipeId= `recipe${slideCount}`;
  const coursesLinks = generateCoursesLinks(recipeId);

  let thumb =  
    `<div class="recipe">
      <div class="box">
        <a href="${recipe.source_url}" target="_blank"> <img src="${recipe.image_url}" class="tc-img" alt="${recipe.title}" /></a> <br>        
        <span class="title">
          <span class="recipe js-${recipeId}" role="title">${recipe.title}</span> </br>
          <span><em>${recipe.publisher}</em></span>  </br>
          <span class="js-add-recipe"><strong>Add recipe to the menu:</strong></span> </br>           
          <span> ${coursesLinks}</br></span>  
        </span>            
      </div>
    </div> `; 
  
    $( ".slider-gallery" ).append( thumb ); 
    slideCount++; 
  });  
  $( ".slider-gallery" ).append('</div>');    
  watchAddLToinkClick();
}
    
function storeFood2ForkResults(data) {
    food2Fork_data = {
  food2ForkResults: data,
             page:0,
      resultsFrom: 0,
      resultsThru: RECIPES_TO_DISPLAY,
       maxResults:30    
    }
    data.count > RECIPES_TO_DISPLAY
      ? $( ".search-nav" ).prop( "hidden", false ) 
      : $( ".search-nav" ).prop( "hidden", true ) ;
}

function displayFood2ForkResults(data) {
  storeFood2ForkResults(data);
  if (data == null || data.recipes == null || data.recipes.length == 0) {
     $('#js-error-message').text("No recipes found");
     $('#js-error-message').prop("hidden", false);
  }
  else {
     renderRecipe(food2Fork_data, "");
  }

    $(".js-slider").prop("hidden", false);     
}

function handlePrevPageClicked() {  
  $(".search-prev").on('click',  function(event){
    $(this).removeClass('search-next-on');  
    event.preventDefault();
    renderRecipe(food2Fork_data, "prev");
  }); 
}

function handleNextPageClicked() {  
  $(".search-next").on('click',  function(event){
    $(this).removeClass('search-prev-on');  
    event.preventDefault();
    renderRecipe(food2Fork_data, "next");
  }); }
 
  function showFormEditHost() {
    let formInputs = `
      <fieldset class="edit-form">
        <legend><h2>Host details and event name</h2></legend>
       <p> <label for="eventName" class="edit-label"><strong>Event Name: </strong></label> <input type="text" id="eventName" value="${EVENT.name}" required /></p>
       <p> <label for="eventDate" class="edit-label"><strong>Event Date: </strong></label>  <input role="datetime" type="datetime"  id="eventDate" value="${EVENT.date}" /></p>
       <p> <label for="eventLocation" class="edit-label"><strong>Location: </strong></label>  <input type="text"  id="eventLocation" value="${EVENT.location}" /></p>
       <p> <label for="hostName" class="edit-label"><strong>Host Name: </strong></label> <input type="text"  id="hostName" value="${EVENT.host}" /></p>
       <p> <label for="address1"  class="edit-label"><strong>Address: </strong></label>  <input type="text"  id="address1" value=" ${EVENT.address1}" /></p>
       <p> <label for="city" class="edit-label"><strong>City: </strong></label>  <input type="text"  id="city" value="${EVENT.city}" /></p>
       <p> <label for="state" class="edit-label"><strong>State: </strong></label>  <input type="text"  id="state" value="${EVENT.state}" /></p>
       <p> <label for="zip" class="edit-label"><strong>Zip: </strong></label> <input type="text"  id="zip" value=" ${EVENT.zip}" /></p>
       <p> <label for="startTime" class="edit-label"><strong>Start Time: </strong></label>  <input type="text"  id="startTime" value="${EVENT.startTime}" /></p>
      </fieldset>`;

      $(".js-edit-event-form").html(formInputs);   
      $(".js-edit-event").prop("hidden", false);
      $(".js-search").prop("hidden", true);      
      $('.js-search-button').prop("hidden", true);
      $("#eventName").prop('required',true);
  }
  
function generateMenu() {
  let index = 1;   
  let menuDivs = "";
  let contributorSpan = "";
  MENU.courses.map( function(courses) {
    menuDivs += `<div class="col course"><h3 class="menu-course" id="bm-${courses.course}">${courses.course}</h3>`;    
    courses.menuItems.map( function (menuItems) {  
      menuItems.contributors.map( function(contributors) {     
        contributorSpan += `  <a href="#" id="conDetails-${contributors.contributor}-${index}" class="contributor js-edit js-contributor" alt="Next">${contributors.contributor}</a>`;
        index++;
      });     
      menuDivs+= `<p class="menuItem js-menuItem">${menuItems.menuItem} ${contributorSpan} </p>`;
      contributorSpan = "";                          
    });
    menuDivs += "</div>";
  });  
  $(".js-menu").html("<h2>Menu</h2>");  
  $(".js-menu").append(`<div class="menuItems js-menuItems">${menuDivs}</div>` ); 
  watchEditLinkClick();
}

function addRecipeToMenu(id) {
  const course = id.split('-')[1];
  const recipeId = `js-${id.split('-')[2]}`;
  let thisCourse = MENU.courses.filter( c => c.course == course);

  var clonedobj = jQuery.extend({}, thisCourse[0].menuItems[0]); 
  clonedobj.menuItem = $(`.${recipeId}`).html();
  clonedobj.contributors =  [];
  thisCourse[0].menuItems.push(clonedobj);
  generateMenu();  
}

function watchEditLinkClick() {       
  $('.js-edit').click(event => {
    event.preventDefault();  
    const editItem = event.currentTarget.id; 
    if (editItem == "EditHost") {
       showFormEditHost();
    }
    else if  (editItem =="showMenu") {    
      generateMenu();   
    }
    else if  (editItem.substring(0, 10) == "conDetails") {    
      showContributorDetails(editItem.split('-')[1]);    
    }
  });  
}

function watchAddLinkClick() {       
  $(".js-add-recipe").click(function(event) { 
    event.preventDefault();
    addRecipeToMenu( event.currentTarget.id);
  });  
}

function watchAddLToinkClick() {       
  $(".js-add-recipe-to").click(function(event) { 
    event.preventDefault();
    addRecipeToMenu(`${event.currentTarget.id}`);
  });  
}

function watchSearchButtonClick() {       
  $('.js-search-button').click(event => {
    event.preventDefault();
    $( ".thumbs" ).html("");
    $( ".slide" ).html("");
    const query = $(".js-query").val();
    submitAPIForRecipes(query);
  });  
}

function eventEditsAreValid() { 
  $('#js-error-message').text("");
  if ( $('#eventName').val() == null || $('#eventName').val().length == 0) {
     $('#js-error-message').text("Event Name is required");
     $('#js-error-message').prop("hidden",false);    
  }
    return  $('#js-error-message').text().length == 0;
}

function updateEventDetails() {       
    if (eventEditsAreValid()) {
      EVENT.name =  $('#eventName').val();   
      EVENT.data = $("#eventDate").val();
      EVENT.location = $("#eventLocation").val();
      EVENT.hostName = $("#hostName").val();
      EVENT.address1 = $("#address1").val();
      EVENT.city = $("#city").val();
      EVENT.state = $("#state").val();
      EVENT.zip = $("#zip").val();
      EVENT.startTime = $("#startTime").val();
      $(".js-search").prop("hidden", false);  
      $('.js-search-button').prop("hidden", false);
      generateEventDetails(); 
      $(".js-edit-event").prop("hidden", true);
      $(".js-edit-form").prop("hidden", true);
      location.hash = "bm-event";
    }
}

function watchSubmitEventButtonClick() {       
  $('#submitEvent').click(event => {
    event.preventDefault();  
    updateEventDetails()
  });  
}

function watchSubmitEventButtonClickOLD() {       
  $('#submitEvent').click(event => {
    event.preventDefault();
    updateEventDetails();
    if (eventEditsAreValid()) {
      EVENT.name =  $('#eventName').val();   
      EVENT.data = $("#eventDate").val();
      EVENT.location = $("#eventLocation").val();
      EVENT.hostName = $("#hostName").val();
      EVENT.address1 = $("#address1").val();
      EVENT.city = $("#city").val();
      EVENT.state = $("#state").val();
      EVENT.zip = $("#zip").val();
      EVENT.startTime = $("#startTime").val();
      $(".js-search").prop("hidden", false);  
      $('.js-search-button').prop("hidden", false);
      generateEventDetails(); 
      $(".js-edit-form").prop("hidden", true);
      location.hash = "bm-event";
    }
  });  
}

function watchResetEventButtonClick() {       
  $('#resetEvent').click(event => {
     showFormEditHost();    
  });  
}

function watchSubmitMenuButtonClick() {       
  $('#submitMenu').click(event => {
    event.preventDefault();
    if (eventEditsAreValid()) {
      EVENT.name =  $('#eventName').val();   
      EVENT.data = $("#eventDate").val();
      EVENT.location = $("#eventLocation").val();
      EVENT.hostName = $("#hostName").val();
      EVENT.address1 = $("#address1").val();
      EVENT.city = $("#city").val();
      EVENT.state = $("#state").val();
      EVENT.zip = $("#zip").val();
      EVENT.startTime = $("#startTime").val();
      $(".js-search").prop("hidden", false);  
      $('.js-search-button').prop("hidden", false);
      generateEventDetails(); 
      $(".js-edit-form").prop("hidden", true);
      location.hash = "bm-event";
    }
  });  
}
     
function watchResetMenuButtonClick() {       
  $('#resetMenu').click(event => {
  if (!eventEditsAreValid())  return;
     showFormEditHost();
  });  
}

function watchCancelEventButtonClick() {       
  $('#cancelEvent').click(event => {  
    $(".js-edit-form").prop("hidden", true);
    $(".js-edit-event").prop("hidden", true);
    $(".js-search").prop("hidden", false);  
    $('.js-search-button').prop("hidden", false);
    location.hash = "bm-event";
  });  
}

function setupHandleEvents() {  
      generateEventDetails(); 
      generateMenu();  
      watchSubmitEventButtonClick();
      watchResetEventButtonClick();
      watchCancelEventButtonClick();
      watchSubmitMenuButtonClick();
      watchResetMenuButtonClick();
      watchSearchButtonClick(); 
      watchEditLinkClick(); 
      watchAddLinkClick();
      watchAddLToinkClick();
      handlePrevPageClicked();
      handleNextPageClicked();    
}

$(setupHandleEvents);