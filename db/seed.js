const db = require('APP/db');
const Promise = require('bluebird');

const seedUsers = () => db.Promise.map([
  {name: 'Picasso', email: 'artist@art.com'},
  {name: 'Mona Lisa', email: 'smile@art.com'}
], user => db.model('users').create(user));

const seedPhrases = () => db.Promise.map([
  {text: 'lazy turtle on a rock'},
  {text: 'monkey hurls strawberry ice cream'},
  {text: 'Mary Poppins and penguin waiter'},
  {text: 'take a cold shower'},
  {text: 'write a bucket list'},
  {text: 'Cookie Monster is hangry'},
  {text: 'a hipster combs his moustache'},
  {text: 'plane flies under reading rainbow'},
  {text: 'cry me a river of pepsi'},
], phrase => db.model('phrases').create(phrase));

db.didSync
  .then(() => db.sync({force: true}))
  .then(() => Promise.all([seedUsers(), seedPhrases()]))
  .then(() => {
    console.log('Data seeded successfully');
  })
  .catch(error => console.error(error))
  .finally(() => db.close());
