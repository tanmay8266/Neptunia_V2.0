if(window.location.href == "http://localhost/neptunia2/mainpage.html"){
window.onload = initApp();
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
		}
		// [END_EXCLUDE]
		else {
      
        window.location.href="Login.html";
		}

	});

}
}

$(".row").textAlign = "center";
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

// function carousel_entry(){
    var xhttp= new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status== 200){
            var obj=JSON.parse(this.responseText);
            for (i=0;i<$(".carousel-inner .carousel-item").length;i++){
                $(".carousel-item img")[i].src = `http://img.youtube.com/vi/${obj.items[i].id}/maxresdefault.jpg`;
                //  $(".carousel-item img")[i].height = '580px';
                // $(".carousel-item img")[i].width = `600px`;

                $(".carousel-item a")[i].href=`playpage.html?query=${obj.items[i].id}`;
                var videoid = obj.items[i].id;
                getTitle(videoid,$(".carousel-item h5")[i]);
            }
        }
    };
    xhttp.open("GET","https://www.googleapis.com/youtube/v3/videos?part=contentDetails&chart=mostPopular&regionCode=US&maxResults=3&key=AIzaSyDdD_Q_6M_3t4fJ3-yLo5reUqr9w1Nqlq0",true);
    xhttp.send();

// }
function getTitle(videoid,tag){
    var xhttp1= new XMLHttpRequest();
    xhttp1.onreadystatechange = function(){
        if(this.readyState==4 && this.status== 200){
            var myob=JSON.parse(this.responseText);
            tag.innerHTML = myob.items[0].snippet.title;
            console.log("hey");
}
};
xhttp1.open("GET",`https://www.googleapis.com/youtube/v3/videos?id=${videoid}&key=AIzaSyDdD_Q_6M_3t4fJ3-yLo5reUqr9w1Nqlq0&part=snippet`,true);
    xhttp1.send();
}
gridVIdeo();
function gridVIdeo(){
    var xhttp= new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status== 200){
            var obj=JSON.parse(this.responseText);
            var trendy = `<div class="trendy">
            <span style="margin-left:45px;"><b style="font-family: Roboto; font-weight: bold;font-size: 25px;">Trending </b><span class="try"><i class="fa fa-fire" style="font-size:25px;color:#f77724;"></i></span></span>
            <br>
            </div>`; 
            $("body").append(trendy);
            for(i=0; i<20; i++){

            var a = `
            <div class="img1" >
            <figure>
            <a class="login" id="anc0" href="http://www.google.com" title="Click to play"><img id="vid0" src="http://img.youtube.com/vi/${obj.items[i].id}/0.jpg" width="200" height="150" class="vid1">
            <figcaption id="cap0">
            </figcaption>
            </a>
            </figure>
            </div>`;
            $(".trendy").append(a);
            } 

 for(i=0;i<$(".trendy img").length;i++){
  getTitle(obj.items[i].id,$(".trendy figcaption")[i]);
  // $(".trendy a")[i].innerHTML = "Play";
  $(".trendy a")[i].href =`playpage.html?query=${obj.items[i].id}`;
 }
        }
    };
    xhttp.open("GET","https://www.googleapis.com/youtube/v3/videos?part=contentDetails&chart=mostPopular&regionCode=US&maxResults=20&key=AIzaSyDdD_Q_6M_3t4fJ3-yLo5reUqr9w1Nqlq0",true);
    
    xhttp.send();
  }

  function gridVIdeocat(topic){
    var xhttp= new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status== 200){
            var obj=JSON.parse(this.responseText);
            var trendy = `<div class="trendy">
            <span style="margin-left:45px;"><b style="font-family: Roboto; font-weight: bold;font-size: 25px;">${topic} </b><span class="try"><i class="fa fa-fire" style="font-size:25px;color:#f77724;"></i></span></span>
            <br>
            </div>`; 
            $(".trendy").remove();
            $("body").append(trendy);
            for(i=0; i<20; i++){

            var a = `
            <div class="img1" >
            <figure>
            <a class="login" id="anc0" href="http://www.google.com" title="Click to play"><img id="vid0" src="http://img.youtube.com/vi/${obj.items[i].id.videoId}/0.jpg" width="200" height="150" class="vid1">
            <figcaption id="cap0">
            </figcaption>
            </a>
            </figure>
            </div>`;
            $(".trendy").append(a);                                        
            } 

 for(i=0;i<$(".trendy img").  length;i++){
  getTitle(obj.items[i].id.videoId,$(".trendy figcaption")[i]);
  // $(".trendy a")[i].innerHTML = "Play";
  $(".trendy a")[i].href =`playpage.html?query=${obj.items[i].id.videoId}`;
 }


 
        }
    };
    xhttp.open("GET",`https://www.googleapis.com/youtube/v3/search?part=id&q=${topic}&regionCode=US&relevanceLanguage=en&type=video&key=AIzaSyDdD_Q_6M_3t4fJ3-yLo5reUqr9w1Nqlq0&maxResults=20`,true);
    
    xhttp.send();
  }

$("#log-btn").bind("click",function(event){
  console.log("LOG");
   event.preventDefault();
   logout();
  });
  $("#login-btn").bind("click",function(event){
    
     event.preventDefault();
    window.location.href = "Login.html";
    });
  
function logout() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    window.location.href = "Login.html";
  }).catch(function(error) {
    // An error happened.
  });
  }

  $(".category").bind("click",function(event){
    console.log("hey");
    var topic = $(event.target).text();
    console.log(topic);
    gridVIdeocat(topic);
    event.preventDefault();
  })
  $("#wth-btn").bind("click",function(event){
    
    event.preventDefault();
   window.location.href = "watchlist.html";
   });
 