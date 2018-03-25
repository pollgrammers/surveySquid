// Google login initialization
var googleAuth;
var googleUser;

var signinChanged = function(val) {
    console.log('Signin state changed to ', val);
    document.getElementById('signed-in-cell').innerText = val;
};


gapi.load("auth2", function() {
    googleAuth = gapi.auth2.init({
        client_id: "480117956346-0vqf12ip31h7jj0ardhsjdtsg34eglne.apps.googleusercontent.com",
        scope: "profile"
    });
    googleLogin(document.getElementById("btnLogin"));
    googleLogin(document.getElementById("btnRegisterNewUser"));
    // Listen for sign-in state changes.
    //googleAuth.isSignedIn.listen(signinChanged);

});


function googleLogin(element) {
    googleAuth.attachClickHandler(element, {},
        function(googleUser) {
            console.log("Google login successful");

            var user = {};
            user.user_email = googleUser.getBasicProfile().getEmail();
            user.user_fname = googleUser.getBasicProfile().getName();
            user.user_image = googleUser.getBasicProfile().getImageUrl();


            $.ajax({
                url: "https://floating-temple-72911.herokuapp.com/api/user",
                method: "POST",
                crossDomain: true,
                data: user,
                dataType: 'jsonp',
            }).done(function(user) {
                console.log(user);
                //Store the entity object in sessionStorage where it will be accessible from all pages of the site.
                var userSessionEntity = {};
                userSessionEntity.id = user.user_id;
                userSessionEntity.googleId = googleUser.getBasicProfile().getId();
                userSessionEntity.name = user.user_fname;
                userSessionEntity.imageUrl = user.user_image;
                userSessionEntity.email = user.user_email;
                userSessionEntity.idToken = googleUser.getAuthResponse().id_token;
                sessionStorage.setItem("userSessionEntity", JSON.stringify(userSessionEntity));

                window.location.href = "viewsurvey.html";


            }).fail(function(xhr, status, error) {
                console.log(error);
                window.location.href = "index.html";
            });

        },
        function(error) {
            console.log("failed signin" + error);
            window.location.href = "index.html";
        });
}

$(function() {
    $(document).on("click", "#navSignout", async function(event) {
        console.log("In function Signout");

        googleAuth.signOut().then(function() {
            sessionStorage.removeItem("userSessionEntity");
            console.log('User signed out.');
            window.location.href = "index.html";
        });
    });
});