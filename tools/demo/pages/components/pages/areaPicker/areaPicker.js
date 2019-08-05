


var dataUtil = require('../../../../components/api.js').dataUtil;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',
  },


  // 地区选择器
  bindAreachange: function (e) {
    var addressArray = e.detail.value;
    var province = '';
    var city = '';
    var distric = '';
    if (e.detail.value.length > 0) {
      province = addressArray[0];
    }
    if (e.detail.value.length > 1) {
      city = addressArray[1];
    }
    if (e.detail.value.length > 2) {
      distric = addressArray[2];
    }
    this.setData({
      address: province + city + distric,
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    dataUtil.configParams({
      host: 'https://previewapi.cfeng56.com.cn/',
      statusSuccess: 1,
    });
  },

  onHide: function () {
    dataUtil.configParams({
      statusSuccess: 200,
    });
  },

})
