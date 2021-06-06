function extractHostname(url) {
    // function from https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname
    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }
    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];
    return hostname;
}

var firebaseConfig = {
    apiKey: "AIzaSyClZ_ENj82vb_qdae95aOqHz9rQJifDTI8",
    authDomain: "genderequalityrankings.firebaseapp.com",
    projectId: "genderequalityrankings",
    storageBucket: "genderequalityrankings.appspot.com",
    messagingSenderId: "406996421636",
    appId: "1:406996421636:web:b6351353569b8a1498b951",
    measurementId: "G-YGWR71378J"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var ref = firebase.database().ref("company");

var label = document.getElementById("msg")
var img = document.getElementById("img-msg")
var tabUrl = "";

chrome.tabs.getSelected(null, function(tab) {
	tabUrl = extractHostname(tab.url);
	img.src = "nodata.png";
	ref.orderByChild("url").equalTo(tabUrl).on("child_added", function(snapshot) {
  		//label.innerHTML = "key = " + snapshot.key;
		var rank = parseInt(snapshot.key) + 1;
  		img.src = rank + ".png";
		});
    });