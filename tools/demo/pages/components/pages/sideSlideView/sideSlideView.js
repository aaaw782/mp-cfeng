var typeUtil = require('../../../../components/api.js').typeUtil;


Page({

  /**
   * 页面的初始数据
   */
  data: {

    projectName: '',  // 地址
    projectIndex: -1,
    projectId: '',
    projectList: [{
      key: '天河区碧桂园房子装修',
      value: 'BGY0000000',
    }, {
      key: '碧桂园房子装修项目',
      value: 'BGY0000001',
    }, {
      key: '锦绣香江房子装修项目',
      value: 'BGY0000002',
    }, {
      key: '白云区碧桂园房子装修项目',
      value: 'BGY0000003',
    }],


    isShowCFPickerProject: false,
    isShowSlideView: false,
  },


  // 主页面的筛选
  doMainSearch: function () {
    this.showSliderView(true);
  },

  showSliderView: function (isShow) {
    this.setData({
      isShowSlideView: isShow,
    })
  },




  bindProjectTap: function (e) {
    this.setData({
      isShowCFPickerProject: true,
    })
  },

  bindProjectChange: function (e) {
    if (typeUtil.arrayIsNull(e.detail.choosedIndexArr)) {
      return;
    }

    let index = e.detail.choosedIndexArr[0];

    if (index != '-1') {
      var projectName = this.data.projectList[index].key;
      var projectValue = this.data.projectList[index].value;

      this.setData({
        projectIndex: index,
        projectName: projectName,
        projectId: projectValue,
      });
    }

    this.setData({
      isShowCFPickerProject: false,
    })

  },
  // 侧边栏搜索
  doSliderSearch: function () {
    this.showSliderView(false);
  },

  // 重置
  doSliderReset: function () {
    this.setData({
      projectName: '',  // 地址
      projectIndex: -1,
      projectId: '',
    })
  },

  doSliderCancel: function() {
    this.showSliderView(false);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

})
