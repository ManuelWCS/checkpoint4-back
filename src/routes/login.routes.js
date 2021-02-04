const { connection } = require("../db_connection");
const router = require("express").Router();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/login", (req, res) => {
  const { pseudo, password } = req.body;
  if (!pseudo || !password) {
    res.status(400).json({ errorMessage: "Remplissez les deux chams" });
  } else {
    connection.query(
      `SELECT * FROM user WHERE pseudo = ?`,
      [pseudo],
      (error, result) => {
        if (error) {
          res.status(500).json({ errorMessage: errorMessage });
        } else if (result.length === 0) {
          res.status(403).json({ errorMessage: "invalid pseudo" });
        } else if (bcrypt.compareSync(password, result[0].password)) {
          //password ok
          const admin = {
            id: result[0].id,
            pseudo,
            password: "hidden",
          };

          const token = jwt.sign({ id: admin.id }, JWT_SECRET, {
            expiresIn: "1h",
          });
          res.status(200).json({ user, token });
        } else {
          res.status(403).json({ errorMessage: "invalid password" });
        }
      }
    );
  }
});

const authenticateWithJsonWebToken = (req, res, next) => {
    if (req.headers.authorization !== undefined) {
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, JWT_SECRET, (err) => {
        if(err) {
          res.status(401).json({ errorMessage: "You don't have the authorization to access data" })
        } else {
          next();
        }
      });
    } else {
      res.status(401).json({errorMessage: "You don't have the authorization to access this data"})
    }
  }


module.exports = router;

