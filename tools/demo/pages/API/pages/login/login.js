//loging.js

var base64 = require('../../../../components/api.js').base64;
var MD5 = require('../../../../components/api.js').MD5;
var util = require('../../../../components/api.js').util;
var typeUtil = require('../../../../components/api.js').typeUtil;
var config = require('../../../../components/api.js').config;
var requestUtil = require('../../../../components/api.js').requestUtil;
var dataUtil = require('../../../../components/api.js').dataUtil;
// var requestUtil = require('../../../../utils/requestUtil');
const duration = 2000;


var app = getApp();

Page({
  data: { 
    loginName: '',
    employeePwd: '',
    loading: false,
    showDialog: false,
    showList: true
  },

  loginNameChange: function (e) {
    this.data.loginName = e.detail.value
  },

  PwdChange: function (e) {
    this.data.employeePwd = e.detail.value
  },

  /*点击变色*/
  click: function (e) {
    var id = e.currentTarget.dataset.id
    var that = this
    that.setData({
      id: id
    })
  },

  // 检查参数
  checkUpParam: function () {
    if (typeUtil.stringIsNull(this.data.loginName)) {
      util.lastToast('请输入手机号码！', 'info', this);
      return false;
    } else if (typeUtil.stringIsNull(this.data.employeePwd)) {
      util.lastToast('请输入密码！', 'info', this);
      return false;
    }
    return true;
  },


  // 登录
  doLogin: function (e) {
    if (!this.checkUpParam()) {
      return;
    }
    var that = this
    var loginName = that.data.loginName
    var employeePwd = that.data.employeePwd
    var phoneNam = that.data.phoneNam
    employeePwd = MD5.hexMD5(employeePwd);
    // employeePwd = base64.encode(employeePwd);

    
    var paramData = {
      phone: loginName,
      employeePwd: employeePwd,
    };


    requestUtil.middleRequestPost('oauth/managerLogin', paramData, function (res) {
      if (res.data.status == config.statusSuccess) {
        // success
        var user = res.data.body;

        util.toast('请求成功', true);
        app.globalData.userInfo = res.data.body;
        app.globalData.userInfo.employeePwd = employeePwd;

      } else {
        // fail
        util.showFailRequest(res.data.message, that);
      }
    }, that, true, false);
  },


  onLoad: function (options) {
    dataUtil.configParams({
      host: 'http://192.168.30.10:8585/pms-api/',
      hostFile: 'http://192.168.30.10:8585/oss/',
    });
  },

  onShow: function () {

  },
})