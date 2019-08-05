

var dataUtil = require('../../../../components/api.js').dataUtil;

Page({
  data: {

  },




  onShow: function () {

  },

  onLoad: function (options) {
    dataUtil.configParams({
      host: 'http://localhost:8080/',
      hostFile: 'http://192.168.30.10:8585/oss/',
    });
  },


  // 上传文件成功
  uploadFileSuccess: function (e) {

  },

  // 清除数据
  deleteImage: function (e) {

  }

})
