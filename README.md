## Website Performance Optimization portfolio project

Installation:
    From the current directory, running grunt will create a production directory. Copy
    this directory to your web server path.

    To run grunt you will need to run npm install to install the node_modules used in the
    Gruntfile.js.

Environment:
  I used a local apache server and ngrok to access the server from the web to perform the
  pagespeed tests.

  I used server-configs-apache to set up gzip compression and caching. See Sites Used.

  I changed the file structure slightly creating dev and production directories under the
  udportfolio directory.  The production directory contains the minified and compressed files.
  I included them in the upload, but running grunt will perform all the optimization tasks
  and create and populate the production directory.

Sites Used:
  Udacity forms.  This is also where I discovered grunt.

  The site I used to figure out how to set up and start using grunt.
  https://www.erianna.com/using-grunt-to-minify-and-compress-assets

  npmjs.com - installed node.js and use npm to install grunt and grunt modules.

  gruntjs.com - documentation and modules

  The site I used to configure apache for gzip and caching:
  https://github.com/h5bp/server-configs-apache

  stackoverflow.com for general information


General Updates Made:
  See Comments in files for more specific information.
  All my comments begin with JB.

  Copied the font information from //fonts.googleapis.com/css?family=Open+Sans:400,700 and
  put it into the css files where appropriate. This allowed the font to be cached and
  and speeded up loading.

  Used grunt to handle minimization, compressing, text replacement and to move to production
  directory.  See Gruntfile.js for more information.

  Minimized js, css and html files.

  Compressed images.  Grunt imagemin had a problem minimizing pizzeria.jpg so I used
  http://compressjpeg.com to compress it.  grunt copy is used to move this file to production

Optimizations made in views/js/main.js
  Function determineDx - moved the windowwidth calculation to the function changePizzaSizes
  (the calling function) and added windowwidth as a paramenter.  This function is called
  for each pizza.  Since we want the windowwidth of the same element for each pizza, we
  only need to get it once.

  Function changePizzaSizes - Finding DOM elements is expensive and since all pizzas are in
  the same container element, we only need to find it once so I moved it out of the for loop.
  The windowwidth calculation from determineDx is now in this function for the same reason.
  The values for dx and newwidth also need to be calculated only once, so I moved those outside
  of the loop.

  Function updatePositions - For the same reasons as above, moved the DOM lookup for
  document.body.scrollTop out of the loop and use it to calculate scrollTop only once.

  Function addEventListener - moved document.querySelector("#movingPizzas1") out of for loop
  and assigned to variable to save the DOM lookup. Using the variable for appendChild call.

 Files Modified:
  index.html
  project-2048.html
  project-mobile.html
  project-webperf.html

  css/style.css 
  js/perfmatters.js

  views/pizza.html
  views/js/main.js
