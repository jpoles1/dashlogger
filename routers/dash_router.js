var _ = require("lodash")
router.use((req, res, done) => {
  res.page_data = {};
  res.page_data.BASE_URL = BASE_URL;
  done();
})
router.get("/", (req, res) => {
  res.render("home.dot", res.page_data)
})
router.get("/dashdata", (req, res) => {
  db.find({button: {$ne: null}}, (err, docs) => {
    var ct_dict = docs.reduce((agg, doc) => {
      if(!agg[doc.button]){
        agg[doc.button] = 0;
      }
      agg[doc.button] += 1;
      return agg;
    }, {})
    res.page_data.button_counts = [{key: "Button Counts",
      values: Object.keys(ct_dict).map((button) => {
        return {
          label: button,
          value: ct_dict[button]
        }
      })
    }]
    var intervals = _.range(0, 23)

    var time_dict = docs.reduce((agg, doc) => {
      if(!agg[doc.button]){
        agg[doc.button] = [];
      }
      agg[doc.button].push(doc.time)
      return agg;
    }, {})
    res.page_data.button_hourly = Object.keys(time_dict).map((button) => {
      var current = time_dict[button];
      var map = current.reduce((datetime) => {
        var d = new Date(datetime);
        d.setMinutes (d.getMinutes() + 30);
        d.setMinutes (0);
        console.log(d)
        return d;
      }, {})
      return {
        name: button,
        data
      }
    })
    res.page_data.events_feed_hourly = Object.keys(time_dict).map((button) => {
      var current = time_dict[button];
      var map = current.reduce((agg, datetime) => {
        var d = new Date(datetime);
        d.setMinutes (d.getMinutes() + 30);
        d.setMinutes (0);
        if(!agg[d]){
          agg[d] = 0;
        }
        add[d] += 1;
        console.log(d)
        return agg;
      }, {})
    })
    res.json(res.page_data)
  })
})
