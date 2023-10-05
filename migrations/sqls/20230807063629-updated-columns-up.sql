-- modifying blood_group column to enum datatype 

ALTER TABLE students
MODIFY COLUMN blood_group ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-') NOT NULL;

-- adding country_code column

ALTER TABLE students
ADD country_code varchar(5) NOT NULL;

