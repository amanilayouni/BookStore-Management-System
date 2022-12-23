const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');



//add new category API 


router.post('/add',checkRole.checkRole, (req, res,next) => {
    let category = req.body;
    query = "insert into category (name) values(?)" ;
    connection.query(query, [category.name], (err, results) => {
        if (!err) {
                return res.status(200).json({ message: "category ajoutee avec succés 👍" })
            }
        
        else {
            return res.status(500).json(err);
        }
    })
})



// get all the categories API 


router.get('/get',  (req, res,next) => {
    var query = "select  * from category order by name";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err);
        }
    })
})


// update category API 

router.patch('/update',  checkRole.checkRole,(req, res,next) => {
    let product = req.body;
    var query = "update category set name=? where id=?";
    connection.query(query, [product.name,product.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "category id n'existe pas !" });
            }
            return res.status(200).json({ message: "category modifiee avec succes :)" });
        }
        else {
            return res.status(500).json(err);
        }
    })
})









module.exports = router;
