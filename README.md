# music-player
Online light-weight music player with a simple goal: automate the process of playing music from online sources by uniting them into one easy-to-use and customizable user interface.

The root directory of this project contains the node web server project.

The frontend implementation is nested under `front`. Tell your IDE to exclude `front` and open
it as a separate project for better development experience.

**Note: Some scripts mentioned below are only written for Windows.**

Use the convenient `npm run all` to build the everything and execute the application, this command
consists of the following sub-tasks which can all be executed separately if needed:

0. `npm run build-front` - build frontend, equivalent to running `npm run build` in the `front` directory

0. `npm run build-back` - build backend into the `dist` directory

0. `npm run copy-front` - copy the static frontend files from `front/build` to `dist/public` to enable
serving them. Script is currently written for Windows only, would not work on other Linux.

0. `npm start` - execute the web server to use the entire app - static frontend files are also served
by the backend web server.
