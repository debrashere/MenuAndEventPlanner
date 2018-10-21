# Menu and Event Planner Capstone
## Workflow documentation

Thinkful (https://www.thinkful.com/) API Capstone Project creating a menu and event planning.

### Scenario 1: Initial display
Screen displays with following content:  

* Introduction text:
* Future updates text:
* Input textbox for recipe search with search button
* Host and location of the event
* Google map API is executed to display the showing location of the event on the screen
* Menu section, displaying menu by course and menu items
    * Next to each menu item if an attendee has signed up to contribute that item their name will display as clickable

 
 ### Scenario 2: User searches for recipes

* User enters search text and clicks the "Search" button
    * Recipe API is executed with search input
        * Recipes found:
            * Previous and Next buttons
            * Recipe information:
              * Clickable recipe image, when clicked with open the recipe in a new window
              Recipe name
              Source of the recipe (Allrecipes, Bon Appetit etc.)
              Text instruction user to click on the course links to add the recipe to the menu
        * Recipes not found:
              * Text in red indicating that no recipes were found
 

## Scenario 3: User updates event details  
   

* User clicks "edit" next to event name
   *  Input form displays allowing user to make changes to the event details:
       *  Event name, Host, location name, location address, date of event, start time of event
    * When "Submit" button is clicked
        * Information is updated on the screen
        Google map is redrawn in case address was updated

## Scenario 4: User clicks on attendee name next to menu item
   
* User clicks the attendee name next to the menu item
    * Menu is replaced with new menu, displaying only the menu items that this attended has signed up to contribute.
    * After menu heading is a link when clicked will switch back to the full menu
