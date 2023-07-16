const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const tokenValidation = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("Unauthorized! Access Denied!");
      }

      //appending the user to the actual req object
      req.user = decoded.user;
      next();
    });
    if (!token) {
      res.status(401);
      throw new Error("Token missing! Add a authorizaztion token!");
    }
  }
});

module.exports = tokenValidation;
