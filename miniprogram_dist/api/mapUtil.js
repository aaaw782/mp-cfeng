

var typeUtil = require('./typeUtil')
var QQMapWX = require('../libs/qqmap/qqmap-wx-jssdk.js');
// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: '2EUBZ-6WAWD-TCN43-HWF4X-FHFVJ-PBBMX'
});

/**
 * 配置QQ地图key
 * @param key
 * @returns {any}
 */
function configKey(key) {
  if (typeUtil.stringIsNull(key)) {
    return;
  }

  qqmapsdk = new QQMapWX({
    key: key
  });
}


// 获取经纬度及地址信息
function doGetLocationInfo(cb) {
  wx.getLocation({
    type: 'wgs84',
    success: function (res) {
      var latitude = res.latitude
      var longitude = res.longitude

      // 调用接口
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: latitude,
          longitude: longitude
        },
        coord_type: 1, // gps坐标
        success: function (res) {
          console.log(res);

          var locationInfo = {
            longitude: longitude,
            latitude: latitude,
            province: res.result.address_component.province,
            city: res.result.address_component.city,
            district: res.result.address_component.district,
            address: res.result.address_component.street_number,
          };

          try {
            wx.setStorageSync('locationInfo', locationInfo);

            var isSuccess = true;
            typeof cb == "function" && cb(isSuccess);
          } catch (e) {
            console.log("save locationInfo error: " + e);
          }
        }
      });
    }
  });
}

module.exports = {
  doGetLocationInfo: doGetLocationInfo,
  qqmapsdk: qqmapsdk,
  configKey: configKey,
}
