const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/dev');

exports.auth = (req, res) => {
  const { email, password} = req.body;

  if (!password || !email) {
    return res.status(422).send({
      errors: [{
          title: 'Data missing!',
          details: 'Please provide email and password!'
        }]
    });
  }

  User.findOne({email}, function(err, user) {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    if (!user) {
      return res.status(422).send({
        errors: [{
            title: 'Invalid User',
            details: 'User does not exist'
          }]
      }); 
    }

    if (user.hasSamePassword(password)) {
      const token = jwt.sign({
        userId: user.id,
        username: user.username
      }, config.SECRET, { expiresIn: '1h' });
      
      return res.json(token);
      
    } else {
      return res.status(422).send({
        errors: [{
            title: 'Wrong Data',
            details: 'Wrong email or password'
          }]
      });
    }
  })
};

exports.register = (req, res) => {
  const { username, email, password, passwordConfirmation } = req.body;

  if (!username || !email) {
    return res.status(422).send({
      errors: [{
          title: 'Data missing!',
          details: 'Please provide email and password!'
        }]
    });
  }

  if (password !== passwordConfirmation) {
    return res.status(422).send({
      errors: [{
          title: 'Invalid password!',
          details: 'Password is not the same as confirmation password'
        }]
    });
  }

  User.findOne({email}, function(err, existingUser) {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    if (existingUser) {
      return res.status(422).send({
        errors: [{
            title: 'Invalid email!',
            details: 'Email has already been registered'
          }]
      });
    }

    const user = new User({
      username,
      email,
      password
    });

    user.save((err) => {
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      return res.json({'registered': true});
    });
  });
};

exports.authMiddleware = function(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    const user = parseToken(token);

    // find user from database by checking to see if the returned jwt user
    // object's userId property matches any of the user ids in User
    User.findById(user.userId, function(err, user) {
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      // we are authorized
      if (user) {
        // express' locals property. Useful for exposing request level 
        // info to views rendered. Basically an ideal way to pass our object 
        // to the next middleware or route handler
        res.locals.user = user;
        next();
      } else {
        return notAuthorized(res);
      }
    })

  } else {
    return notAuthorized(res);
  }
}

// Return jwt payload data. Object --> { userId, exp, iat, username } 
function parseToken(token) {
  return jwt.verify(token.split(' ')[1], config.SECRET);
}

function notAuthorized(res) {
  return res.status(401).send({
    errors: [{
        title: 'Not authorized!',
        details: 'You need to login to get access'
      }]
  });
}