import { factory } from 'factory-bot';
import faker from 'faker';
const now = new Date();

// Class Job is defined to create test data for form fields 
export class Job {
    constructor(props) {
      this.firstname = props.firstname;
      this.email = props.email;
      this.lastname = props.lastname;
      this.phone = props.phone;
      this.zipcode = props.zipcode;
      this.password = props.password;
      // ... other properties
    }
  }

// Factory Job is created to formulate dynamic test data using faker.js
factory.define('Job',Job,{
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  //email: faker.random.number({ min: 1, max: 999999 })+faker.internet.email(),
  //const now = new Date();
  //const currentDateTime = now.toISOString().replace(/[-:T.]/g, '').slice(0, -1);
  email: now.toISOString().replace(/[-:T.]/g, '').slice(0, -1)+faker.internet.email(),
  phone: faker.phone.phoneNumber('9#########'),
  zipcode: faker.address.zipCode(),
  password: faker.internet.password(20, true, /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])/)  
});

export default factory;