var express = require('express')
var app = express()
var bodyParser = require('body-parser')
// var btn = document.getElementsByClassName("circle")
// var btn2 = document.getElementsByClassName('circle2')
// var btn3 = document.getElementsByClassName('circle3')
// var btn4 = document.getElementsByClassName('circle4')
var jsonParser = bodyParser.json()

//const CircularAudioWave = require('./src/js/circular-audio-wave.js');

app.listen(80, function(){
  console.log('Server ready on port 80!');
})

app.post('/integers', bodyParser.urlencoded({extended: true}), function (req, res) {
  var integerArr = req.body.integers;
  // 1 = snare
  // 2 = crashs
  // 3 = hihat
  // 4 = tom
  //console.log("beforeTest");
  console.log(integerArr);
  //console.log("afterTest");
  //var wave = new CircularAudioWave(document.getElementById('chart-container'),{mode:'sunburst'});
  //var btn = document.getElementsByClassName("circle")
  if (integerArr == 1) {
    console.log("Snare");
    //document.getElementsByClassName("circle").setAttribute("transform", "scale(1.5)");
    //window.addEventListener("DOMContentLoaded", btn.setAttribute("transform", "scale(1.5)"), false);
    // btn2.setAttribute("transform", "scale(1)")
    // btn3.setAttribute("transform", "scale(1)")
    // btn4.setAttribute("transform", "scale(1)")
  } else if (integerArr == 2) {
    console.log("Crash");
    // btn.setAttribute("transform", "scale(1)")
    // btn2.setAttribute("transform", "scale(1.5)")
    // btn3.setAttribute("transform", "scale(1)")
    // btn4.setAttribute("transform", "scale(1)")
  } else if (integerArr == 3) {
    console.log("HiHat");
    // btn.setAttribute("transform", "scale(1)")
    // btn2.setAttribute("transform", "scale(1)")
    // btn3.setAttribute("transform", "scale(1.5)")
    // btn4.setAttribute("transform", "scale(1)")
   } else if (integerArr == 4) {
     console.log("Tom");
     // btn.setAttribute("transform", "scale(1)")
     // btn2.setAttribute("transform", "scale(1)")
     // btn3.setAttribute("transform", "scale(1)")
     // btn4.setAttribute("transform", "scale(1.5)")
   }
  return res.send('got numbers');
})

app.use(express.static('../circular-audio-wave-master'))
