# End-to-end/E2E testing with Cypress

### Here are steps on how you can get Cypress up and running
* CD into the cypress folder if you haven't already.
* In your terminal, type in `npi ci`. This will install the node_modules folder.
* Next, type in `npx cypress open`. This will open the Cypress app.
* Since I've only implemented E2E testing, click on that.
* Choose your web browser of choice. I'm using Chrome v114.
    * You will need to install a web broswer on your OS.
    * I believe Electron is there by default.
* You should see 4 different test (signup-page.cy.js, login-page.cy.js, delete-test-account.cy.js, & delete-test-account.cy.js).
* Click on any of those and Cypress will handle the rest.
    * All test are automated by Cypress so you shouldn't need to do anything.
* Note that before you run any test, you'll need to have the Event Tracking web app up and running.
* Learn more about Cypress [here](https://www.cypress.io/)

### Cypress & environment variables
* Cypress requires 6 environment variables (or at lest the way I've set it up).
* Of course, you don't have to use .env variables and you can manually enter them into the .cy.js files.
* You can also make these up as you find fit.
* `EMAIL="ENTER AN EMAIL"`
* `USERNAME="ENTER A USERNAME"`
* `PASSWORD="ENTER A PASSWORD"`
* `CONFIRM_PASSWORD="ENTER PASSWORD AGAIN"`
* `ZIP_CODE="ENTER A ZIP CODE"`
* `RESET_PASSWORD="ENTER A NEW PASSWORD"`