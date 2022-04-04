const pool = require("../../db");
const queries = require("./queries");

const getStudents = (req, res) => {
  pool.query(queries.getAllStudents, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentByID, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const createStudent = (req, res) => {
  const { name, email, age, dob } = req.body;

  // Check if an email is already exist
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (results.rows.length) {
      res.json({ msg: `Email ${email} is already exist!` });
    }
    // If the email doesn't exist then create the new student
    pool.query(
      queries.createStudent,
      [name, email, age, dob],
      (error, results) => {
        if (error) throw error;
        res.status(201).json({ msg: "Student Created successfully" });
      }
    );
  });
};

///////////// Update Student
const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getStudentByID, [id], (error, results) => {
    // Check the student if does he exist or not !
    if (!results.rows.length) {
      res
        .status(404)
        .json({ msg: "The student does not exist on the database" });
    }

    const { name, email, age, dob } = req.body;

    // if (name) {
    //   res.json(name); // here !!
    // }

    const logMsgs = [];
    if (name) {
      console.log(queries.updateStudent.name);
      pool.query(queries.updateStudent.name, [name, id], (error, results) => {
        if (error) throw error;
        logMsgs.push({ msg: "The name has been updated successfully!" });
      });
      console.log(logMsgs);
    }
    if (email) {
      pool.query(queries.updateStudent.email, [email, id], (error, results) => {
        if (error) throw error;
        logMsgs.push({ msg: "The email has been updated successfully!" });
      });
    }
    if (age) {
      pool.query(queries.updateStudent.age, [age, id], (error, results) => {
        if (error) throw error;
        logMsgs.push({ msg: "The age has been updated successfully!" });
      });
    }

    if (dob) {
      pool.query(queries.updateStudent.dob, [dob, id], (error, results) => {
        if (error) throw error;
        logMsgs.push({
          msg: "The date of birth has been updated successfully!",
        });
      });
    }
    res.status(200).json(logMsgs);
  });
};

////////////////////////// Delete Student
const deleteStudent = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentByID, [id], (error, results) => {
    // Check the student if does he exist or not !
    if (!results.rows.length) {
      res
        .status(404)
        .json({ msg: "The student does not exist on the database" });
    }
    // Delete the student if exist
    pool.query(queries.deleteStudent, [id], (error, results) => {
      if (error) throw error;
      res.status(200).json({ msg: "Successfully Deleted!" });
    });
  });
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
