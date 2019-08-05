// component/sideSlideView/sideSlideView.js


Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
    // 侧滑页面宽度
    width: {            // 属性名
      type: Number,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: 480     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    // 是否滑动显示
    isSlideShow: {            
      type: Boolean,     
      value: false     
    },
    // 是否显示在左边，否则显示在右边
    isShowLeft: {
      type: Boolean,
      value: false
    },
    // 是否显示在左边，否则显示在右边
    isShowView: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal, changedPath) {
        this.showMainView(newVal);
      }
    },
    // 是否显示默认按钮
    isShowDefaultBtn: {
      type: Boolean,
      value: false
    },
  },

  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: {
    display: '',   // 遮罩显示样式
    translate: '',   // 主页样式        
    start_clientX: 0,
    end_clientX: 0,
  },

  /**
   * 组件生命周期函数，在组件布局完成后执行，此时可以获取节点信息
   */
  ready: function () { 
    // 获取完整的地区表数据
    
  },

  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    /*
     * 公有方法
     */
    // 遮拦
    hideview: function () {
      this.setData({
        display: "none",
        translate: '',
      })

      // 取消
      this.triggerEvent('doCancel', {}, {});
    },

    // 滑动开始
    touchstart: function (e) {
      if (!this.properties.isSlideShow) {
        return;
      }

      this.data.start_clientX = e.changedTouches[0].clientX
    },

    // 滑动结束
    touchend: function (e) {
      if (!this.properties.isSlideShow) {
        return;
      }

      this.data.end_clientX = e.changedTouches[0].clientX;
      var start = this.data.start_clientX;
      var end = this.data.end_clientX;
      if (!this.properties.isShowLeft) {
        start = this.data.end_clientX;
        end = this.data.start_clientX;
      }

      if (end - start > 120) {
        this.showMainView(true);
      } else if (start - end > 0) {
        this.showMainView(false);
      }
    },

    // 是否显示主页面
    showMainView: function(isShow) {
      var plus = '';
      if (!this.properties.isShowLeft) {
        plus = '-';
      }

      if (isShow) {
        this.setData({
          display: "block",
          translate: 'transform: translateX(' + plus + this.properties.width + 'rpx);'
        })
      } else {
        this.setData({
          display: "none",
          translate: ''
        })
      }
    },

    // 查询
    doSliderSearch: function(e) {
      this.triggerEvent('doSliderSearch', {
        e: e,
      }, {});
    },

    // 重置
    doSliderReset: function (e) {
      this.triggerEvent('doSliderReset', {
        e: e,
      }, {});
    },

  }
})
