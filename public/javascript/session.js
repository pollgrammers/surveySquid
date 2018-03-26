var path = window.location.pathname;
var page = path.split("/").pop();
console.log("page: " + page);
function checkLoggedIn() {
    if ((page != "index.html" && page != "/" && page != "" && page != "submit.html" && page != "respond") && sessionStorage.getItem("userSessionEntity") == null) {
        console.log("User not signed in. Redirecting to home page.");
        window.location.href = "/";
        return;
    } else if ((page == "index.html" || page == "/" || page == "" || page == "submit.html" || page == "respond") && sessionStorage.getItem("userSessionEntity") == null){
        // Show navbar menu based on user logged out status
        console.log("Hiding navSignedIn");
        $("#navSignedIn").hide();

    } else if ((page == "index.html" || page == "/" || page == "" || page == "submit.html" || page == "respond") && sessionStorage.getItem("userSessionEntity") != null){
        // Show navbar menu based in user logged in status
        console.log("Hiding navSignedOut");
        var userSessionEntity = JSON.parse(sessionStorage.getItem("userSessionEntity"));
        var userId = userSessionEntity.id;
        $(".mySurveys").attr("href","/"+userId+"/survey");
        $(".createSurvey").attr("href","/create");
        $("#navSignedOut").hide();
    } else{
        console.log("Hiding navSignedOut");
        var userSessionEntity = JSON.parse(sessionStorage.getItem("userSessionEntity"));
        var userId = userSessionEntity.id;
        $(".mySurveys").attr("href","/"+userId+"/survey");
        $(".createSurvey").attr("href","/create");
        $("#navSignedOut").hide();
    }

};
checkLoggedIn();