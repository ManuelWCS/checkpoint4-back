const {connection} = require('../db_connection');
const router = require('express').Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config();


router.post('/register', (req, res) => {
    const {pseudo, password} = req.body; 
    if (!pseudo || !password ) {
        res.status(400)
        .json({errorMessage: 'Renseingez les 2 champs'})
    } else {
        const hash = bcrypt.hashSync(password, 10);
        connection.query(
            'INSERT INTO user (pseudo, password) VALUES (?,?)',
            [pseudo, hash],
            (error, result) => {
                if (error) {
                    res.status(500).json({errorMessage: error.message});
                } else {
                    res.status(201).json({
                        id: result.insertId,
                        pseudo,
                        password: 'hidden'
                    })
                }
            }
        )
    }
})

module.exports = router;