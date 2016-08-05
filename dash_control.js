var dash_button = require('node-dash-button');
var Datastore = require('nedb')
var _ = require('lodash')
//Setup config
var db = new Datastore({ filename: 'data/activity.json', autoload: true });
//Run: sudo node node_modules/node-dash-button/bin/findbutton
//in order to find devices
var dude_button = {
  mac: "44:65:0d:ed:e9:2f"
}
var on_button_1 = {
  mac: "74:75:48:cd:01:8f"
}
var on_button_2 = {
  mac: "a0:02:dc:36:3b:92"
}
var milk_button = {
  mac: "44:65:0d:a8:8f:87"
}
var all_button = {
  mac: "44:65:0d:21:42:1b"
}
var mac_list = {
  [dude_button.mac]: "Dude Button",
  [on_button_1.mac]: "On Button 1",
  [on_button_2.mac]: "On Button 2",
  [milk_button.mac]: "Milk Button",
  [all_button.mac]: "All Button"
}
var dash_listener = dash_button(_.keys(mac_list)); //address from step above
dash_listener.on("detected", function (dash_mac){
  console.log("Dash Button Pressed:", mac_list[dash_mac])
  var db_entry = {
    button: mac_list[dash_mac],
    time: Date.now()
  }
  db.insert(db_entry, (err) => {
    if(err){
      console.log("Failed to add entry to DB")
      return 1;
    }
    console.log("Added entry to DB:", db_entry)
  })
});
return db;
