# Cali Surf Check Menubar App
A menubar app for checking California surf quickly and easily.

## Directory Structure

* Your client HTML lives in app/.
* Your client javascript lives in app/js/.
* Your client SCSS lives in app/scss.
* Your react components live in app/js/components/.
* Your electron server code lives in src/.
* Everything is programmed using Javascript, the new, cool kind (ES2015).

## Building

* Build the client and server bundles: gulp build
* Watch app/ and src/ for changes and update build/ automagically: gulp watch
* Lint everything (We use StandardJS, but you can modify the .eslintrc): gulp lint
* Open up the app: gulp serve. This will also live reload everything, so don't worry about that.
* Package the app for release: gulp package. NOTE: I COULD NOT GET GULP PACKAGE TO WORK AND USED ELECTRON-PACKAGER TO PACKAGE THE APP.
