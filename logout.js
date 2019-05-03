function logout(){
  firebase.auth().signOut();
  window.location="Login.html";
}
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.


    var user = firebase.auth().currentUser;
      } else {
    // No user is signed in.

    window.location="Login.html";

  }
});