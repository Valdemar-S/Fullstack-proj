import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentification");
  }
  try {
    const decoded = jwt.verify(token, "qwertyuiop");
    req.user = decoded;
  } catch (err) {
    console.log(err);
    console.log(token);
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default verifyToken;
