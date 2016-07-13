var dash_button = require('node-dash-button');
var Datastore = require('nedb')
var _ = require('lodash')
//Setup config
var db = new Datastore({ filename: 'activity.json', autoload: true });
var dude_button = {
  mac: "44:65:0d:ed:e9:2f"
}
var mac_list = {[dude_button.mac]: "Dude Button"}
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
