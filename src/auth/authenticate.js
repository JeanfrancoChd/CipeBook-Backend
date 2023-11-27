require("dotenv").config();

const moment = require("moment");
const jwt = require("jwt-simple");

const buildToken = (user) => {
  const payload = {
    userId: user.id,
    userName: user.name,
    userRole: user.roles,
    createdAt: moment().unix(),
    expiredAt: moment().add(20, "minutes").unix(),
  };
  return jwt.encode(payload, process.env.SECRET_WORD);
};

const authByToken = (req, res, next) => {

  if (!req.headers["authenticate"]) {
    return res.json({ error: "Missing Token" });
  }

  const userToken = req.headers["authenticate"];
  let payload = {};

  try {
    payload = jwt.decode(userToken, process.env.SECRET_WORD);
  } catch (error) {
    return res.json({ error: "Invalid Token" });
  }

  if (payload.expiredAt < moment().unix()) {
    return res.json({ error: "Expired Token" });
  }

  req.userId = payload.userId;

  next();
};

module.exports = { buildToken, authByToken };
