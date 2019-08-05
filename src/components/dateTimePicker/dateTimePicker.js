// component/uploadImage/uploadImage.js


var util = require('../../api/util.js');
var typeUtil = require('../../api/typeUtil');


Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
    // 显示的数据
    showDateTime: {            // 属性名
      type: String,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: ''     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
  },

  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: {
    date: '2018-10-01',
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    startYear: 2000,
    endYear: 2050,
  },

  /**
   * 组件生命周期函数，在组件布局完成后执行，此时可以获取节点信息
   */
  ready: function () { 
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = this.dateTimePicker(this.data.startYear, this.data.endYear);

    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj.dateTimeArray.pop();
    var lastTime = obj.dateTime.pop();

    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
    });
  },

  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    /*
     * 公有方法
     */

    // 获取子字符串
    getSubString(str, lastLength) {
      return str.substr(0, str.length-lastLength);
    },

    //
    changeDateTime(e) {
      this.setData({ dateTime: e.detail.value });

      var realDateTime = e.detail.value;
      var lastShow = this.getSubString(this.data.dateTimeArray[0][realDateTime[0]], 1) + '-' + this.getSubString(this.data.dateTimeArray[1][realDateTime[1]], 1) + '-' + this.getSubString(this.data.dateTimeArray[2][realDateTime[2]], 1) + ' ' + this.getSubString(this.data.dateTimeArray[3][realDateTime[3]], 1) + ':' + this.getSubString(this.data.dateTimeArray[4][realDateTime[4]], 1);


      this.triggerEvent('bindchange', { dateTime: lastShow }, {});
    },


    changeDateTimeColumn(e) {
      var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;

      arr[e.detail.column] = e.detail.value;
      dateArr[2] = this.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

      this.setData({
        dateTimeArray: dateArr,
        dateTime: arr
      });
    },

    // 规范化显示
    withData(param){
      return param < 10 ? '0' + param : '' + param;
    },

    //  获取 start - end 的数组
    getLoopArray(start, end, suffix='') {
      var start = start || 0;
      var end = end || 1;
      var array = [];
      for (var i = start; i <= end; i++) {
        array.push(this.withData(i) + suffix);
      }
      return array;
    },

    // 获取月份数组
    getMonthDay(year, month) {
      if (typeUtil.stringIsNull(year) || typeUtil.stringIsNull(month)) {
        return null;
      }

      year = year.substr(0, year.length - 1);
      month = month.substr(0, month.length - 1);

      var flag = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0), array = null;

      switch (month) {
        case '01':
        case '03':
        case '05':
        case '07':
        case '08':
        case '10':
        case '12':
          array = this.getLoopArray(1, 31, '日')
          break;
        case '04':
        case '06':
        case '09':
        case '11':
          array = this.getLoopArray(1, 30, '日')
          break;
        case '02':
          array = flag ? this.getLoopArray(1, 29, '日') : this.getLoopArray(1, 28, '日')
          break;
        default:
          array = '月份格式不正确，请重新输入！'
      }
      return array;
    },

    getNewDateArry() {
      // 当前时间的处理
      var newDate = new Date();
      var year = this.withData(newDate.getFullYear()) + '年',
        mont = this.withData(newDate.getMonth() + 1) + '月',
        date = this.withData(newDate.getDate()) + '日',
        hour = this.withData(newDate.getHours()) + '时',
        minu = this.withData(newDate.getMinutes()) + '分',
        seco = this.withData(newDate.getSeconds()) + '秒';

      return [year, mont, date, hour, minu, seco];
    },

    // 获取日期和时间数据 
    dateTimePicker(startYear, endYear, date) {
      // 返回默认显示的数组和联动数组的声明
      var dateTime = [], dateTimeArray = [[], [], [], [], [], []];
      var start = startYear || 1978;
      var end = endYear || 2100;
      // 默认开始显示数据
      var defaultDate = date ? [...date.split(' ')[0].split('-'), ...date.split(' ')[1].split(':')] : this.getNewDateArry();
      // 处理联动列表数据
      /*年月日 时分秒*/
      dateTimeArray[0] = this.getLoopArray(start, end, '年');
      dateTimeArray[1] = this.getLoopArray(1, 12, '月');
      dateTimeArray[2] = this.getMonthDay(defaultDate[0], defaultDate[1], '日');
      dateTimeArray[3] = this.getLoopArray(0, 23, '时');
      dateTimeArray[4] = this.getLoopArray(0, 59, '分');
      dateTimeArray[5] = this.getLoopArray(0, 59, '秒');

      dateTimeArray.forEach((current, index) => {
        dateTime.push(current.indexOf(defaultDate[index]));
      });

      return {
        dateTimeArray: dateTimeArray,
        dateTime: dateTime
      }
    },
  }
})
