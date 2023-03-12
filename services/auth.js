const User = require("../database/user");
const { verifyToken } = require("./jwt");

const authMiddleware = (req, res, next) => {
  const authorisation = req.get("Authorisation");
  const token = authorisation?.split(" ").pop();

  if (token) {
    try {
      const { data } = verifyToken(token);
      const user = User.findByPk(data.id);
      if (!user) req.status(401).send("unauthorised");
      req.user = user;
      next();
    } catch (e) {
      res.status(401).send("unauthorised");
    }
  } else {
    res.status(401).send("unathorised");
  }
};
