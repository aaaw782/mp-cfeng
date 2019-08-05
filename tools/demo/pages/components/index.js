Page({
  onShow() {
    wx.reportAnalytics('enter_home_programmatically', {})
  },
  onShareAppMessage() {
    return {
      title: '插件自定义组件展示',
      path: 'page/component/index'
    }
  },

  data: {
    list: [
      {
        id: 'picker',
        name: '选择器',
        open: false,
        pages: ['areaPicker', 'cfPicker', 'dateTimePicker']
      }, {
        id: 'sideSlideView',
        name: '侧边栏页面',
        open: false,
        pages: ['sideSlideView']
      }, {
        id: 'uploadImage',
        name: '图片上传组件',
        open: false,
        pages: ['uploadImage']
      }, {
        id: 'cfTable',
        name: '表格',
        open: false,
        pages: ['cfTable', 'eTable']
      }, {
        id: 'switchServer',
        name: '切换服务器',
        open: false,
        pages: ['switchServer']
      }
    ]
  },

  kindToggle(e) {
    const id = e.currentTarget.id
    const list = this.data.list
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list
    })
    wx.reportAnalytics('click_view_programmatically', {})
  }
})
