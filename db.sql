CREATE DATABASE students;

--\c students

CREATE TABLE students (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(150),
    age INT NOT NULL,
    dob DATE NOT NULL
);


INSERT INTO students (name, email, age, dob) VALUES ("Aymen", "asekhri@inttic.dz", 22, '2000-02-17');