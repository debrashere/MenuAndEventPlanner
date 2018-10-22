'use strict'

const GOOGLE_MAP_URL = 'https://maps.googleapis.com/maps/api/staticmap';
const GOOGLE_MAP_KEY = 'AIzaSyDKhoEyXMCpnWzwGiEqzfnffZEQijVkGek';
const FOOD2FORK_KEY = 'a5b4b941891f56d391acab1758d6f6fd';
const FOOD2FORK_URL  = 'https://www.food2fork.com/api/search';
let   FOOD2FORK_PAGE = 1;
const RECIPES_TO_DISPLAY= 4; 



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

/*    
  Retrieve data from recipe API
*/
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

/*    
  Retrieve address location from google maps
*/
function generateGoogleMap() {
   const address = `${encodeURIComponent(EVENT.address1)},${encodeURIComponent(EVENT.city)},${encodeURIComponent(EVENT.state)}+${EVENT.zip}`;
   const markers = `markers=color:red%7Clabel:L%7C${address}`;
   const googleMapUrl = `${GOOGLE_MAP_URL}?center=${address}&zoom=15&size=290x250&${markers}&key=${GOOGLE_MAP_KEY}`; 
   let mappedEvent = `<img src="${googleMapUrl}" alt="google map image" />`;
   $(".js-map-canvas").html(mappedEvent);
}

/*    
  create elements to dipslay event details (event name, host and location)
*/
function generateEventDetails() {
  let eventDetails = `
    <div class="host">
      <h2>Event: ${EVENT.name}</h2> <a  tabindex="0" aria-label="Edit event details such as host name and location of event" class="edit-link js-edit" alt="edit event details" id="EditHost" href=#>edit</a>
     </div>
    <div class="host">
      <div  class="eventLocation"><strong tabindex="0" aria-label="Host name">Host: <span tabindex="0"> ${EVENT.host}</span></strong></div>
    </div>
    <div  class="eventLocation"><strong tabindex="0" aria-label="Date of the event">Date: </strong> <span tabindex="0"  id="event-date" class="js-event-date"> ${EVENT.date}</span></div>
    <div  class="eventLocation"><strong tabindex="0" aria-label="Location name of the event">Location: </strong> <span tabindex="0" id="event-location" class="js-event-location"> ${EVENT.location}</span></div>
    <div  class="eventLocation"><strong tabindex="0" aria-label="Address of the event">Address: </strong>  <address  tabindex="0"  id="event-address" class="js-event-address">${EVENT.address1}, ${EVENT.city}, ${EVENT.state} ${EVENT.zip}</address></div>
    <div  class="eventLocation"><strong tabindex="0" aria-label="Start time of the event">Start time:</strong><span  tabindex="0" id="event-startTime"> ${EVENT.startTime}</span></div>`;
    $(".js-event-hosts").html(eventDetails);
    generateGoogleMap();
    watchEditLinkClick();
}
 
/*
  Generate display when name left to the menu item is clicked.
  Menu display will switch to display only menu items for the name selected.
  This would be the items this attendee is responsible for.
*/
function showContributorDetails(thisContributor) {
  let menuDivs = `<div class="menuHeader contributor-menuHeader"><h2>Menu items for ${thisContributor}</h2> 
                <a id="showMenu" aria-label="Show full menu" href="#" class="show-menu js-edit js-show-menu"> Show full menu</a></div>`;
  let courseName = "";
  let matchedCourses = [];

  /* find all courses where "thisContributor" is assigned to any menu items  */
   MENU.courses.map( function (thisCourse) {       
    jQuery.each( thisCourse.menuItems, function( i, menuItems ) {
      if ( menuItems.contributors.filter( c => c.contributor == `${thisContributor}`)
        .length > 0 && courseName == "") {  
         matchedCourses.push(thisCourse); 
         courseName = thisCourse.course;
        }    
      });
      courseName = "";
    });

    matchedCourses.map( function(courses) {
      menuDivs += `
      <div class="col">
        <div class="courseAndMenu"> 
          <div class="course"><h3 class="menu-course" id="bm-${courses.course}">${courses.course}</h3></div><div class="menuItems">`;    
      courses.menuItems.map( function (menuItems) {  
        menuItems.contributors.filter( c => c.contributor == `${thisContributor}`)
        .map( function(contributors) {                
            menuDivs+= `<p tabindex="0" class="menuItem js-menuItem" aria-label="${courses.course} menu item ${menuItems.menuItem} " >${menuItems.menuItem}</p>`;                         
        });     
      });
      menuDivs += "</div></div></div>";
    });   

  $(".js-menu").html(`<div class="menuItems js-menuItems">${menuDivs}</div>` ); 
  watchEditLinkClick();
} 

