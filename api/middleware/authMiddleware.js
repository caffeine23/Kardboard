const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).send("Unauthorized - No token provided");
  }
  const token = header.replace("Bearer ", "");
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    return res.status(401).send("Unauthorized - Invalid token");
  }
};

module.exports = verifyToken;
