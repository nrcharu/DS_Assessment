// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })



import { create, build, buildList } from 'factory-bot';
import factory from './factories';
import faker from 'faker';
import {Job} from '../support/factories.js';

Cypress.Commands.add('create', (name, attributes = {}) => {
    return cy.wrap(factory.build(name, attributes)).as('createdInstance');
  });
  
  Cypress.Commands.add('build', (name, attributes = {}) => {    
    return factory.build(name, attributes);
  });
  
  Cypress.Commands.add('buildList', (name, amount, attributes = {}) => {
    return cy.wrap(buildList(name, amount, attributes));
  });

  //Custom command to click on reCAPTCHA inside iframe
  Cypress.Commands.add('reCaptchaClick',()=>{
    cy.get("iframe[title='reCAPTCHA']").then(($iframe) => {
      const iframe = $iframe.contents()[0];
      const $body = Cypress.$(iframe).find('body');
      cy.wrap($body)
      .find('.recaptcha-checkbox-border')
      .should('be.visible')
      .click();
    });
  });

  //Custom command to attach file and validate if the file is attached
  Cypress.Commands.add('attachAndValidateFile',()=>{
    cy.get(".upload").selectFile('cypress/fixtures/test.pdf')
    cy.get('#upload_txt').contains('test.pdf')
  })

  //Custom command to generate password with a combination of lowercase, uppercase, digit and special character
  Cypress.Commands.add('generatePassword',(lengthOfPwd)=>{
    const lowercase = faker.random.arrayElement('abcdefghijklmnopqrstuvwxyz');
    const uppercase = faker.random.arrayElement('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    const digits = faker.random.arrayElement('0123456789');
    const specialCharacters = faker.random.arrayElement('!@#$%^&*()');

    let password = lowercase + uppercase + digits + specialCharacters;

    const remainingChars = lengthOfPwd - 4;

    for (let i = 0; i < remainingChars; i++) {
      password += faker.random.arrayElement(password);
      //password += randomChar;
    }
    cy.log('password ::::  '+password)
    
    cy.get('#user_password').type(password)
  })

  
  Cypress.Commands.add('fillApplicationForm',(newCreation)=>{
    if(newCreation=='Y'){  
      cy.build('Job').then((job) => {
        
        Cypress.email = "";
        cy.log('in this newcreation ==Y block now')
        const jobModel = new Job(job);
        let fn = jobModel.firstname;
        let ln = jobModel.lastname;
        let ph = jobModel.phone;
        let zip = jobModel.zipcode;
        let em = faker.random.number({ min: 1, max: 99999 })+jobModel.email;
        Cypress.email = em;
        cy.log('email--- '+Cypress.email)       
        
        cy.get('#apply_here').should('be.visible')
        cy.get('#user_first_name').type(fn);
        cy.get('#user_last_name').type(ln);
        cy.get('#user_email').type(em); //user_phone
        cy.get('#user_phone').type(ph);
        cy.get('#user_zipcode').type(zip);
        cy.reCaptchaClick();
  
        cy.wait(3000);

      });
    }else{
      cy.build('Job').then((job) => {
        
        const jobModel = new Job(job);
        let fn = jobModel.firstname;
        let ln = jobModel.lastname;
        let ph = jobModel.phone;
        let zip = jobModel.zipcode;
        let em = Cypress.email;
        //Cypress.email = em;
        cy.log('email--- '+Cypress.email)       
        
        cy.get('#apply_here').should('be.visible')
        cy.get('#user_first_name').type(fn);
        cy.get('#user_last_name').type(ln);
        cy.get('#user_email').type(em); //user_phone
        cy.get('#user_phone').type(ph);
        cy.get('#user_zipcode').type(zip);
        cy.reCaptchaClick();
  
        cy.wait(3000);
      })
    }
    
    
    })

    