/*
  Recipe search returns at most 30 recipes max.  Only 5 recipes at a time are displayed 
  This function will determine if the user is at the end of the 30 results and needs to call
  ther API to get the next 30, or at the beginning and needs to call the API to get the previous 30.
*/
function continueRecipesAfterPaging(searchResults, navigation) { 
  const data = searchResults.food2ForkResults;  

  // If paging "Next" and not at the end of results to display 
  //  Then add number of recipes to display to resultsFrom and resultsThru to page forward  
  if (navigation == "next" && searchResults.resultsThru < data.count) {      
      searchResults.resultsFrom += RECIPES_TO_DISPLAY;
      searchResults.resultsThru += RECIPES_TO_DISPLAY;
      $( ".search-nav" ).prop( "hidden", false )  
  } 
  // If paging "Previous" and not at beginning of the paging (indicated by resultsFrom == 0)
  //  Then substract number of recipes to display from  resultsFrom and resultsThru to page backword
  if (navigation == "prev" && searchResults.resultsFrom > 0) {   
    searchResults.resultsFrom -= RECIPES_TO_DISPLAY;
    searchResults.resultsThru -= RECIPES_TO_DISPLAY;
    $( ".search-nav" ).prop( "hidden", false )      
  }  
  // Reached the max number of results returned and trying to page "Next"
  // Must make a call to the api to get the next set of results after adding 1 to the page number
  if (navigation == "next" && searchResults.resultsThru > searchResults.maxResults) {
    searchResults.resultsFrom = 0;
    searchResults.resultsThru = RECIPES_TO_DISPLAY;
    searchResults.page += 1;      
    submitAPIForRecipes(searchResults.query); 
    return false;
  }
  // At positions zero of the max set of results and trying to page "Previous"
  // If have returned more than one page of results from the API call
  //   subtract 1 from the page number and make a call to the API to back backwards to new set of results
  if (navigation == "prev" && searchResults.resultsFrom == 0 && searchResults.page > 0 ) {
    searchResults.resultsFrom = searchResults.maxResults - RECIPES_TO_DISPLAY;
    searchResults.resultsThru = searchResults.maxResults;
    searchResults.page -= 1;      
    submitAPIForRecipes(searchResults.query); 
    return false;
  }

  // If paging "Previous" and not at beginning of the paging (indicated by resultsFrom == 0)
  //  Then substract number of recipes to display from resultsFrom and resultsThru to page backword
  if (navigation == "prev" && searchResults.resultsFrom > 0) {   
    searchResults.resultsFrom -= RECIPES_TO_DISPLAY;
    searchResults.resultsThru -= RECIPES_TO_DISPLAY;
    $( ".search-nav" ).prop( "hidden", false )      
  }    
  return true;
}
/*
  Generate the links that appear within the recipe search results, when clicked will
  add the recipe to the menu
*/
function generateCoursesLinks(recipeId) {  
  let coursesOption = "";
  MENU.courses.map( function(courses) {
   coursesOption+=`<a class="add-recipe-to js-add-recipe-to" id="add-${courses.course}-${recipeId}" href=#>${courses.course}</a>, `;   
  });
  return coursesOption.substring(0, coursesOption.length-2);
}

/*
  Using the results from the recipe search, render the results
*/
function renderRecipe(searchResults, navigation) { 
  let slideCount = 1; 
  $( ".js-slider-gallery" ).html('');
  $( ".js-slider-gallery" ).append('<div class="Aligner"><div class="Aligner-item-arrow"><a href="#"class="paging-icon js-page-prev" alt="Previous"><img src="images/icon-arrow-left.png" alt="left arrow page previous" /></a></div></div>'); if (!continueRecipesAfterPaging(searchResults, navigation)) return;

  const data = searchResults.food2ForkResults;     
  data.recipes.slice(searchResults.resultsFrom,searchResults.resultsThru).map( function(recipe) {    
  const recipeId= `recipe${slideCount}`;
  const coursesLinks = generateCoursesLinks(recipeId);
  let thumb =  
    `<div class="flex-item">
        <a href="${recipe.source_url}" target="_blank" class="recipeLink"> <img src="${recipe.image_url}" class="tc-img tc-link" alt="${recipe.title}" /></a> <br>        
        <span class="title">
          <span class="recipe js-${recipeId}" role="title">${recipe.title}</span> </br>
          <span><em>${recipe.publisher}</em></span>  </br>
          <span class="js-add-recipe"><strong>Add recipe to menu:</strong></span> </br>           
          <span> ${coursesLinks}</br></span>  
        </span>            
     </div> `; 
  
    $( ".js-slider-gallery" ).append( thumb );
    slideCount++; 
  });  
$( ".js-slider-gallery" ).append('<div class="Aligner"><div class="Aligner-item-arrow"><a href="#" class="paging-icon js-page-next" alt="Previous"><img src="images/icon-arrow-right.png" alt="righ arrow page next" /></a></div></div>');
 $( ".js-slider-gallery" ).append('</div>');    
  watchAddLToinkClick();
  handlePrevPageClicked();
  handleNextPageClicked();   
}
    
