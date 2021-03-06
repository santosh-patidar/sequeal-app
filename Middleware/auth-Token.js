const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
  var auth = req.headers.authorization
  if (auth && auth.split(' ')[0] === 'Bearer') {
    try {
      const token = auth.split(' ')[1];
      if (token) {
        return jwt.verify(token, 'topsecret', (err, decoded) => {
          if (err) {
            res.status(401).send({
              status: false,
              statuscode: 401,
              message: 'please login....'
            })
          } else {
            req.user = { decoded }
            // console.log(req.user.id);
          }
          next()
        });
      } else {
        next();
      }

    } catch (err) {
      console.log(err);
      res.status(400).send({
        status: false,
        message: 'Unable to update data',
        errors: err,
        statusCode: 400
      })
    }

  } else {
    res.status(403).send({
      success: false,
      message: "No Token Provided."
    })
  }
}
module.exports = {
  auth
}
