# Menu and Event Planner Capstone

Thinkful (https://www.thinkful.com/) API Capstone Project creating a menu and event planning.

Link to the live demo: https://debrashere.github.io/MenuAndEventPlanner/

### Summary
The first draft of this app uses mock data for the initial menu and event details. 

  #### What you can do:
    Search for recipes.
    Make changes to the event details such as address and event name. 
    Note: this data is not stored when the page is refreshed, the mock data will appear.   

### How to use it

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

Scroll down to the menu section and the recipe name from the search 
results should appear.
```

To update the location of the event.

```
Next to the event name, click the "edit" link.
An input form should appear at the top of the screen.
Change the address of the event and click the "Submit" button.

The address and the google map should be updated with the new address.
```

To display only menu items contributed by a specific attendee.

```
Next to the menu item name, click the member name link.
The full menu should dissapear.
Only the menu items to be contributed by the selected member should display.

Click the "Show menu" link to switch back to the full menu.
```

## Screen Shots

![Recipe Search Results](https://raw.githubusercontent.com/debrashere/MenuAndEventPlannerLayout/master/Layout1.png)

![Event location and google map](https://raw.githubusercontent.com/debrashere/MenuAndEventPlannerLayout/master/layout2.png)

![Event menu](https://raw.githubusercontent.com/debrashere/MenuAndEventPlannerLayout/master/layout3.png)

![Edit event details](https://raw.githubusercontent.com/debrashere/MenuAndEventPlannerLayout/master/EditEvent.png)

![Contributor menu](https://raw.githubusercontent.com/debrashere/MenuAndEventPlannerLayout/master/ContributorMenu.png)

## Built With

* [VsCode](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Food2Network API](https://Food2Fork.com/) - API used for recipe search
* [Google Maps API](https://maps.googleapis.com/) - Used to generate googole maps
* [Photos from unsplash.com](https://unsplash.com/) - Used for heading background

## Versioning

 [Github](https://github.com/) is used for versioning.

## Authors

* **Debra Odom** - *Initial work* 