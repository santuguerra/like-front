let firebase = require('firebase')

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBjkP5n0qJQcxSnXqoT5GtQ766cO3Jdxlg",
    authDomain: "likes-a43d8.firebaseapp.com",
    databaseURL: "https://likes-a43d8.firebaseio.com",
    projectId: "likes-a43d8",
    storageBucket: "",
    messagingSenderId: "161010243029",
    appId: "1:161010243029:web:42df073093b29d2f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase