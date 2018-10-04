const User = require('../../models/user');
const jwt    = require('jsonwebtoken');

module.exports = (app) => {
  app.get('/api/users', (req, res, next) => {
    res.send('Hello! The API is at');

  });
  app.get('/api/setup', function(req, res) {

  // create a sample user
  var nick = new User({
    name: 'Nick Cerminara',
    password: 'password',
    admin: true
  });

  // save the sample user
  nick.save(function(err) {
    if (err) throw err;
    res.json({ success: true });
  });
});
app.get('/api/userslist', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});


app.post('/api/authenticate', function(req, res) {
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token with only our given payload
    // we don't want to pass in the entire user since that has the password
    const payload = {
      admin: user.admin
    };
        var token = jwt.sign(payload, app.get('superSecret'),
        {expiresIn: 1440},
        { algorithm: 'RS256'}
      );
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }

    }

  });
});

app.get('/api/indianic', function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // req.decoded = decoded;
        // next();
        return res.json({ success: true, message: decoded });

      }
    });

  } else {
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
});



};
