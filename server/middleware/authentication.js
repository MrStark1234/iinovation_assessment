const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    console.error("Unauthorized: Token missing");
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.Seckey, (err, user) => {
    if (err) {
      console.error("Forbidden: Token verification failed");
      console.error(err); // Log the error details
      return res.status(403).json({ message: "Forbidden" });
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
