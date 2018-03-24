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

            //Store the entity object in sessionStorage where it will be accessible from all pages of the site.
            var userSessionEntity = {};
            userSessionEntity.id = googleUser.getBasicProfile().getId();
            userSessionEntity.name = googleUser.getBasicProfile().getName();
            userSessionEntity.imageUrl = googleUser.getBasicProfile().getImageUrl();
            userSessionEntity.email = googleUser.getBasicProfile().getEmail();
            userSessionEntity.idToken = googleUser.getAuthResponse().id_token;
            sessionStorage.setItem("userSessionEntity", JSON.stringify(userSessionEntity));

            window.location.href = "viewsurvey.html";

            // database.ref("/crammingUsers").orderByChild("email").equalTo(googleUser.getBasicProfile().getEmail()).once("value", function(snapshot) {
            //     if (snapshot.val() !== null) {
            //         console.log("Existing user");
            //         window.location.href = "feed.html";
            //         return;
            //     } else {
            //         console.log("user is not null");
            //         var crammingUser = {
            //             "id": googleUser.getBasicProfile().getId(),
            //             "name": googleUser.getBasicProfile().getName(),
            //             "imageUrl": googleUser.getBasicProfile().getImageUrl(),
            //             "email": googleUser.getBasicProfile().getEmail(),
            //             "phone": "",
            //             "receiveTextNotification": true
            //         };
            //         database.ref("/crammingUsers").push(crammingUser);
            //         window.location.href = "profile.html";
            //     }

            // });
        },
        function(error) {
            console.log("failed signin" + error);
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