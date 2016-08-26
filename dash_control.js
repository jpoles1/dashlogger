var dash_button = require('node-dash-button');
var Datastore = require('nedb')
var request = require('request')
var _ = require('lodash')
//Setup config
var db = new Datastore({ filename: 'data/activity.json', autoload: true });
var http_voice = (command) => {
  request("http://192.168.1.100:3030/voice?cmd="+command, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body) // Show the HTML for the Google homepage.
    }
    else{
      console.log(error)
    }
  })
}
//Run: sudo node node_modules/node-dash-button/bin/findbutton
//in order to find devices
var dude_button = {
  name: "Dude Button",
  mac: "44:65:0d:ed:e9:2f",
  cb: () => {
    http_voice("all%20off")
  }
}
var on_button_1 = {
  name: "On Button 1",
  mac: "74:75:48:cd:01:8f",
  cb: () => {
    http_voice("all%20on")
  }
}
var on_button_2 = {
  name: "On Button 2",
  mac: "a0:02:dc:36:3b:92"
}
var milk_button = {
  name: "Milk Button",
  mac: "44:65:0d:a8:8f:87"
}
var all_button = {
  name: "All Button",
  mac: "44:65:0d:21:42:1b",
  cb: () => {
    http_voice("all%20off")
  }
}
//create map of mac address keys and button objects
var mac_list = {
  [dude_button.mac]: dude_button,
  [on_button_1.mac]: on_button_1,
  [on_button_2.mac]: on_button_2,
  [milk_button.mac]: milk_button,
  [all_button.mac]: all_button
}
var dash_listener = dash_button(_.keys(mac_list)); //mac addresses from step above
dash_listener.on("detected", function (dash_mac){
  var dash_obj = mac_list[dash_mac];
  console.log("Dash Button Pressed:", dash_obj.name)
  var db_entry = {
    button: dash_obj.name,
    time: Date.now()
  }
  db.insert(db_entry, (err) => {
    if(err){
      console.log("Failed to add entry to DB")
      return 1;
    }
    console.log("Added entry to DB:", db_entry)
  })
  if(dash_obj.cb){
    dash_obj.cb();
  }
});
module.exports = db;
