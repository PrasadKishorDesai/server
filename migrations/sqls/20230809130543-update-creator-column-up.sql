ALTER TABLE `students_docker_db`.`students` 
ADD COLUMN `creator` VARCHAR(45) NOT NULL AFTER `country_code`;
