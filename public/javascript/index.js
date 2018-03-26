$(function() {
    //For responsive navbar
    $(".dropdown-button").dropdown({ hover: false });
    $(".button-collapse").sideNav();


    $(document).on("click", "#aMySurvey", function(event) {
        if(sessionStorage.getItem("userSessionEntity") != null){
            var userSessionEntity = JSON.parse(sessionStorage.getItem("userSessionEntity"));
    		var userId = userSessionEntity.id;
            window.location.href = "/" + userId + "/survey";
        } else{
        	googleAuth.signIn().then(function(googleUser){
        		console.log(googleUser);
        		postGoogleLogin(googleUser);
        	}).catch(function(error){
        		googleLoginErrorHandler(error);
        	});
        }
    });

    $(document).on("click", "#aCreateSurvey", function(event) {
        if(sessionStorage.getItem("userSessionEntity") != null){
            var userSessionEntity = JSON.parse(sessionStorage.getItem("userSessionEntity"));
    		var userId = userSessionEntity.id;
            window.location.href = "/" + userId + "/survey";
        } else{
        	googleAuth.signIn().then(function(googleUser){
        		console.log(googleUser);
        		postGoogleLogin(googleUser);
        	}).catch(function(error){
        		googleLoginErrorHandler(error);
        	});
        }
    });


});