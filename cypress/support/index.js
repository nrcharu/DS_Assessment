import { addAliases } from 'factory-bot';
import './commands'; // This is your custom Cypress commands file
//import '@cypress/code-coverage/support'; // If you're using code coverage

// Import the factories you define (replace with your actual factory file path)
import './factories';

addAliases(); // Add the factory aliases

// Set the options for Factory Bot (if needed)
// For example, you can set a default locale for Faker.js:
// faker.locale = 'en_US';
