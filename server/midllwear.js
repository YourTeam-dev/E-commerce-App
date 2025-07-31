// permission
module.exports = {
  isClient: () => {
    next();
  },
  isAdmin: (req, res, next) => {
    next();
  },
  isSeller: () => {
    next();
  },
};
