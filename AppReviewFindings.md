# Menu and Event Planner Capstone
## Review findings

Thinkful (https://www.thinkful.com/) API Capstone Project creating a menu and event planning.

Link to the live demo: https://debrashere.github.io/MenuAndEventPlanner/

### Summary
The first draft of this app uses mock data for the initial menu and event details. 
I've reviewed this application with at least 4 people who would use this type of app. Following are my findings.
  #### What you can do:
    Search for recipes.
    Make changes to the event details such as address and event name. Note: this data is not stored when the page is refreshed, the mock data will appear. 

  #### Overview of findings  - what users would like to do 

  * When screen is large enough, display the google map beside the event location
    * Make the recipe results smaller and display more then 3 results on the screen
    * Functionality to manage menu items, such as deletion, renaming, assigning atttendee as contributer to a menu item
    * Functionality to have multiple  hosts.
    * On smaller screen, reduce the size of the recipe display.
    * Display headcount of the total expected attendees.
    * Allow management of the attendees such as adding, removing attendees.
    * When user clicks a contributer name, display all items which has been assigned to this person.
    * On larger screens display the courses in columns so that you can possibly see all courses without scrolling in the menu section.
    

### Examples of requested fixes

To find recipes:

```
  Enter ingredient, dish name etc in "Input" box for recipe search and hit enter.
  Collection of recipes will display below the search box. 
  Review the results by paging thru them. 
```

To select a recipe to add to the menu

```
Within each recipe box is text "Add recipe to menu".
Below that are links for each couse.
Click on the link for the course you would like to add the recipe to.

Scroll down to the menu section and the recipe name from the search results should appear.
```

To update the location of the event.

```
Next to the event name, click the "edit" link.
An input form should appear at the top of the screen.
Change the address of the event and click the "Submit" button.

The address and the google map should be updated with the new address.
```
