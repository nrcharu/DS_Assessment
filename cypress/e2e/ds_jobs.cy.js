/// <reference types="Cypress" />

import 'cypress-file-upload'
import 'cypress-iframe';

import {Job} from '../support/factories.js'

describe('Job Application', () => {
  beforeEach(() => {
    cy.visit('/jobs/p/physicians-hospital-telehealth-openings-9057');
  });

  it("TC01_Check if the job openings page is loaded properly and Check Header of Job Openings page",function(){  
    //Fetch the header element and validate it against 'Physicians - Hospital/Telehealth Openings'      
    cy
    .get('h1')
    .contains('Physicians - Hospital/Telehealth Openings')
    .should('be.visible')
})

  it('TC02_should successfully submit a job application entering all the fields', () => {
    
    cy.build('Job').then((job) => {
      const jobModel = new Job(job);
      cy.get('#apply_here').should('be.visible')
      cy.get('#user_first_name').type(jobModel.firstname);
      cy.get('#user_last_name').type(jobModel.lastname);
      cy.get('#user_email').type(jobModel.email); //user_phone
      cy.get('#user_phone').type(jobModel.phone);
      cy.generatePassword(20);
      cy.get('#user_zipcode').type(jobModel.zipcode);
      cy.get('#user_state').select('FL')
      cy.get('#user_occupation').select('pa')
      cy.get('#user_specialty').select('Acupuncturists')
      cy.attachAndValidateFile();
      cy.reCaptchaClick();

      cy.wait(3000);

      // Submit the application
      cy.get('#user_form_submit').click();

      // Assert the success message
      cy.get('.primary').should('be.visible')
      .contains('Your application has been sent!');
    });
    
  });

  it('TC04_Enter invalid password format and check error message ', () => {
    
    cy.build('Job').then((job) => {
      const jobModel = new Job(job);
      cy.get('#apply_here').should('be.visible')
      cy.get('#user_first_name').type(jobModel.firstname);
      cy.get('#user_last_name').type(jobModel.lastname);
      cy.get('#user_email').type(jobModel.email); //user_phone
      cy.get('#user_phone').type(jobModel.phone);
      cy.get('#user_zipcode').type(jobModel.zipcode);
      cy.get('#user_password').type('asdfgqwerty');
      cy.reCaptchaClick();

      cy.wait(3000);

      // Submit the application
      cy.get('#user_form_submit').click();

      // Assert the error message
      cy.get('#application_result').should('be.visible')
      .contains('Password must contain 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character');
    });
    
  });

  it.only('TC03_should successfully submit a job application entering only mandatory fields',()=>{    
    cy.build('Job').then((job) => {
      const jobModel = new Job(job);
      cy.get('#apply_here').should('be.visible')
      cy.get('#user_first_name').type(jobModel.firstname);
      cy.get('#user_last_name').type(jobModel.lastname);
      cy.get('#user_email').type(jobModel.email); //user_phone
      cy.get('#user_phone').type(jobModel.phone);
      cy.get('#user_zipcode').type(jobModel.zipcode);
      cy.reCaptchaClick();

      cy.wait(3000);

      // Submit the application
      cy.get('#user_form_submit').click();

      // Assert the success message
      cy.get('.primary').should('be.visible')
      .contains('Your application has been sent!');
    });
  })

  it.only('TC05_Check if application allows duplication form submission',function(){
    cy.fillApplicationForm('Y');
    // Submit the application
    cy.get('#user_form_submit').click();

    // Assert the success message
    cy.get('.primary').should('be.visible')
    .contains('Your application has been sent!');

    //Visit the application submission page again
    cy.visit('/jobs/p/physicians-hospital-telehealth-openings-9057');

    cy.fillApplicationForm('N');

    // Submit the application
    cy.get('#user_form_submit').click();

    //Assert the message 'Already applied'
    cy.get('input[value="Already Applied"]').should('be.visible');

   
  })

  // Test cases
});
