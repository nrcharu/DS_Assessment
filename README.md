# DS_Assessment
# Cypress Test Automation Project

This repository contains automated test scripts for DirectShifts application portal using Cypress for testing the application's functionality. The tests cover various scenarios to ensure the quality and reliability of the application.

## Test Scenarios

The following test scenarios are covered in this Cypress test automation project:
### TC01_Check if the job openings page is loaded properly and Check Header of Job Openings page

1.	Open the application.
2.	Check for header ‘Physicians - Hospital/Telehealth Openings’ is displayed in the application
   
### TC02_should successfully submit a job application entering all the fields

1.	Open the application
2.	In Apply here user form fill in all the available fields.
3.	Upload a resume document file. Check if the document is uploaded by validating the name of the file.
4.	Click on Recaptcha checkbox.
5.	Click on Apply button.
6.	Verify the success message Your application has been sent! Is displayed.
   
### TC03_should successfully submit a job application entering only mandatory fields
1.	Open the application
2.	In Apply here user form fill in only the mandatory fields viz Firstname, Lastname, email, phone, zipcode.
3.	Click on Recaptcha checkbox.
4.	Click on Apply button.
5.	Verify the success message Your application has been sent! Is displayed.
   
### TC04_Enter invalid password format and check error message
1.	Open the application
2.	In Apply here user form fill in only the mandatory fields viz Firstname, Lastname, email, phone, zipcode.
3.	Give a password that doesn’t contain any special character/digit/lowercase/uppercase.
4.	Click on Recaptcha checkbox.
5.	Click on Apply button.
6.	Error message ‘Password must contain 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character’ should be displayed.
   
### TC05_Check if application allows duplication form submission
1.	Open the application
2.	In Apply here user form fill in only the mandatory fields viz Firstname, Lastname, email, phone, zipcode.
3.	Click on Recaptcha checkbox.
4.	Click on Apply button.
5.	Verify the success message Your application has been sent! Is displayed.
6.	Again open the application and fill in the required details with the same email id as given in Step 2.
7.	Click on Apply button.
8.	Message ‘Already applied’ should be displayed.
   
## Test data

*	Factory-bot and Faker.js plugins are used for dynamically generating test data during run time.
*	For resume upload, the pdf file is available in fixtures folder.

## Reports

*	Mochasome reports are used for report generation which creates html report, video and failure test case screenshots after every run.

## Execution
*	Test cases can be executed by both headed and headless mode.

*The validation alert messages which are displayed over the page are not automated as they’re not found either in DOM, CSS-style change or as API calls in network.*
