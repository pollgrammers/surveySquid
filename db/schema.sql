CREATE DATABASE surveySquid;
USE surveySquid;

CREATE TABLE `user` (
  `user_id` Int(5) AUTO_INCREMENT NOT NULL,
  `user_email` VARCHAR(50) NOT NULL,
  `user_fname` VARCHAR(20) NOT NULL,
  `user_lname` VARCHAR(20) NOT NULL,
  `user_image` VARCHAR(2083) NOT NULL,

  PRIMARY KEY ( `user_id` ) 
);

CREATE TABLE `survey` (
  `survey_id` Int(5) AUTO_INCREMENT NOT NULL,
  `survey_name` VARCHAR(50) NOT NULL,
  `user_id` Int(5) AUTO_INCREMENT NOT NULL,
  `survey_type` VARCHAR(15) NOT NULL,
  `survey_start_date` DATE,
  `survey_end_date` DATE,

  PRIMARY KEY ( `survey_id` ) 
);

CREATE TABLE `survey_question` (
  `question_id` Int(10) AUTO_INCREMENT NOT NULL,
  `survey_id` Int(5) AUTO_INCREMENT NOT NULL,
  `question_type` VARCHAR(15) NOT NULL,
  `question_text` VARCHAR(256) NOT NULL,

  PRIMARY KEY ( `question_id` ) 
);

CREATE TABLE `survey_question_choice` (
  `choice_id` Int(10) AUTO_INCREMENT NOT NULL,
  `question_id` Int(10) AUTO_INCREMENT NOT NULL,
  `choice_text` VARCHAR(256) NOT NULL,

  PRIMARY KEY ( `choice_id` ) 
);

CREATE TABLE `survey_response` (
  `response_id` Int(10) AUTO_INCREMENT NOT NULL,
  `respondent_user_id` Int(5) AUTO_INCREMENT NOT NULL,
  `question_id` Int(10) AUTO_INCREMENT NOT NULL,
  `choice_id` Int(10) AUTO_INCREMENT NOT NULL,

  PRIMARY KEY ( `response_id` ) 
);