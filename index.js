'use strict'

const GOOGLE_MAP_URL = 'https://maps.googleapis.com/maps/api/staticmap';
const GOOGLE_MAP_KEY = 'AIzaSyDKhoEyXMCpnWzwGiEqzfnffZEQijVkGek';
const FOOD2FORK_KEY = 'a5b4b941891f56d391acab1758d6f6fd';
const FOOD2FORK_URL  = 'https://www.food2fork.com/api/search';
let   FOOD2FORK_PAGE = 1;
const RECIPES_TO_DISPLAY= 5;



/* =================================TEST DATA ======================= */
const FOOD2FORK_RECIPES = {
  count: 8,
  recipes: [
    {
f2f_url: "http://food2fork.com/view/46923",
image_url: "http://static.food2fork.com/rollupscf15.jpg",
publisher: "The Pioneer Woman",
publisher_url: "http://thepioneerwoman.com",
recipe_id: "46923",
social_rank: 99.99999999876846,
source_url: "http://thepioneerwoman.com/cooking/2012/05/tortilla-rollups/",
title: "Tortilla Rollups",
},
{
f2f_url: "http://food2fork.com/view/339ce3",
image_url: "http://static.food2fork.com/MeatballLettuceWrapsSquare5a11.jpg",
publisher: "Cookin Canuck",
publisher_url: "http://www.cookincanuck.com",
recipe_id: "339ce3",
social_rank: 99.99999999528187,
source_url: "http://www.cookincanuck.com/2013/01/baked-turkey-quinoa-zucchini-meatballs-recipe-in-lettuce-wraps/",
title: "Italian Turkey, Quinoa & Zucchini Meatballs Recipe in Lettuce Wraps"
},
{
f2f_url: "http://food2fork.com/view/46977",
image_url: "http://static.food2fork.com/tetra4f02.jpg",
publisher: "The Pioneer Woman",
publisher_url: "http://thepioneerwoman.com",
recipe_id: "46977",
social_rank: 99.99999999504186,
source_url: "http://thepioneerwoman.com/cooking/2011/11/turkey-tetrazzini/",
title: "Turkey Tetrazzini"
},
{
f2f_url: "http://food2fork.com/view/36611",
image_url: "http://static.food2fork.com/momsroastturkey520a300x189c6d75af3.jpg",
publisher: "Simply Recipes",
publisher_url: "http://simplyrecipes.com",
recipe_id: "36611",
social_rank: 99.9999999886814,
source_url: "http://www.simplyrecipes.com/recipes/moms_roast_turkey/",
title: "Mom&#8217;s Roast Turkey"
},
{
f2f_url: "http://food2fork.com/view/16580",
image_url: "http://static.food2fork.com/9147675385.jpg",
publisher: "All Recipes",
publisher_url: "http://allrecipes.com",
recipe_id: "16580",
social_rank: 99.9999999410573,
source_url: "http://allrecipes.com/Recipe/Homemade-Dog-Food/Detail.aspx",
title: "Homemade Dog Food"
},
{
f2f_url: "http://food2fork.com/view/46975",
image_url: "http://static.food2fork.com/turkeypaninia190.jpg",
publisher: "The Pioneer Woman",
publisher_url: "http://thepioneerwoman.com",
recipe_id: "46975",
social_rank: 99.99999956670949,
source_url: "http://thepioneerwoman.com/cooking/2011/11/leftover-turkey-and-swiss-panini/",
title: "Leftover Turkey and Swiss Panini"
},
{
f2f_url: "http://food2fork.com/view/03fe80",
image_url: "http://static.food2fork.com/shepardspiepaleoglutenfreerecipeDSC_5345853b.jpg",
publisher: "Elana's Pantry",
publisher_url: "http://www.elanaspantry.com",
recipe_id: "03fe80",
social_rank: 99.99999914791516,
source_url: "http://www.elanaspantry.com/paleo-shepherds-pie/",
title: "Paleo Shepherds Pie",
},
{
f2f_url: "http://food2fork.com/view/46974",
image_url: "http://static.food2fork.com/springrollsaef1.jpg",
publisher: "The Pioneer Woman",
publisher_url: "http://thepioneerwoman.com",
recipe_id: "46974",
social_rank: 99.99999850737748,
source_url: "http://thepioneerwoman.com/cooking/2011/11/leftover-turkey-spring-rolls/",
title: "Leftover Turkey Spring Rolls"
},
{
f2f_url: "http://food2fork.com/view/32219",
image_url: "http://static.food2fork.com/121406cb64.jpg",
publisher: "All Recipes",
publisher_url: "http://allrecipes.com",
recipe_id: "32219",
social_rank: 99.9999979241772,
source_url: "http://allrecipes.com/Recipe/Terrific-Turkey-Chili/Detail.aspx",
title: "Terrific Turkey Chili"
},
{
f2f_url: "http://food2fork.com/view/28653",
image_url: "http://static.food2fork.com/33895194d8.jpg",
publisher: "All Recipes",
publisher_url: "http://allrecipes.com",
recipe_id: "28653",
social_rank: 99.99999774341697,
source_url: "http://allrecipes.com/Recipe/Simple-Turkey-Chili/Detail.aspx",
title: "Simple Turkey Chili"
},
{
f2f_url: "http://food2fork.com/view/46988",
image_url: "http://static.food2fork.com/cavemanc1dc.jpg",
publisher: "The Pioneer Woman",
publisher_url: "http://thepioneerwoman.com",
recipe_id: "46988",
social_rank: 99.99999632336367,
source_url: "http://thepioneerwoman.com/cooking/2011/10/caveman-pops-aka-roasted-turkey-legs/",
title: "Caveman Pops (aka Roasted Turkey Legs)"
},
{
f2f_url: "http://food2fork.com/view/679",
image_url: "http://static.food2fork.com/6661337708.jpg",
publisher: "All Recipes",
publisher_url: "http://allrecipes.com",
recipe_id: "679",
social_rank: 99.99998206477366,
source_url: "http://allrecipes.com/Recipe/Actually-Delicious-Turkey-Burgers/Detail.aspx",
title: "Actually Delicious Turkey Burgers",
},
{
f2f_url: "http://food2fork.com/view/37102",
image_url: "http://static.food2fork.com/turkeysouplemonbarley520a300x20003493bfb.jpg",
publisher: "Simply Recipes",
publisher_url: "http://simplyrecipes.com",
recipe_id: "37102",
social_rank: 99.99992608375084,
source_url: "http://www.simplyrecipes.com/recipes/turkey_soup_with_lemon_and_barley/",
title: "Turkey Soup with Lemon and Barley",
},
{
f2f_url: "http://food2fork.com/view/18fcad",
image_url: "http://static.food2fork.com/294_1_1350900104_lrgaf53.jpg",
publisher: "Jamie Oliver",
publisher_url: "http://www.jamieoliver.com",
recipe_id: "18fcad",
social_rank: 99.99982498722022,
source_url: "http://www.jamieoliver.com/recipes/turkey-recipes/jamie-s-christmas-turkey",
title: "Jamie's Christmas turkey"
},
{
f2f_url: "http://food2fork.com/view/f0ef65",
image_url: "http://static.food2fork.com/633_1_1349867322_lrgcaf2.jpg",
publisher: "Jamie Oliver",
publisher_url: "http://www.jamieoliver.com",
recipe_id: "f0ef65",
social_rank: 99.99965099104065,
source_url: "http://www.jamieoliver.com/recipes/turkey-recipes/turkey-and-sweet-leek-pie",
title: "Turkey &amp; sweet leek pie"
},
{
f2f_url: "http://food2fork.com/view/25764",
image_url: "http://static.food2fork.com/27055361de.jpg",
publisher: "All Recipes",
publisher_url: "http://allrecipes.com",
recipe_id: "25764",
social_rank: 99.99949302996498,
source_url: "http://allrecipes.com/Recipe/Pumpkin-Turkey-Chili/Detail.aspx",
title: "Pumpkin Turkey Chili"
},
{
f2f_url: "http://food2fork.com/view/39780",
image_url: "http://static.food2fork.com/friedeggs_300213551ad.jpg",
publisher: "Real Simple",
publisher_url: "http://realsimple.com",
recipe_id: "39780",
social_rank: 99.99880767472747,
source_url: "http://www.realsimple.com/food-recipes/browse-all-recipes/baked-potato-eggs-10000000659302/index.html",
title: "Baked-Potato Eggs"
},
{
f2f_url: "http://food2fork.com/view/a30805",
image_url: "http://static.food2fork.com/CobbSaladSandwich5c185.jpg",
publisher: "Two Peas and Their Pod",
publisher_url: "http://www.twopeasandtheirpod.com",
recipe_id: "a30805",
social_rank: 99.99863006279537,
source_url: "http://www.twopeasandtheirpod.com/cobb-salad-sandwich/",
title: "Cobb Salad Sandwich"
},
{
f2f_url: "http://food2fork.com/view/d22e47",
image_url: "http://static.food2fork.com/30531_RecipeImage_620x413_buffalo_roasted_turkey_blue_cheese_235b7.jpg",
publisher: "Chow",
publisher_url: "http://www.chow.com",
recipe_id: "d22e47",
social_rank: 99.99804250021946,
source_url: "http://www.chow.com/recipes/30531-buffalo-roasted-turkey-with-blue-cheese-sauce",
title: "Buffalo Roasted Turkey with Blue Cheese Sauce Recipe"
},
{
f2f_url: "http://food2fork.com/view/30009",
image_url: "http://static.food2fork.com/6770736050.jpg",
publisher: "All Recipes",
publisher_url: "http://allrecipes.com",
recipe_id: "30009",
social_rank: 99.99744134898533,
source_url: "http://allrecipes.com/Recipe/Spicy-Chipotle-Turkey-Burgers/Detail.aspx",
title: "Spicy Chipotle Turkey Burgers"
},
{
f2f_url: "http://food2fork.com/view/47037",
image_url: "http://static.food2fork.com/club425e8f.jpg",
publisher: "The Pioneer Woman",
publisher_url: "http://thepioneerwoman.com",
recipe_id: "47037",
social_rank: 99.99410238960094,
source_url: "http://thepioneerwoman.com/cooking/2011/04/killer-club-sandwich/",
title: "Killer Club Sandwich"
},
{
f2f_url: "http://food2fork.com/view/17201",
image_url: "http://static.food2fork.com/4240694e1.jpg",
publisher: "All Recipes",
publisher_url: "http://allrecipes.com",
recipe_id: "17201",
social_rank: 99.99273831536367,
source_url: "http://allrecipes.com/Recipe/Incredibly-Cheesy-Turkey-Meatloaf/Detail.aspx",
title: "Incredibly Cheesy Turkey Meatloaf"
},
{
f2f_url: "http://food2fork.com/view/39478",
image_url: "http://static.food2fork.com/broccoliturkeypasta_3006c5d34c2.jpg",
publisher: "Real Simple",
publisher_url: "http://realsimple.com",
recipe_id: "39478",
social_rank: 99.99085453065614,
source_url: "http://www.realsimple.com/food-recipes/browse-all-recipes/pasta-turkey-broccoli-00100000074825/index.html",
title: "Pasta With Turkey and Broccoli"
},
{
f2f_url: "http://food2fork.com/view/409bef",
image_url: "http://static.food2fork.com/11130_turkey_bacon_5_6205c8f.jpg",
publisher: "Chow",
publisher_url: "http://www.chow.com",
recipe_id: "409bef",
social_rank: 99.99078291440989,
source_url: "http://www.chow.com/recipes/11130-bacon-wrapped-turkey-with-pear-cider-gravy",
title: "Bacon-Wrapped Turkey with Pear Cider Gravy Recipe"
},
{
f2f_url: "http://food2fork.com/view/36614",
image_url: "http://static.food2fork.com/turkeystuffing300x20035b66c5f.jpg",
publisher: "Simply Recipes",
publisher_url: "http://simplyrecipes.com",
recipe_id: "36614",
social_rank: 99.98784207717215,
source_url: "http://www.simplyrecipes.com/recipes/moms_turkey_stuffing/",
title: "Mom&#8217;s Turkey Stuffing"
},
{
f2f_url: "http://food2fork.com/view/35647",
image_url: "http://static.food2fork.com/The2BRachel2BSandwich2B2528aka2BRoast2BTurkey2BReuben2BSandwich25292Bwith2BSlaw2B5002B88571f2c6619.jpg",
publisher: "Closet Cooking",
publisher_url: "http://closetcooking.com",
recipe_id: "35647",
social_rank: 99.98173357360301,
source_url: "http://www.closetcooking.com/2011/01/rachel-sandwich-aka-roast-turkey-reuben.html",
title: "The Rachel Sandwich (aka Roast Turkey Reuben Sandwich)"
},
{
f2f_url: "http://food2fork.com/view/d6fa3f",
image_url: "http://static.food2fork.com/IrishNachos596f5.jpg",
publisher: "What's Gaby Cooking",
publisher_url: "http://whatsgabycooking.com",
recipe_id: "d6fa3f",
social_rank: 99.97563551630842,
source_url: "http://whatsgabycooking.com/irish-nachos/",
title: "Irish Nachos with Guacamole"
},
{
f2f_url: "http://food2fork.com/view/27192",
image_url: "http://static.food2fork.com/1071370fb6.jpg",
publisher: "All Recipes",
publisher_url: "http://allrecipes.com",
recipe_id: "27192",
social_rank: 99.96372801595406,
source_url: "http://allrecipes.com/Recipe/Rosemary-Roasted-Turkey-2/Detail.aspx",
title: "Rosemary Roasted Turkey"
},
{
f2f_url: "http://food2fork.com/view/46960",
image_url: "http://static.food2fork.com/turkeybagelburgerb634.jpg",
publisher: "The Pioneer Woman",
publisher_url: "http://thepioneerwoman.com",
recipe_id: "46960",
social_rank: 99.9611071589296,
source_url: "http://thepioneerwoman.com/cooking/2012/01/turkey-bagel-burger/",
title: "Turkey Bagel Burgers"
},
{
f2f_url: "http://food2fork.com/view/49521",
image_url: "http://static.food2fork.com/tandooriturkey6468459.jpg",
publisher: "Bon Appetit",
publisher_url: "http://www.bonappetit.com",
recipe_id: "49521",
social_rank: 99.95892487813043,
source_url: "http://www.bonappetit.com/recipes/2011/11/tandoori-turkey",
title: "Tandoori Turkey"
},
      {
      f2f_url: "http://food2fork.com/view/4386",
      image_url: "http://static.food2fork.com/890638f7df.jpg",
      publisher: "All Recipes",
      publisher_url: "http://allrecipes.com",
      recipe_id: "4386",
      social_rank: 99.9999999994656,
      source_url: "http://allrecipes.com/Recipe/Boilermaker-Tailgate-Chili/Detail.aspx",
      title: "Boilermaker Tailgate Chili"
      },
      {
      f2f_url: "http://food2fork.com/view/a54b23",
      image_url: "http://static.food2fork.com/9860366adb.jpg",
      publisher: "All Recipes",
      publisher_url: "http://allrecipes.com",
      recipe_id: "a54b23",
      social_rank: 51.199822399139585,
      source_url: "http://allrecipes.com/Recipe/Sassy-Tailgate-Sandwiches/Detail.aspx",
      title: "Sassy Tailgate Sandwiches"
      },
      {
      f2f_url: "http://food2fork.com/view/16180",
      image_url: "http://static.food2fork.com/9075256c5d.jpg",
      publisher: "All Recipes",
      publisher_url: "http://allrecipes.com",
      recipe_id: "16180",
      social_rank: 43.51364207805235,
      source_url: "http://allrecipes.com/Recipe/Healthier-Boilermaker-Tailgate-Chili/Detail.aspx",
      title: "Healthier Boilermaker Tailgate Chili"
      },
      {
      f2f_url: "http://food2fork.com/view/34244",
      image_url: "http://static.food2fork.com/1001301f50e.jpg",
      publisher: "All Recipes",
      publisher_url: "http://allrecipes.com",
      recipe_id: "34244",
      social_rank: 39.07066637576343,
      source_url: "http://allrecipes.com/Recipe/Wazzu-Tailgate-Chili/Detail.aspx",
      title: "Wazzu Tailgate Chili"
      },
      {
      f2f_url: "http://food2fork.com/view/12502",
      image_url: "http://static.food2fork.com/1821506c9f.jpg",
      publisher: "All Recipes",
      publisher_url: "http://allrecipes.com",
      recipe_id: "12502",
      social_rank: 36.57324780857538,
      source_url: "http://allrecipes.com/Recipe/Ecu-Tailgate-Wings/Detail.aspx",
      title: "ECU Tailgate Wings"
      },
      {
      f2f_url: "http://food2fork.com/view/23943",
      image_url: "http://static.food2fork.com/874302ce04.jpg",
      publisher: "All Recipes",
      publisher_url: "http://allrecipes.com",
      recipe_id: "23943",
      social_rank: 35.79222637305821,
      source_url: "http://allrecipes.com/Recipe/Nicoles-Tailgate-Party-Chicken-Salad/Detail.aspx",
      title: "Nicole's Tailgate Party Chicken Salad"
      },
      {
      f2f_url: "http://food2fork.com/view/69de00",
      image_url: "http://static.food2fork.com/noimage2f00.recipeimage.gif",
      publisher: "Tasty Kitchen",
      publisher_url: "http://tastykitchen.com",
      recipe_id: "69de00",
      social_rank: 34.80777735743579,
      source_url: "http://tastykitchen.com/recipes/appetizers-and-snacks/tailgate-sandwiches/",
      title: "Tailgate Sandwiches"
      },
      {
      f2f_url: "http://food2fork.com/view/917027",
      image_url: "http://static.food2fork.com/noimage2f00.recipeimage.gif",
      publisher: "Tasty Kitchen",
      publisher_url: "http://tastykitchen.com",
      recipe_id: "917027",
      social_rank: 34.80777735743579,
      source_url: "http://tastykitchen.com/recipes/soups/pbr-tailgate-chili/",
      title: "PBR Tailgate Chili"
      },
      {
        f2f_url: "http://food2fork.com/view/4386",
        image_url: "http://static.food2fork.com/890638f7df.jpg",
        publisher: "All Recipes",
        publisher_url: "http://allrecipes.com",
        recipe_id: "4386",
        social_rank: 99.9999999994656,
        source_url: "http://allrecipes.com/Recipe/Boilermaker-Tailgate-Chili/Detail.aspx",
        title: "Boilermaker Tailgate Chili"
        },
        {
        f2f_url: "http://food2fork.com/view/a54b23",
        image_url: "http://static.food2fork.com/9860366adb.jpg",
        publisher: "All Recipes",
        publisher_url: "http://allrecipes.com",
        recipe_id: "a54b23",
        social_rank: 51.199822399139585,
        source_url: "http://allrecipes.com/Recipe/Sassy-Tailgate-Sandwiches/Detail.aspx",
        title: "Sassy Tailgate Sandwiches"
        },
        {
        f2f_url: "http://food2fork.com/view/16180",
        image_url: "http://static.food2fork.com/9075256c5d.jpg",
        publisher: "All Recipes",
        publisher_url: "http://allrecipes.com",
        recipe_id: "16180",
        social_rank: 43.51364207805235,
        source_url: "http://allrecipes.com/Recipe/Healthier-Boilermaker-Tailgate-Chili/Detail.aspx",
        title: "Healthier Boilermaker Tailgate Chili"
        },
        {
        f2f_url: "http://food2fork.com/view/34244",
        image_url: "http://static.food2fork.com/1001301f50e.jpg",
        publisher: "All Recipes",
        publisher_url: "http://allrecipes.com",
        recipe_id: "34244",
        social_rank: 39.07066637576343,
        source_url: "http://allrecipes.com/Recipe/Wazzu-Tailgate-Chili/Detail.aspx",
        title: "Wazzu Tailgate Chili"
        },
        {
        f2f_url: "http://food2fork.com/view/12502",
        image_url: "http://static.food2fork.com/1821506c9f.jpg",
        publisher: "All Recipes",
        publisher_url: "http://allrecipes.com",
        recipe_id: "12502",
        social_rank: 36.57324780857538,
        source_url: "http://allrecipes.com/Recipe/Ecu-Tailgate-Wings/Detail.aspx",
        title: "ECU Tailgate Wings"
        },
        {
        f2f_url: "http://food2fork.com/view/23943",
        image_url: "http://static.food2fork.com/874302ce04.jpg",
        publisher: "All Recipes",
        publisher_url: "http://allrecipes.com",
        recipe_id: "23943",
        social_rank: 35.79222637305821,
        source_url: "http://allrecipes.com/Recipe/Nicoles-Tailgate-Party-Chicken-Salad/Detail.aspx",
        title: "Nicole's Tailgate Party Chicken Salad"
        },
        {
        f2f_url: "http://food2fork.com/view/69de00",
        image_url: "http://static.food2fork.com/noimage2f00.recipeimage.gif",
        publisher: "Tasty Kitchen",
        publisher_url: "http://tastykitchen.com",
        recipe_id: "69de00",
        social_rank: 34.80777735743579,
        source_url: "http://tastykitchen.com/recipes/appetizers-and-snacks/tailgate-sandwiches/",
        title: "Tailgate Sandwiches"
        },
        {
        f2f_url: "http://food2fork.com/view/917027",
        image_url: "http://static.food2fork.com/noimage2f00.recipeimage.gif",
        publisher: "Tasty Kitchen",
        publisher_url: "http://tastykitchen.com",
        recipe_id: "917027",
        social_rank: 34.80777735743579,
        source_url: "http://tastykitchen.com/recipes/soups/pbr-tailgate-chili/",
        title: "PBR Tailgate Chili"
        },
        {
          f2f_url: "http://food2fork.com/view/4386",
          image_url: "http://static.food2fork.com/890638f7df.jpg",
          publisher: "All Recipes",
          publisher_url: "http://allrecipes.com",
          recipe_id: "4386",
          social_rank: 99.9999999994656,
          source_url: "http://allrecipes.com/Recipe/Boilermaker-Tailgate-Chili/Detail.aspx",
          title: "Boilermaker Tailgate Chili"
          },
          {
          f2f_url: "http://food2fork.com/view/a54b23",
          image_url: "http://static.food2fork.com/9860366adb.jpg",
          publisher: "All Recipes",
          publisher_url: "http://allrecipes.com",
          recipe_id: "a54b23",
          social_rank: 51.199822399139585,
          source_url: "http://allrecipes.com/Recipe/Sassy-Tailgate-Sandwiches/Detail.aspx",
          title: "Sassy Tailgate Sandwiches"
          },
          {
          f2f_url: "http://food2fork.com/view/16180",
          image_url: "http://static.food2fork.com/9075256c5d.jpg",
          publisher: "All Recipes",
          publisher_url: "http://allrecipes.com",
          recipe_id: "16180",
          social_rank: 43.51364207805235,
          source_url: "http://allrecipes.com/Recipe/Healthier-Boilermaker-Tailgate-Chili/Detail.aspx",
          title: "Healthier Boilermaker Tailgate Chili"
          },
          {
          f2f_url: "http://food2fork.com/view/34244",
          image_url: "http://static.food2fork.com/1001301f50e.jpg",
          publisher: "All Recipes",
          publisher_url: "http://allrecipes.com",
          recipe_id: "34244",
          social_rank: 39.07066637576343,
          source_url: "http://allrecipes.com/Recipe/Wazzu-Tailgate-Chili/Detail.aspx",
          title: "Wazzu Tailgate Chili"
          },
          {
          f2f_url: "http://food2fork.com/view/12502",
          image_url: "http://static.food2fork.com/1821506c9f.jpg",
          publisher: "All Recipes",
          publisher_url: "http://allrecipes.com",
          recipe_id: "12502",
          social_rank: 36.57324780857538,
          source_url: "http://allrecipes.com/Recipe/Ecu-Tailgate-Wings/Detail.aspx",
          title: "ECU Tailgate Wings"
          },
          {
          f2f_url: "http://food2fork.com/view/23943",
          image_url: "http://static.food2fork.com/874302ce04.jpg",
          publisher: "All Recipes",
          publisher_url: "http://allrecipes.com",
          recipe_id: "23943",
          social_rank: 35.79222637305821,
          source_url: "http://allrecipes.com/Recipe/Nicoles-Tailgate-Party-Chicken-Salad/Detail.aspx",
          title: "Nicole's Tailgate Party Chicken Salad"
          },
          {
          f2f_url: "http://food2fork.com/view/69de00",
          image_url: "http://static.food2fork.com/noimage2f00.recipeimage.gif",
          publisher: "Tasty Kitchen",
          publisher_url: "http://tastykitchen.com",
          recipe_id: "69de00",
          social_rank: 34.80777735743579,
          source_url: "http://tastykitchen.com/recipes/appetizers-and-snacks/tailgate-sandwiches/",
          title: "Tailgate Sandwiches"
          },
          {
          f2f_url: "http://food2fork.com/view/917027",
          image_url: "http://static.food2fork.com/noimage2f00.recipeimage.gif",
          publisher: "Tasty Kitchen",
          publisher_url: "http://tastykitchen.com",
          recipe_id: "917027",
          social_rank: 34.80777735743579,
          source_url: "http://tastykitchen.com/recipes/soups/pbr-tailgate-chili/",
          title: "PBR Tailgate Chili"
          },
          {
            f2f_url: "http://food2fork.com/view/4386",
            image_url: "http://static.food2fork.com/890638f7df.jpg",
            publisher: "All Recipes",
            publisher_url: "http://allrecipes.com",
            recipe_id: "4386",
            social_rank: 99.9999999994656,
            source_url: "http://allrecipes.com/Recipe/Boilermaker-Tailgate-Chili/Detail.aspx",
            title: "Boilermaker Tailgate Chili"
            },
            {
            f2f_url: "http://food2fork.com/view/a54b23",
            image_url: "http://static.food2fork.com/9860366adb.jpg",
            publisher: "All Recipes",
            publisher_url: "http://allrecipes.com",
            recipe_id: "a54b23",
            social_rank: 51.199822399139585,
            source_url: "http://allrecipes.com/Recipe/Sassy-Tailgate-Sandwiches/Detail.aspx",
            title: "Sassy Tailgate Sandwiches"
            },
            {
            f2f_url: "http://food2fork.com/view/16180",
            image_url: "http://static.food2fork.com/9075256c5d.jpg",
            publisher: "All Recipes",
            publisher_url: "http://allrecipes.com",
            recipe_id: "16180",
            social_rank: 43.51364207805235,
            source_url: "http://allrecipes.com/Recipe/Healthier-Boilermaker-Tailgate-Chili/Detail.aspx",
            title: "Healthier Boilermaker Tailgate Chili"
            },
            {
            f2f_url: "http://food2fork.com/view/34244",
            image_url: "http://static.food2fork.com/1001301f50e.jpg",
            publisher: "All Recipes",
            publisher_url: "http://allrecipes.com",
            recipe_id: "34244",
            social_rank: 39.07066637576343,
            source_url: "http://allrecipes.com/Recipe/Wazzu-Tailgate-Chili/Detail.aspx",
            title: "Wazzu Tailgate Chili"
            },
            {
            f2f_url: "http://food2fork.com/view/12502",
            image_url: "http://static.food2fork.com/1821506c9f.jpg",
            publisher: "All Recipes",
            publisher_url: "http://allrecipes.com",
            recipe_id: "12502",
            social_rank: 36.57324780857538,
            source_url: "http://allrecipes.com/Recipe/Ecu-Tailgate-Wings/Detail.aspx",
            title: "ECU Tailgate Wings"
            },
            {
            f2f_url: "http://food2fork.com/view/23943",
            image_url: "http://static.food2fork.com/874302ce04.jpg",
            publisher: "All Recipes",
            publisher_url: "http://allrecipes.com",
            recipe_id: "23943",
            social_rank: 35.79222637305821,
            source_url: "http://allrecipes.com/Recipe/Nicoles-Tailgate-Party-Chicken-Salad/Detail.aspx",
            title: "Nicole's Tailgate Party Chicken Salad"
            },
            {
            f2f_url: "http://food2fork.com/view/69de00",
            image_url: "http://static.food2fork.com/noimage2f00.recipeimage.gif",
            publisher: "Tasty Kitchen",
            publisher_url: "http://tastykitchen.com",
            recipe_id: "69de00",
            social_rank: 34.80777735743579,
            source_url: "http://tastykitchen.com/recipes/appetizers-and-snacks/tailgate-sandwiches/",
            title: "Tailgate Sandwiches"
            },
            {
            f2f_url: "http://food2fork.com/view/917027",
            image_url: "http://static.food2fork.com/noimage2f00.recipeimage.gif",
            publisher: "Tasty Kitchen",
            publisher_url: "http://tastykitchen.com",
            recipe_id: "917027",
            social_rank: 34.80777735743579,
            source_url: "http://tastykitchen.com/recipes/soups/pbr-tailgate-chili/",
            title: "PBR Tailgate Chili"
            },
        
  ]
}

