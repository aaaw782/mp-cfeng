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
    // 模板名称
    templateName: {            // 属性名
      type: String,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: ''     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    // 
    key: {
      type: String,
      value: ''
    },
    // 
    areaId: {
      type: String,
      value: ''
    },
    // 
    area: {
      type: String,
      value: ''
    },
    // 
    placeholder: {
      type: String,
      value: ''
    },
    // 
    selectValue: {
      type: String,
      value: ''
    },
    // 
    name: {
      type: String,
      value: ''
    },
    // 
    dateTime: {
      type: String,
      value: ''
    },
  },

  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: {

  },

  /**
   * 组件生命周期函数，在组件布局完成后执行，此时可以获取节点信息
   */
  ready: function () { 
    
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
    bindChange(e) {
      this.triggerEvent('bindChange', e.detail, {});
    },

    // 
    doTap(e) {
      this.triggerEvent('doTap', e.detail, {});
    },
  }
})