/*
  Store the up to 30 results from the recipe API into a local object.  
  This allows paging thru the results and display 5 at a time.
*/
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

/*
  Execute the Recipe API and check for invalid results
  If results returned the execute functions to render the results
*/
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
  $(".js-page-prev").on('click',  function(event){   
    event.preventDefault();
    renderRecipe(food2Fork_data, "prev");
  }); 
}

function handleNextPageClicked() {  
  $(".js-page-next").on('click',  function(event){
    event.preventDefault();
    renderRecipe(food2Fork_data, "next");
  }); }
 
/*
    Create the form to edit the host name and event location
*/
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

  /*
    Validation of event edits. Currenlty only required field is event name
*/
  function eventEditsAreValid() { 
    $('#js-error-message').text("");
    if ( $('#eventName').val() == null || $('#eventName').val().length == 0) {
       $('#js-error-message').text("Event Name is required");
       $('#js-error-message').prop("hidden",false);    
    }
      return  $('#js-error-message').text().length == 0;
  }

/*
    Function to update EVENT object with edits from the user
*/
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
  
/*
    Disregard event edit when cancel button is clicked
*/
function watchCancelEventButtonClick() {       
  $('#cancelEvent').click(event => {  
    $(".js-edit-form").prop("hidden", true);
    $(".js-edit-event").prop("hidden", true);
    $(".js-search").prop("hidden", false);  
    $('.js-search-button').prop("hidden", false);
    location.hash = "bm-event";
  });  
}

function watchResetEventButtonClick() {       
  $('#resetEvent').click(event => {
     showFormEditHost();    
  });  
}

/*
    Create the menu section 
*/
function generateMenu() {
  let index = 1;   
  let menuDivs = '';
  let contributorSpan = "";
  MENU.courses.map( function(courses) {
    menuDivs += `
      <div class="flex-item"> 
        <div class="course"><h3 class="menu-course" id="bm-${courses.course}">${courses.course}</h3></div><div class="menuItems">`;    
    courses.menuItems.map( function (menuItems) {  
      menuItems.contributors.map( function(contributors) {     
        contributorSpan += `  <a href="#" aria-label="Show menu items that ${contributors.contributor} will contribute to ${courses.course}" id="conDetails-${contributors.contributor}-${index}" class="contributor js-edit js-contributor" alt="Next">${contributors.contributor}</a>`;
        index++;
      });     
      menuDivs+= `<p tabindex="0" class="menuItem js-menuItem" aria-label="${courses.course} menu item ${menuItems.menuItem} " >${menuItems.menuItem} ${contributorSpan} </p>`;
      contributorSpan = "";                          
    });
    menuDivs += "</div></div>";
  });   
  $(".js-menu").html(`${menuDivs}` ); 
  watchEditLinkClick();
}  

/*
    Function to add selected recipe to the menu
*/
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

/*
  Handle event when edit link next to event name is clicked
*/
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

/*
  
*/
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

function watchSubmitEventButtonClick() {       
  $('#submitEvent').click(event => {
    event.preventDefault();  
    updateEventDetails();
  });  
}

function setupHandleEvents() {  
      generateEventDetails(); 
      generateMenu();  
      watchSubmitEventButtonClick();
      watchResetEventButtonClick();
      watchCancelEventButtonClick();
      watchSearchButtonClick(); 
      watchEditLinkClick(); 
      watchAddLToinkClick();
      handlePrevPageClicked();
      handleNextPageClicked();    
}

$(setupHandleEvents);