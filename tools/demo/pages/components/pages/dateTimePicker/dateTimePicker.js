


Page({

  /**
   * 页面的初始数据
   */
  data: {
    shipTimeStart: '',
  },


  shipTimeStart: function (e) {
    this.setData({
      shipTimeStart: e.detail.dateTime,
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

  },

  onHide: function () {

  },

})