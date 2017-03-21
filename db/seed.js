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
  {text: 'ninja slips on banana peel'},
  {text: 'sad blue donkey'},
  {text: 'wizard uses magic math'},
  {text: 'birds on roller coaster'},
  {text: 'cavern of doom'},
  {text: 'genie in a bottle'},
  {text: 'Big Bird waves hello'},
  {text: 'really sweaty dancing'},
  {text: 'Superman flies over city'},
  {text: 'Kool-Aid man breaks the wall'},
  {text: 'bathroom break'},
  {text: 'potty training'},
  {text: 'old wise man in the woods'},
  {text: 'orange monster wears a mop'},
  {text: 'surfing in a chocolate ocean'},
  {text: 'hippo goes shopping'},
  {text: 'businessman eats lunch'},
  {text: 'Peter Piper picked a peck of pickled peppers'},
  {text: 'Jack and the beanstalk'},
  {text: 'purple conch shell'},
  {text: 'happy little starfish'},
  {text: 'robot cannot compute'},
  {text: 'school of fish'},
  {text: 'tension rising'},
  {text: 'leprechaun cannot find his gold'},
  {text: 'ladybug sings Lady Gaga song'},
  {text: 'waterfall of Skittles'},
  {text: 'soaking in the sunlight'},
  {text: 'relax and breathe'},
  {text: 'Mary had a little lamb'},
  {text: 'woodchuck chucks wood'},
  {text: 'the gorilla is pleased'},
  {text: 'juicy double hamburger'},
  {text: 'girl on a cookie quest'},
  {text: 'kitten rolling in yarn'},

], phrase => db.model('phrases').create(phrase));

db.didSync
  .then(() => db.sync({force: true}))
  .then(() => Promise.all([seedUsers(), seedPhrases()]))
  .then(() => {
    console.log('Data seeded successfully');
  })
  .catch(error => console.error(error))
  .finally(() => db.close());
