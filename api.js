const express = require("express");
const rp = require('request-promise');
const router = express.Router();

const firebase = require("firebase-admin");
const serviceAccount = JSON.parse(Buffer.from(process.env.FIREBASE64KEY, 'base64'));
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://the-meatball-stoppe.firebaseio.com"
});

// Facebook verification
router.get("/webhook", (req, res) => {
  if (req.query["hub.verify_token"] === process.env.FBTOKEN) {
    res.send(req.query["hub.challenge"]);
  } else {
    res.send("No sir.");
  }
});

// Change made to TMS FB page :: Update Firebase
router.post("/webhook", (req, res) => {
  let options = {
    uri: `https://graph.facebook.com/v2.8/790534394301792/feed?fields=permalink_url,from,message,full_picture&access_token=1828570360690824|${process.env.FBAPPSECRET}`,
    json: true
  };

  rp(options)
    .then(function(response) {
      const postInfo = response.data.filter(post => {
        return post.from.name === "The Meatball Stoppe" && post.full_picture;
      })[0];

      if (postInfo.message) {
        postInfo.message = postInfo.message.slice(0, 115) + "...";
      } else {
        postInfo.message = "";
      }

      firebase
        .database()
        .ref("mostRecentFBPost")
        .set({
          imageURL: postInfo.full_picture,
          url: postInfo.permalink_url,
          message: postInfo.message
        });
      res.send(postInfo);
    })
    .catch(function(err) {
      res.send(err);
      console.log(err.body);
    });
});

module.exports = router;
