import jwt from "jsonwebtoken";

function verifyToken(token, secret) {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    return null;
  }
}

export default verifyToken;
