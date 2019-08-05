// compenents/cftable.js


var config = require('../../api/config.js');
var typeUtil = require('../../api/typeUtil.js');
var util = require('../../api/util.js');


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShowP: {
      type : Boolean,
      value: false,
      observer: function (newVal, oldVal) {
        this.setData({
          isShow: newVal,
        })
      }
    },
    // page的路径
    pagePath: {
      type: String,
      value: '',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,  // 
    serverUrl: '',  // 服务器地址
  },

  /**
   * 组件生命周期函数，在组件布局完成后执行，此时可以获取节点信息
   */
  ready: function () {
    // this.getServerUrl();
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { 
      this.getServerUrl();
    },
  },


  /**
   * 组件的方法列表
   */
  methods: {

    // 切换服务器
    doSwitchServerAddress: function () {
      wx.navigateTo({
        url: this.properties.pagePath + '/ServerAddress/ServerAddress',
      })
    },

    // 获取服务器地址
    getServerUrl: function() {
      var serverUrl = wx.getStorageSync('serverUrl');
      var fileUrl = wx.getStorageSync('fileUrl');

      if (!typeUtil.stringIsNull(serverUrl)) {
        config.host = serverUrl
        console.log("host is " + config.host);

        if (!typeUtil.stringIsNull(fileUrl)) {
          config.host_file = fileUrl;
        }

        // 是否是正式地址
        if (util.isOriginFormalEnv(serverUrl)) {
          this.setData({
            isShow: false,
          })
        } else {
          this.setData({
            isShow: true,
          })
        }
      } else {
        serverUrl = config.host;
        if (util.isOriginFormalEnv(serverUrl)) {
          this.setData({
            isShow: false,
          })
        } else {
          this.setData({
            isShow: true,
          })
        }
      }

      this.setData({
        serverUrl: serverUrl,
      })
    },
  },
})
