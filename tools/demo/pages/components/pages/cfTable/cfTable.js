

var dataUtil = require('../../../../components/api.js').dataUtil;

Page({
  data: {
    recordList: [],  // 数据
  },




  onShow: function () {

  },

  onLoad: function (options) {
    let recordList = [
      {
        floorNum: 18,
        unitHouseList: [
          {
            houseNum: "VIP1806",
            workbillStatus: 1,
          }, {
            houseNum: "VIP1805",
            workbillStatus: 1,
          }, {
            houseNum: "VIP1804",
            workbillStatus: 1,
          }, {
            houseNum: "VIP1803",
            workbillStatus: 0,
          }, {
            houseNum: "VIP1802",
            workbillStatus: 0,
          }, {
            houseNum: "VIP1801",
            workbillStatus: 0,
          },
        ],
      }, {
        floorNum: 17,
        unitHouseList: [
          {
            houseNum: "VIP1706",
            workbillStatus: 0,
          }, {
            houseNum: "VIP1705",
            workbillStatus: 0,
          }, {
            houseNum: "VIP1704",
            workbillStatus: 0,
          }, {
            houseNum: "VIP1703",
            workbillStatus: 0,
          }, {
            houseNum: "VIP1702",
            workbillStatus: 0,
          }, {
            houseNum: "VIP1701",
            workbillStatus: 0,
          },
        ],
      }, {
        floorNum: 16,
        unitHouseList: [
          {
            houseNum: "VIP1606",
            workbillStatus: 0,
          }, {
            houseNum: "VIP1605",
            workbillStatus: 0,
          }, {
            houseNum: "VIP1604",
            workbillStatus: 0,
          }, {
            houseNum: "VIP1603",
            workbillStatus: 0,
          }, {
            houseNum: "VIP1602",
            workbillStatus: 0,
          }, {
            houseNum: "VIP1601",
            workbillStatus: 0,
          },
        ],
      },
    ];

    this.setData({
      recordList: recordList,
    })
  },


  // 点击单元格
  doSelectRecord: function (e) {
    var item = e.detail.item;
  },


})