/* =================================TEST DATA ======================= */


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

  FOOD2FORK_RECIPES.count = FOOD2FORK_RECIPES.recipes.length;
  displayFood2ForkResults(FOOD2FORK_RECIPES);
 
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
   const googleMapUrl = `${GOOGLE_MAP_URL}?center=${address}&zoom=15&size=400x250&${markers}&key=${GOOGLE_MAP_KEY}`; 
   let mappedEvent = `<img src="${googleMapUrl}" alt="google map image" />`;
   $(".js-map-canvas").html(mappedEvent);
}

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
  let menuDivs = `<div class="menuHeader"><h2>Menu items for ${thisContributor}</h2> 
                <a id="showMenu" aria-label="Show full menu" href="#" class="show-menu js-edit js-show-menu"> Show full menu</a></div>`;
  let courseName = "";
  let matchedCourses = [];

  /* 
    find all courses where "thisContributor" is assigned to any menu items 
  */
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
  $( ".slider-gallery" ).html('<div class="row">');
  if (!continueRecipesAfterPaging(searchResults, navigation)) return;

  const data = searchResults.food2ForkResults;     
  data.recipes.slice(searchResults.resultsFrom,searchResults.resultsThru).map( function(recipe) {    
  const recipeId= `recipe${slideCount}`;
  const coursesLinks = generateCoursesLinks(recipeId);

  let thumb =  
    `<div class="recipe">
      <div class="box">
        <a href="${recipe.source_url}" target="_blank" class="recipeLink"> <img src="${recipe.image_url}" class="tc-img tc-link" alt="${recipe.title}" /></a> <br>        
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
    Functions to update EVENT object with edits from the user
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
  let menuDivs = '<div class="menuHeader"><h2>Menu</h2></div>';
  let contributorSpan = "";
  MENU.courses.map( function(courses) {
    menuDivs += `
    <div class="col">
      <div class="courseAndMenu"> 
        <div class="course"><h3 class="menu-course" id="bm-${courses.course}">${courses.course}</h3></div><div class="menuItems">`;    
    courses.menuItems.map( function (menuItems) {  
      menuItems.contributors.map( function(contributors) {     
        contributorSpan += `  <a href="#" aria-label="Show menu items that ${contributors.contributor} will contribute to ${courses.course}" id="conDetails-${contributors.contributor}-${index}" class="contributor js-edit js-contributor" alt="Next">${contributors.contributor}</a>`;
        index++;
      });     
      menuDivs+= `<p tabindex="0" class="menuItem js-menuItem" aria-label="${courses.course} menu item ${menuItems.menuItem} " >${menuItems.menuItem} ${contributorSpan} </p>`;
      contributorSpan = "";                          
    });
    menuDivs += "</div></div></div>";
  });   
  $(".js-menu").html(`<div class="menuItems js-menuItems">${menuDivs}</div>` ); 
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

function watchSubmitEventButtonClick() {       
  $('#submitEvent').click(event => {
    event.preventDefault();  
    updateEventDetails();
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
   
/*
function watchResetMenuButtonClick() {       
  $('#resetMenu').click(event => { 
     showFormEditHost();
  });  
}
*/

function setupHandleEvents() {  
      generateEventDetails(); 
      generateMenu();  
      watchSubmitEventButtonClick();
      watchResetEventButtonClick();
      watchCancelEventButtonClick();
      watchSubmitMenuButtonClick();
      /* watchResetMenuButtonClick(); */
      watchSearchButtonClick(); 
      watchEditLinkClick(); 
      watchAddLinkClick();
      watchAddLToinkClick();
      handlePrevPageClicked();
      handleNextPageClicked();    
}

$(setupHandleEvents);