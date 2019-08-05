// compenents/cftable.js

var typeUtil = require('../../api/typeUtil.js');


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: {
      type : Array,
      value: [],
      observer: function (newVal, oldVal) {
        this.configLength();
      }
    },
    // 左侧冻结的属性
    propsLeft: {
      type: String,
      value: ''
    },
    // 右侧内部的属性
    propsRight: {
      type: String,
      value: ''
    },
    // 表格值的属性
    propsRow: {
      type: String,
      value: ''
    },
    // 状态属性值
    propsStatus: {
      type: String,
      value: ''
    },
    // 状态属性颜色列表
    propsStatusColor: {
      type: Array,
      value: []
    },
    // 包含状态属性值列表
    propsStatusContain: {
      type: Array,
      value: []
    },
    // 不包含状态属性值列表
    propsStatusNoContain: {
      type: Array,
      value: []
    },
    // 显示表格的宽度，单位：px
    rowWidth: {
      type: Number,
      value: 80
    },
    // 显示表格的高度，单位：px
    rowHeight: {
      type: Number,
      value: 40
    },
    // 右侧一行最多能显示多少个
    maxPropsLength: {
      type: Number,
      value: 10
    },
    // 是否显示边框
    border: {
      type: Boolean,
      value: true
    },
    // 是否隔行显示不同
    stripe: {
      type: Boolean,
      value: false
    },
    // 是否具备点击选择功能
    isSelected: {
      type: Boolean,
      value: false
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    oriData: [],  // 原始数据
    dataLength: [],  // 二维数组的长度
    propArray: [],       //
    selectedArray: [],   // 点击选择数据
  },

  /**
   * 组件生命周期函数，在组件布局完成后执行，此时可以获取节点信息
   */
  ready: function () {
    this.data.selectedArray = [];
  },


  /**
   * 组件的方法列表
   */
  methods: {

    configLength: function () {
      if (typeUtil.arrayIsNull(this.properties.content)) {
        return;
      }

      let length = this.properties.maxPropsLength;
      let dataLength = [];
      let maxLength = 0;
      let allMaxLength = 0;
      for(let item of this.properties.content) {
        let array = item[this.properties.propsRight];

        maxLength = maxLength < array.length ? array.length : maxLength;

        allMaxLength = maxLength > allMaxLength ? maxLength : allMaxLength;

        let count = Math.ceil(array.length / length);
        let tmpArray = new Array(count).fill(0);
        dataLength.push(tmpArray);

        if (this.properties.isSelected) {
          for (let innerItem of array) {
            innerItem.isSelected = false;
          }

          item.isSelected = false;
        }
      }

      if (allMaxLength > this.properties.maxPropsLength) {
        allMaxLength = this.properties.maxPropsLength;
      }

      let props = new Array(allMaxLength).fill(0);

      this.setData({
        dataLength: dataLength,
        propArray: props,
        oriData: this.properties.content,
      })
    },

    // 点击左侧
    onTapLeft(e) {
      if (!this.properties.isSelected) {
        return;
      }


      let outIndex = e.currentTarget.dataset.index;

      let item = this.data.oriData[outIndex];
      item.isSelected = !item.isSelected;

      for (let innerItem of this.data.oriData[outIndex][this.properties.propsRight]) {
        innerItem.isSelected = item.isSelected;

        if (item.isSelected) {
          this.data.selectedArray.push(innerItem);
        } else {
          typeUtil.arrayRemoveItem(this.data.selectedArray, innerItem);
        }
      }

      this.setData({
        oriData: this.data.oriData,
      });

      this.triggerEvent('tap', { selectedItems: this.data.selectedArray }, {});
    },

    onTap(e) {
      if (this.properties.isSelected) {
        let outIndex = e.currentTarget.dataset.outindex;
        let innerIndex = e.currentTarget.dataset.innerindex;
        let item = this.data.oriData[outIndex][this.properties.propsRight][innerIndex];
        item.isSelected = !item.isSelected;

        if (item.isSelected) {
          this.data.selectedArray.push(item);
        } else {
          typeUtil.arrayRemoveItem(this.data.selectedArray, item);
        }

        this.setData({
          oriData: this.data.oriData,
        });


        this.triggerEvent('tap', { selectedItems: this.data.selectedArray }, {});
      } else {
        let item = e.currentTarget.dataset.item;
        this.triggerEvent('tap', { item: item }, {});
      }
    }
  },
})
