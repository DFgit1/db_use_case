const express = require("express");
const app = express();

const config = require("./config");
const Student = require("./models/Student");


app.use(express.urlencoded({ extended: false }));
app.use(globalMiddleware);


function globalMiddleware(req, res, next) {
   
    if (req.method === 'GET') {
        console.count("GET Request")
    }
    if (req.method === 'POST') {
        console.count("POST Request")
    }
    if (req.method === 'PATCH') {
        console.count("PATCH Request")
    }
    if (req.method === 'DELETE') {
        console.count("DELETE Request")
    }

    next();
};

//GET
app.get("/students", function (req, res) {
    let data = {
        where: {},
    };
    if (req.query.id !== undefined) {
        data.where.id = req.query.id;
    }
    if (req.query.section !== undefined) {
        data.where.section = req.query.section;
    }

    if (req.query.gpa !== undefined) {
        data.where.gpa = req.query.gpa;
    }

    if (req.query.nationality !== undefined) {
        data.where.nationality = req.query.nationality;
    }

    Student.findAll(data)
        .then(function (results) {
            res.status(200).send(results);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
});

//POST
app.post("/students", function (req, res) {
    Student.create(req.body)
        .then(function (result) {
            res.send(result);
        })
        .catch(function (err) {
            res.send(err);
        });
});

//PATCH
app.patch("/students/:student_id", function (req, res) {
    let student_id = parseInt(req.params.student_id);

    Student.findByPk(student_id)
        .then(function (result) {
            if (req.body.name !== undefined) {
                result.name = req.body.name;
                result.save().then(function () {
                    res.status(200).send(result);
                })
                    .catch(function (err) {
                        res.status(500).send(err);
                    });
                }
            else if (req.body.section !== undefined) {
                result.section = req.body.section;
                result.save().then(function () {
                    res.status(200).send(result);
                })
                    .catch(function (err) {
                        res.status(500).send(err);
                    });
            }
            else if (req.body.gpa !== undefined) {
                result.gpa = parseInt(req.body.gpa);
                result.save().then(function () {
                    res.status(200).send(result);
                })
                    .catch(function (err) {
                        res.status(500).send(err);
                    });
            }
            else if (req.body.nationality !== undefined) {
                result.nationality = req.body.nationality;
                result.save().then(function () {
                    res.status(200).send(result);
                })
                    .catch(function (err) {
                        res.status(500).send(err);
                    });
            }
            else {
                res.status(404).send("Student record was not found");
            }
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
});


//DELETE
app.delete("/students/:student_id", function (req, res) {
    let student_id = parseInt(req.params.student_id);

    Student.findByPk(student_id)
        .then(function (result) {
            if (result) {
                result.destroy().then(function () {
                    res.status(200).send(result);
                })
                    .catch(function (err) {
                        res.status(500).send(err);
                    });
            }
            else {
                res.status(404).send("Student record was not found");
            }
        })
        .catch(function (err) {
            res.status(500).send(err);
        });

});









config.authenticate()
    .then(function () {
        console.log("Database is connected");
    })

    .catch(function (err) {
        console.log(err);
    });



app.listen(3000, function () {
    console.log("Server is running on port 3000")
});