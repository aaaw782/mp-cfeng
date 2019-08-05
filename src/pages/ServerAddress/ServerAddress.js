var util = require('../../api/util.js');
var typeUtil = require('../../api/typeUtil');
var config = require('../../api/config');
const host = require('../../api/config').host;
const duration = 2000;

var app = getApp();

var normalServerAddress = [
  "http://192.168.30.10:8585/pms-api/",
  "https://pmspreapi.cfeng56.com.cn/pms-api/",
  "https://pmsapi.cfeng56.com.cn/pms-api",
];

var normalFileAddress = [
  "http://192.168.30.10:8585/oss/",
  "https://pmspreapi.cfeng56.com.cn/oss/",
  "https://pmsapi.cfeng56.com.cn/boss",
];

Page({
  data: {
    serverAddress: [],
    fileAddress: [],
    recordLength: 2,
    serverUrl: '',
    input_server_url: '',
    fileUrl: ''
  },

  input_server_url: function (e) {
    this.data.input_server_url = e.detail.value
  },

  // 添加服务器地址
  doAdd: function (e) {
    var array = wx.getStorageSync('serverAddress')
    var serverUrl = this.data.input_server_url;
    var hostItem = this.data.fileUrl;

    if (typeUtil.stringIsNull(hostItem)) {
      hostItem = config.host_file;
    }

    if (typeUtil.stringIsNull(this.data.input_server_url)) {
      util.lastToast('请输入新的服务器地址或者选择列表中的地址!', 'info', this);
      return false;
    } else if (array.indexOf(this.data.input_server_url) == -1) {
      // util.lastToast('该服务器地址已经存在选择列表中!', 'info', this);
      // return false;
      array.push(serverUrl);
      // fileAddress.push(hostItem);
    }

    this.setData({
      serverAddress: array,
      serverUrl: serverUrl
    })
    try {
      wx.setStorageSync('serverAddress', array);
      // 把输入的url设置服务器地址
      wx.setStorageSync('serverUrl', serverUrl);
      wx.setStorageSync('fileUrl', hostItem);
    } catch (e) {
      console.log("同步服务器地址失败：" + e);
    }
    // 关闭当前页面回到登录页面
    wx.navigateBack({
      delta: 1
    });
  },

  // 选择详情
  doSelectServerUrl: function (e) {
    var index = e.currentTarget.dataset.index;
    var array = this.data.serverAddress;
    if (index < 0 || index >= array.length) {
      return;
    }
    var item = array[index];
    var hostItem = this.data.fileAddress[index];
    // try {
    //   wx.setStorageSync('serverUrl', item);
    //   wx.setStorageSync('fileUrl', hostItem);
    // } catch (e) {
    //   console.log("同步服务器地址失败：" + e);
    // }
    this.setData({
      serverUrl: item,
      input_server_url: item,
      fileUrl: hostItem
    })
  },

  onLoad: function () {
    this.data.serverAddress = normalServerAddress;
    this.data.fileAddress = normalFileAddress;

    var that = this
    var serverAddress = wx.getStorageSync('serverAddress')
    if (serverAddress == "") {
      wx.setStorageSync('serverAddress', that.data.serverAddress);
      serverAddress = that.data.serverAddress;
    }

    that.setData({
      serverAddress: serverAddress
    })

    var serverUrl = wx.getStorageSync('serverUrl')
    that.setData({
      serverAddress: serverAddress
    })
    config.host = serverUrl
  }


})
