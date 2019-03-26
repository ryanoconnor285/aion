# Aion

This a timekeeping app designed to help you keep track of clocking in and clocking out of work.  This app is great for anyone who has to deal with a slow system at their current job.  It is also great if you work remotely or if you are self employed and you want to show how much time you spent with a client.  

## Getting Started

As always, you should have a folder on your machine for repositories.  Once in that directory

```
$ git clone https://github.com/rocsteady888/aion.git
```


### Prerequisites

You will need an [mLab](https://mlab.com/signup/) account if you don't already have one set up 

```bash
$ yarn version
yarn version v1.13.0
info Current version: 1.0.0
question New version:
```
```bash
$ node -v
v10.13.0
```

### Installing

A step by step series of examples that tells you how to get a development env running

#### Install Dependencies

You can use npm to install dependicies but yarn is a better option for React apps

```bash
$ yarn
$ cd client && yarn
```

In the root directory 

```
$ mkdir config && cd config
$ touch passport.js keys.js keys_prod.js keys_dev.js
```
You should have a folder structure that looks like this.
-config:
  -keys_dev.js
  -keys_prod.js
  -keys.js
  -passport.js

#### Passport Setup

Here is how I set 
```javascript
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('./keys');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => console.log(err));
  })
  );
};
```

#### Keys Setup
keys.js
```javascript
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./keys_prod');
} else {
  module.exports = require('./keys_dev');
}
```
---------------
keys_dev.js
```javascript
module.exports = {
  mongoURI: 'mongodb://<dbuser>:<dbpassword>@ds012345-a0.mlab.com:56789',
  secretOrKey: 'secret'
};
```
------------------
keys_prod.js
```javascript
module.exports = {
  mongoURI: process.env.MONGODB_URI,
  secretOrKey: process.env.SECRET_OR_KEY
};
```


## Deployment
For available scripts, check the package.json file.  
for the client 
```bash
$ cd client && yarn start
```
for the server 
```bash
npm run dev
```



## Deployment

To deploy on heroku simply connect it to the master branch of your github repository.  The heroku-postbuild script is already setup in the client package.json

## Built With

* [React](https://reactjs.org/) - Front end JS library
* [Redux](https://redux.js.org/) - A predictable state container for JavaScript apps.
* [MongoDB](https://www.mongodb.com/) - Database
* [NodeJS](https://nodejs.org/en/) - Asynchronous JS runtime
* [Express](https://expressjs.com/) - Framework for NodeJS
* [Mongoose](https://mongoosejs.com/) - elegant mongodb object modeling for node.js
* [Moment JS](https://momentjs.com/) - Parse, validate, manipulate, and display dates and times in JavaScript.
* [Passport JS](http://www.passportjs.org/) - Simple, unobtrusive authentication for Node.js
* [mLab](https://mlab.com/) - Free mongoDB hosting 

## Authors

* **Ryan O'Connor** - *Initial work* - [Portfolio](https://ryanoconnor-developer.com/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used