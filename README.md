# CSV Subtractor
A small webapp tool to subtract a column in one csv file from all cells  in another. 

## Installation & building
Install:
```
git clone ...
cd csv-subtractor
npm install
```

This is built using vueJS and the vue CLI utility. It can be run as a dev server using the `npm run serve` command and built using the 'npm run build' command.

## File structure
*dist/* - The output of 'npm run build', copy the files in here to the location served by the server once you have a working build.

*node_modules/* - Framework files. Don't touch these. 

*public/* - Static files not impacted by the build procedure. Fonts, etc.

*src/* - The actual source files for the project, here's where the work gets done.

- *App.vue* - The container for all other components

- *main.js* - The initial JS file that starts the Vue instance

- *router.js* - The Vue Router file, for future expandability if other tools -are to be added. Vue Router lets you route URLs to components.

- *store.js* - The Vuex store, where most of the global-esque variables and functions to modify them are kept.

*src/assets/extraFunctions.js* - a container for the "download" function and any future functions I want to keep separate.

*src/components/* - The components used in the root App component
    *CsvUploader.vue* - The component used for the CSV uploading, as well as column selection and the checkbox.
    *Processing.vue* - The component that does all the heavy lifting; contains the 'Create Output' and 'Download' buttons, as well as some of the status messages.
    *StatusDisplay.vue* - A seperate component to display any other status messages, added later and I haven't moved all the status messages from Processing over there yet.
    
*package.json* - The npm package file, which contains the list of dependencies and such.
