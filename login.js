function toggleSignIn() {
	var email = document.getElementById('email_field').value;
	var password = document.getElementById('password_field').value;
	if (email.length < 4) {
		alert('Please enter an email address.');
		return;
	}
	if (password.length < 4) {
		alert('Please enter a password.');
		return;
	}
	// Sign in with email and pass.
	// [START authwithemail]
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// [START_EXCLUDE]
		if (errorCode === 'auth/wrong-password') {
			alert('Wrong password.');
		} else {
			alert(errorMessage);
		}
		console.log(error);
		// [END_EXCLUDE]
	});

}
document.getElementById('submit-btn').addEventListener('click', toggleSignIn, false);
$("#reg-btn").bind("click",function(event){
	event.preventDefault();
	window.location.href = "signup.html";

});

function initApp() {
	// Listening for auth state changes.
	// [START authstatelistener]
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			// User is signed in.
			var displayName = user.displayName;
			var email = user.email;
			var emailVerified = user.emailVerified;
			var photoURL = user.photoURL;
			var isAnonymous = user.isAnonymous;
			var uid = user.uid;
			var providerData = user.providerData;
			console.log(displayName + " " + email);
			window.location.href = "mainpage.html"
		}
		// [END_EXCLUDE]
		else {

		}

	});

}
window.onload = function () {
	initApp();
};