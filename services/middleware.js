const User = require("../database/user");
const { verifyToken } = require("./jwt");

function middleware(req, res, next) {
  const authentication = req.get("Authorization");
  const token = authentication?.split(" ").pop();

  if (token) {
    try {
      const { data } = verifyToken(token);
      const user = User.findByPk(data.id);
      if (!user) res.status(404).send("Authoristaion denied");
      req.user = user;
      next();
    } catch (e) {
      res.status(500).send({ message: "an error occured" });
    }
  } else {
    res.send(401);
  }
}
