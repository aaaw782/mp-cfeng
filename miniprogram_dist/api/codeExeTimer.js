
var Timer = {
  data: {},
  start: function (key) {
    Timer.data[key] = new Date();
  },
  stop: function (key) {
    var time = Timer.data[key];
    if (time)
      Timer.data[key] = new Date() - time;


    console.log("the " + key + " time is:" + Timer.data[key] + "ms");
  },
  getTime: function () {
    return Timer.data[key];
  }
};

module.exports = {
  Timer: Timer,
}