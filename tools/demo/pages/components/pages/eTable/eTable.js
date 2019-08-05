


Page({
  data: {
    config: {
      content: [],
      titles: ['id', '名字', '年龄', '学校'],
      props: ['id', 'name', 'age', 'school'],
      columnWidths: ['80rpx', '140rpx', '120rpx', '390rpx'],
      border: true,
      stripe: true,
      // headbgcolor : '#dddddd'
    }
  },




  onShow: function () {

  },

  onLoad: function (options) {
    let content = [
      {
        id: 1,
        name: 'pxh',
        age: 13,
        school: '暨南大学计算机'
      },
      {
        id: 2,
        name: 'ap',
        age: 12,
        school: '中山大学'
      },
      {
        id: 3,
        name: 'cf',
        age: 12,
        school: '华南农业大学'
      },
      {
        id: 4,
        name: '林江',
        age: 14,
        school: '上海交通大学'
      }
    ]
    let that = this
    // 此处模拟网络请求
    setTimeout(function () {
      that.setData({
        'config.content': content
      })
    }, 1000)
  },


  // 点击单元格
  doSelectRecord: function (e) {
    var item = e.detail.item;
  },


})
