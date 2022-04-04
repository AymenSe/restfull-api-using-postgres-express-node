const getAllStudents = "SELECT * FROM students";
const getStudentByID = "SELECT * FROM students WHERE id = $1";
const createStudent =
  "INSERT INTO students (name, email, age, dob) VALUES ($1, $2, $3, $4)";
const checkEmailExists = "SELECT * FROM students WHERE email = $1";
const deleteStudent = "DELETE FROM students WHERE id = $1";

const updateStudent = {
  name: "UPDATE students SET name = $1 WHERE id = $2",
  email: "UPDATE students SET email = $1 WHERE id = $2",
  age: "UPDATE students SET age = $1 WHERE id = $2",
  dob: "UPDATE students SET dob = $1 WHERE id = $2",
};

module.exports = {
  getAllStudents,
  getStudentByID,
  createStudent,
  checkEmailExists,
  deleteStudent,
  updateStudent,
};
