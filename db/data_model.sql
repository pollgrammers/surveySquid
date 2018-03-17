CREATE DATABASE surveysquid;

USE surveysquid1;

CREATE TABLE APP_USER (
    user_id INT NOT NULL AUTO_INCREMENT,
    user_email VARCHAR(50) NOT NULL,
    user_fname VARCHAR(20),
    user_lname VARCHAR(20),
    user_image VARCHAR(2083),
    PRIMARY KEY (user_id),
    INDEX userid_idx (user_id)
);

CREATE TABLE SURVEY (
    survey_id INT(5) NOT NULL AUTO_INCREMENT,
    user_id INT(5) NOT NULL,
    survey_name VARCHAR(50),
    survey_desc VARCHAR(1000),
    survey_type VARCHAR(15) NOT NULL,
    survey_start_date DATE,
    survey_end_date DATE,
    PRIMARY KEY (survey_id),
    INDEX surveyid_idx (survey_id),
    FOREIGN KEY (user_id)
        REFERENCES APP_USER (user_id),
    CHECK (LOWER(question_type) = 'public'
        OR LOWER(question_type) = 'private')
);

CREATE TABLE SURVEY_QUESTION (
    question_id INT(10) NOT NULL AUTO_INCREMENT,
    survey_id INT(5) NOT NULL,
    question_type VARCHAR(15) NOT NULL DEFAULT 'public',
    question_text VARCHAR(1000) NOT NULL,
    PRIMARY KEY (question_id),
    INDEX questionid_idx (question_id),
    FOREIGN KEY (survey_id)
        REFERENCES SURVEY (survey_id)
        ON DELETE CASCADE,
    CHECK (LOWER(question_type) = 'choice'
        OR LOWER(question_type) = 'star')
);

CREATE TABLE SURVEY_QUESTION_CHOICE (
    choice_id INT(10) NOT NULL AUTO_INCREMENT,
    question_id INT(10) NOT NULL,
    choice_text VARCHAR(256) NOT NULL,
    PRIMARY KEY (choice_id),
    INDEX choiceid_idx (choice_id),
    FOREIGN KEY (question_id)
        REFERENCES SURVEY_QUESTION (question_id)
        ON DELETE CASCADE
);

CREATE TABLE SURVEY_RESPONSE (
    response_id INT(10) NOT NULL AUTO_INCREMENT,
    respondent_user_id INT(5) NULL,
    survey_id INT(5) NOT NULL,
    question_id INT(10) NOT NULL,
    choice_id INT(10) NULL,
    created_at DATETIME NULL,
    updated_at DATETIME NULL,
    PRIMARY KEY (response_id),
    INDEX responseid_idx (response_id),
    FOREIGN KEY (respondent_user_id)
        REFERENCES APP_USER (user_id),
    FOREIGN KEY (survey_id)
        REFERENCES SURVEY (survey_id),
    FOREIGN KEY (question_id)
        REFERENCES SURVEY_QUESTION (question_id)
        ON DELETE CASCADE,
    FOREIGN KEY (choice_id)
        REFERENCES SURVEY_QUESTION_CHOICE (choice_id)
        ON DELETE CASCADE
);



/*Create user*/
INSERT INTO APP_USER 
(user_email, user_fname, user_lname, user_image) 
VALUES('ravish_rao@yahoo.com','Ravish','Rao','image URL for Ravish');

/*Get user details*/
SELECT u.user_id, u.user_email, u.user_fname, u.user_lname, u.user_image 
FROM APP_USER u 
WHERE u.user_id = 1;

/*Update user*/
UPDATE APP_USER
SET user_fname = 'Ravi',
user_lname = 'Rao',
user_image = 'Some other image URL'
WHERE user_id = 1;

/*Get top 10 surveys for a given user*/
SELECT 
    s.survey_id,
    s.survey_name,
    s.survey_desc,
    s.survey_type,
    s.survey_start_date,
    s.survey_end_date
FROM
    survey s,
    app_user u
WHERE
    s.user_id = u.user_id AND u.user_id = 1
ORDER BY s.survey_start_date ASC
LIMIT 10;

/*Get all surveys for a given user*/
SELECT 
    s.survey_id,
    s.survey_name,
    s.survey_desc,
    s.survey_type,
    s.survey_start_date,
    s.survey_end_date
FROM
    survey s,
    app_user u
WHERE
    s.user_id = u.user_id AND u.user_id = 1
ORDER BY s.survey_start_date ASC;

/*Search for user survey based on key word*/
SELECT 
    s.survey_id,
    s.survey_name,
    s.survey_desc,
    s.survey_type,
    s.survey_start_date,
    s.survey_end_date
FROM
    survey s,
    app_user u
WHERE
    s.user_id = u.user_id AND u.user_id = 1
        AND (s.survey_name LIKE '%food%'
        OR s.survey_desc LIKE '%food%')
ORDER BY s.survey_start_date ASC;

/*create survey*/
INSERT INTO SURVEY
(user_id, survey_name, survey_desc, survey_type, survey_start_date, survey_end_date)
VALUES(
    (SELECT user_id FROM APP_USER WHERE user_email = 'ravish_rao@yahoo.com'),
    'Fav Game',
    'Survey to find most popular game',
    'public',
    current_date(),
    current_date() + 3
);
INSERT INTO SURVEY_QUESTION
(survey_id, question_type, question_text)
VALUES (
    2,
    'choice',
    'What is your fav sport?'
);
INSERT INTO SURVEY_QUESTION_CHOICE
(question_id, choice_text)
VALUES(
2,
'Football'
);
INSERT INTO SURVEY_QUESTION_CHOICE
(question_id, choice_text)
VALUES(
2,
'Chess'
);
INSERT INTO SURVEY_QUESTION_CHOICE
(question_id, choice_text)
VALUES(
2,
'Basketball'
);
INSERT INTO SURVEY_QUESTION_CHOICE
(question_id, choice_text)
VALUES(
2,
'Baseball'
);

/*Respond to a survey*/
INSERT INTO SURVEY_RESPONSE
(respondent_user_id, survey_id, question_id, choice_id)
VALUES(
    1,
    2,
    2,
    2
);


/*View survey response*/
SELECT 
    s.survey_id, sr.question_id, sr.choice_id, COUNT(*)
FROM
    survey s,
    survey_response sr
WHERE
    s.survey_id = sr.survey_id
GROUP BY s.survey_id , sr.question_id , sr.choice_id
ORDER BY s.survey_id , sr.question_id , sr.choice_id ASC;


