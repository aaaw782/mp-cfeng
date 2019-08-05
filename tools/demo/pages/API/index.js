Page({
  onShareAppMessage() {
    return {
      title: '插件接口能力展示',
      path: 'pages/API/index'
    }
  },

  data: {
    list: [
      {
        id: 'configParams',
        name: '参数配置',
        url: 'login/login'
      }, {
        id: 'typeUtil',
        name: 'typeUtil',
        open: false,
        pages: [
          {
            zh: 'objectIsNull',
            url: 'login/login'
          }, {
            zh: 'stringIsNull',
            url: 'get-user-info/get-user-info'
          }, {
            zh: 'safeGetString',
            url: 'request-payment/request-payment'
          }, {
            zh: 'arrayIsNull',
            url: 'share/share'
          }, {
            zh: 'arrayRemoveIndex',
            url: 'share-button/share-button'
          }, {
            zh: 'arrayInsertIndex',
            url: 'custom-message/custom-message'
          }, {
            zh: 'arrayContains',
            url: 'template-message/template-message'
          }
        ]
      }, {
        id: 'dateUtil',
        name: 'dateUtil',
        open: false,
        pages: [
          {
            zh: 'getDateMinuteShow',
            url: 'set-navigation-bar-title/set-navigation-bar-title'
          }, {
            zh: 'getDateShow',
            url: 'navigation-bar-loading/navigation-bar-loading'
          }, {
            zh: 'formatTime',
            url: '@set-tab-bar'
          }, {
            zh: 'formatNumber',
            url: 'navigator/navigator'
          }, {
            zh: 'formatChMonthString',
            url: 'pull-down-refresh/pull-down-refresh'
          }, {
            zh: 'formatMonthString',
            url: 'animation/animation'
          }, {
            zh: 'formatMonthDate',
            url: 'canvas/canvas'
          }, {
            zh: 'formatDayDate',
            url: 'action-sheet/action-sheet'
          }, {
            zh: 'formatDiffMonthDate',
            url: 'modal/modal'
          }, {
            zh: 'formatDiffDayDate',
            url: 'page-scroll/page-scroll'
          }, {
            zh: 'stampToDate',
            url: 'toast/toast'
          }, {
            zh: 'DateDiff',
            url: 'get-wxml-node-info/get-wxml-node-info'
          }, {
            zh: 'countDateInterval',
            url: 'intersection-observer/intersection-observer'
          }, {
            zh: 'formatAllTime',
            url: 'intersection-observer/intersection-observer'
          }
        ]
      }, {
        id: 'codeExeTimer',
        name: 'codeExeTimer',
        open: false,
        pages: [
          {
            zh: 'Timer',
            url: 'get-network-type/get-network-type'
          }
        ]
      }, {
        id: 'mapUtil',
        name: 'mapUtil',
        open: false,
        pages: [
          {
            zh: 'doGetLocationInfo',
            url: 'request/request'
          }
        ]
      }, {
        id: 'requestUtil',
        name: 'requestUtil',
        open: false,
        pages: [
          {
            zh: 'smallRequestPost',
            url: 'image/image'
          }, {
            zh: 'middleRequestPost',
            url: 'voice/voice'
          }, {
            zh: 'requestPost',
            url: 'background-audio/background-audio'
          }, {
            zh: 'pollingRefreshToken',
            url: 'file/file'
          }, {
            zh: 'deleteFile',
            url: 'video/video'
          }, {
            zh: 'getUrl',
            url: 'load-font-face/load-font-face'
          }, {
            zh: 'doUploadImage',
            url: 'load-font-face/load-font-face'
          }
        ]
      }, {
        id: 'data',
        name: 'data',
        open: false,
        pages: [
          {
            zh: 'globalData',
            url: 'get-location/get-location'
          }
        ]
      }, {
        id: 'util',
        name: 'util',
        open: false,
        pages: [
          {
            zh: 'lastToast',
            url: 'get-location/get-location'
          }, {
            zh: 'toast',
            url: 'open-location/open-location'
          }, {
            zh: 'toastNoDuration',
            url: 'choose-location/choose-location'
          }, {
            zh: 'bankCard',
            url: 'choose-location/choose-location'
          }, {
            zh: 'lastBankCardNum',
            url: 'choose-location/choose-location'
          }, {
            zh: 'toThousands',
            url: 'choose-location/choose-location'
          }, {
            zh: 'backToSubView',
            url: 'choose-location/choose-location'
          }, {
            zh: 'createKeyValue',
            url: 'choose-location/choose-location'
          }, {
            zh: 'isOriginFormalEnv',
            url: 'choose-location/choose-location'
          }, {
            zh: 'showImageWithUrl',
            url: 'choose-location/choose-location'
          }, {
            zh: 'showImageWithId',
            url: 'choose-location/choose-location'
          }, {
            zh: 'showImageWithIds',
            url: 'choose-location/choose-location'
          }, {
            zh: 'showImage',
            url: 'choose-location/choose-location'
          }, {
            zh: 'createPreviewUrl',
            url: 'choose-location/choose-location'
          }, {
            zh: 'createPreviewOriUrl',
            url: 'choose-location/choose-location'
          }, {
            zh: 'getAddress',
            url: 'choose-location/choose-location'
          }, {
            zh: 'isLocationValidTime',
            url: 'choose-location/choose-location'
          }, {
            zh: 'imgUrlIsLocal',
            url: 'choose-location/choose-location'
          }, {
            zh: 'showFailRequest',
            url: 'choose-location/choose-location'
          }, {
            zh: 'getUserOpenId',
            url: 'choose-location/choose-location'
          }, {
            zh: 'getServer',
            url: 'choose-location/choose-location'
          }
        ]
      }, {
        id: 'config',
        name: 'config',
        open: false,
        pages: [
          {
            zh: 'config',
            url: 'image/image'
          }, {
            zh: 'locationInfoValidTime',
            url: 'voice/voice'
          }, {
            zh: 'showCount',
            url: 'background-audio/background-audio'
          }, {
            zh: 'statusSuccess',
            url: 'file/file'
          }, {
            zh: 'host',
            url: 'video/video'
          }, {
            zh: 'host_file',
            url: 'load-font-face/load-font-face'
          }, {
            zh: 'appId',
            url: 'load-font-face/load-font-face'
          }, {
            zh: 'appSecret',
            url: 'load-font-face/load-font-face'
          }
        ]
      }, {
        id: 'MD5',
        name: 'MD5',
        url: 'worker/worker'
      }, {
        id: 'QQMapWX',
        name: 'QQMapWX',
        url: 'worker/worker'
      }
    ],
    isSetTabBarPage: false,
  },
  onShow() {
    this.leaveSetTabBarPage()
  },
  onHide() {
    this.leaveSetTabBarPage()
  },
  kindToggle(e) {
    const id = e.currentTarget.id; const
      list = this.data.list
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        if (list[i].url) {
          wx.navigateTo({
            url: 'pages/' + list[i].url
          })
          return
        }
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list
    })
  },
  enterSetTabBarPage() {
    this.setData({
      isSetTabBarPage: true
    })
  },
  leaveSetTabBarPage() {
    this.setData({
      isSetTabBarPage: false
    })
  },
})
