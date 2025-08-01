const jwt = require('jsonwebtoken');
const User = require('./model/user.model');

const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ message: 'No token provided' });
  }
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7, authorization.length) : authorization;
  jwt.verify(token, process.env.JWT_SECRET || 'secretkey', async (err, decode) => {
    if (err) {
      return res.status(401).send({ message: 'Invalid token' });
    }
    try {
      const user = await User.findById(decode._id);
      if (!user) {
        return res.status(401).send({ message: 'User not found' });
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(500).send({ message: 'Server error' });
    }
  });
};

const isAdmin = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ message: 'No token provided' });
  }
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7, authorization.length) : authorization;
  jwt.verify(token, process.env.JWT_SECRET || 'secretkey', async (err, decode) => {
    if (err) {
      return res.status(401).send({ message: 'Invalid token' });
    }
    try {
      const user = await User.findById(decode._id);
      if (!user || !user.isAdmin) {
        return res.status(403).send({ message: 'Admin token is not valid' });
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(500).send({ message: 'Server error' });
    }
  });
};

const isSeller = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ message: 'No token provided' });
  }
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7, authorization.length) : authorization;
  jwt.verify(token, process.env.JWT_SECRET || 'secretkey', async (err, decode) => {
    if (err) {
      return res.status(401).send({ message: 'Invalid token' });
    }
    try {
      const user = await User.findById(decode._id);
      if (!user || user.isSeller === null) {
        return res.status(403).send({ message: 'Seller token is not valid' });
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(500).send({ message: 'Server error' });
    }
  });
};

module.exports = {
  isAuth,
  isAdmin,
  isSeller,
};
