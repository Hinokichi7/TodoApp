// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.15.2/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyArv15xOLXoq3FWhlh_-l6ae2KaHC8HUKg",
    authDomain: "todoapp-8da1b.firebaseapp.com",
    databaseURL: "https://todoapp-8da1b.firebaseio.com",
    projectId: "todoapp-8da1b",
    storageBucket: "todoapp-8da1b.appspot.com",
    messagingSenderId: "617927059044",
    appId: "1:617927059044:web:4391c7671b0fca6fd62171"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script>