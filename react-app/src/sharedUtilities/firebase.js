import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyB04QxZsKSPCwUVLoUJzIduX82MYbr8FOg",
  authDomain: "the-meatball-stoppe.firebaseapp.com",
  databaseURL: "https://the-meatball-stoppe.firebaseio.com",
  projectId: "the-meatball-stoppe",
  storageBucket: "the-meatball-stoppe.appspot.com",
  messagingSenderId: "380386201370"
};

export default () => firebase.initializeApp(config);