// permission
module.exports = {
  isAdmin: () => {
    return true;
  },
  isSeller: () => {
    const token = req.header.token;
    const payload = jwt.verif(token);
    //   const user =User.findOne(where:(email:payload.email))
    if (!isAdmin) res.send(404);
    else next();
  },
};
