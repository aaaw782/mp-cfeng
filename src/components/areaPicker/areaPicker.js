// component/areaPicker/areaPicker.js


var util = require('../../api/util.js');
var typeUtil = require('../../api/typeUtil');
const getAreaUrl = require('../../api/config').config.getAreaUrl;
var requestUtil = require('../../api/requestUtil');
var config = require('../../api/config');

Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
    // 省-市-区
    areaString: {            // 属性名
      type: String,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: ''     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
  },

  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: {
    allAreaArray: null,   // 所有地区数组
    selectedAreaArray: null,  // 选中地区数组
    tmpAreaArray: null,   // 中间数组
    tmpArea: null,   // 中间数组
    defaultArea: null, // 
  },

  /**
   * 组件生命周期函数，在组件布局完成后执行，此时可以获取节点信息
   */
  ready: function () { 
    // 获取完整的地区表数据
    this.areaPicker(this.properties.areaString);
  },

  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    /*
     * 公有方法
     */


    //
    changeArea(e) {
      this.setData({ selectedAreaArray: e.detail.value });

      var lastShow = [];
      lastShow.push(this.data.allAreaArray[0][this.data.selectedAreaArray[0]].NAME);
      lastShow.push(this.data.allAreaArray[1][this.data.selectedAreaArray[1]].NAME);
      lastShow.push(this.data.allAreaArray[2][this.data.selectedAreaArray[2]].NAME);
      this.triggerEvent('bindchange', { value: lastShow }, {});
    },


    changeAreaColumn(e) {
      var arr = this.data.selectedAreaArray;
      var dateArr = this.data.allAreaArray;

      arr[e.detail.column] = e.detail.value;
      var index = e.detail.column;

      if (index == 0) {
        var that = this;
        var provinceCode = dateArr[0][e.detail.value].CODE;
        that.getAreaLevel(1, provinceCode, function (cityCode) {
          that.getAreaLevel(2, cityCode, function (districtCode) {
            that.setData({
              allAreaArray: that.data.tmpAreaArray,
              selectedAreaArray: that.data.tmpArea
            })
          });
        });
      } else if (index == 1) {
        var that = this;
        var cityCode = dateArr[1][e.detail.value].CODE;
        that.getAreaLevel(2, cityCode, function (districtCode) {
          that.setData({
            allAreaArray: that.data.tmpAreaArray,
            selectedAreaArray: that.data.tmpArea
          })
        });
      }  
    },



    // 获取地区数组
    getAreaInfo: function (parentCode, cb) {
      if (typeUtil.stringIsNull(parentCode)) {
        parentCode = 0;
      }

      var that = this;
      var paramData = {
        parentCode: parentCode,
      };

      requestUtil.smallRequestPost(getAreaUrl, paramData, function (res) {
        if (res.data.state == config.statusSuccess) {
          // success
          typeof cb == "function" && cb(res.data.data);
        } else {
          // fail
          util.lastToast(res.data.message, 'forbidden', that);
        }
      });
    },

    // 根据name查询index
    getArrayIndexFromName(array, name) {
      for (var i = 0; i < array.length; i++) {
        var item = array[i];
        if (item.NAME == name) {
          return i;
        }
      }

      return -1;
    },

    // 获取地区级别数据
    getAreaLevel(level, code, cb) {
      var that = this;
      this.getAreaInfo(code, function (areaData) {
        if (!typeUtil.arrayIsNull(areaData)) {
          that.data.tmpAreaArray[level] = areaData;

          var areaIndex = 0
          if (!typeUtil.stringIsNull(that.data.defaultArea[level])) {
            areaIndex = that.getArrayIndexFromName(areaData, that.data.defaultArea[level]);
          }

          if (areaIndex >= 0 && areaIndex < areaData.length) {
            that.data.tmpArea[level] = areaIndex;
            var code = areaData[areaIndex].CODE;

            typeof cb == "function" && cb(code);
          }
        }
      })
    },

    getDefaultArea() {
      var array = [];
      for (var i = 0; i < 3; i++) {
        array.push('');
      }

      return array;
    },


    // 获取地区数组
    areaPicker(showArea='') {
      // 返回默认显示的数组和联动数组的声明
      this.data.tmpArea = [];
      this.data.tmpAreaArray = [[], [], []];
       
      this.data.defaultArea = showArea ? [...showArea.split('-')] : this.getDefaultArea();
      // 处理联动列表数据
      var that = this;
      this.getAreaLevel(0, 0, function(provinceCode) {
        that.getAreaLevel(1, provinceCode, function(cityCode) {
          that.getAreaLevel(2, cityCode, function (districtCode) {
            that.setData({
              allAreaArray: that.data.tmpAreaArray,
              selectedAreaArray: that.data.tmpArea
            })
          });
        });
      });
    },
  }
})
