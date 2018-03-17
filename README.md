# surveySquid


##Create an user:

https://floating-temple-72911.herokuapp.com/api/user

###HTTP Method: POST
###HTTP Body:
```
{

	"user_email": "test@gmail.com",
	"user_fname": "test_fname",
	"user_lname": "test_lname",
	"user_image": "test image"
}
```



##Get user details:

https://floating-temple-72911.herokuapp.com/api/user/{id}

###HTTP Method: GET




##Update user details:

https://floating-temple-72911.herokuapp.com/api/user/{id}

###HTTP Method: PUT
###HTTP Body:
```
{
	"user_email": "test_update@gmail.com",
	"user_fname": "test_update_fname",
	"user_lname": "test_update_lname",
	"user_image": "test image update"
}
```



##Create a new survery:

https://floating-temple-72911.herokuapp.com/api/user/{id}/survey

###HTTP Method: POST
###HTTP Body:

```
{
    "user_id": "1",
    "survey_name": "Drink choice",
    "survey_desc": "Survey to find most popular drink",
    "survey_type": "public",
    "survey_start_date": "2018-03-16",
    "survey_end_date": "2018-03-19",
    "SurveyQuestions": [
        {
            "question_type": "choice",
            "question_text": "What is your fav drink?",
            "SurveyQuestionChoices": [
                {
                    "choice_text": "Coke"
                },
                {
                    "choice_text": "MountainDew"
                },
                {
                    "choice_text": "Pepsi"
                },
                {
                    "choice_text": "ThumbsUp"
                }
            ]
        }
    ]
}
```




##Get all surveys created by a user

https://floating-temple-72911.herokuapp.com/api/user/{id}/survey

###HTTP Method: GET




##Search surveys created by a user

https://floating-temple-72911.herokuapp.com/api/user/{id}/survey?search={search string}

###HTTP Method: GET




##Get survey details (not the survey result)

https://floating-temple-72911.herokuapp.com/api/user/{id}/survey/{surveyId}

###HTTP Method: GET




##Respond/submit to a survey:

https://floating-temple-72911.herokuapp.com/api/user/{id}/survey/{surveyId}/response

###HTTP Method: POST
###HTTP Body:
```
{
    "SurveyQuestions": [
        {
            "question_id": 1,
            "choice_id": 2
        },
        {
            "question_id": 2,
            "choice_id": 3
        }
    ]
}
```




##Get survey response/result 

https://floating-temple-72911.herokuapp.com/api/user/{id}/survey/{surveyId}/response

###HTTP Method: GET