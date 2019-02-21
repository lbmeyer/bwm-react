const User = require('../models/user');

exports.auth = (req, res) => {};

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

  User.findOne({email}, (err, existingUser) => {
    if (err) {
      return res.status(422).send({'monogoose': 'handle monogoose errors in next lecture'});
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
        return res.status(422).send({'monogoose': 'handle monogoose errors in next lecture'});
      }

      return res.json({'registered': true});
    });
  });
};
