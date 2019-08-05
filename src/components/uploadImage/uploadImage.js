// component/uploadImage/uploadImage.js


var util = require('../../api/util.js');
var typeUtil = require('../../api/typeUtil');
var dateUtil = require('../../api/dateUtil');
var config = require('../../api/config');
var requestUtil = require('../../api/requestUtil');
var codeExeTimer = require('../../api/codeExeTimer').Timer;

var QQMapWX = require('../../libs/qqmap/qqmap-wx-jssdk.js');
// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: '2EUBZ-6WAWD-TCN43-HWF4X-FHFVJ-PBBMX'
});


const maxCanvasWidth = 720;
const maxCanvasHeight = 1080;

// const maxCanvasWidth = 240;
// const maxCanvasHeight = 320;



Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
    // 序号
    index: {            // 属性名
      type: Number,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: 0     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    // 图片url
    locationUrl: {
      type: String,
      value: '../../resources/location.png'
    },
    // 图片业务类型
    businessType: {
      type: String,
      value: '0401'
    },
    // 显示图片url
    showImgUrl: {
      type: String,
      value: '',
      //不能在observer函数中去改变值,容易出现无限加载死循环!
      observer: function (newVal, oldVal, changedPath) {
        if (!typeUtil.stringIsNull(newVal)) {
          if (util.imgUrlIsLocal(newVal)) {
            this.setData({
              imgUrl: newVal,
            })
          } else {
            this.setData({
              imgUrl: util.createPreviewUrl(newVal),
              fileLoadId: newVal,
              isShowHint: false,
              isShowDelete: true && !this.properties.isOnlyShow,
            })
          }
        }
      }
    },
    // 画布Id
    canvasId: {
      type: String,
      value: 'waterMark'
    },
    // 图片宽度
    imageWidth: {
      type: Number,
      value: 120
    },
    // 图片高度
    imageHeight: {
      type: Number,
      value: 120
    },
    // 是否只是显示图片
    isOnlyShow: {
      type: Boolean,
      value: false
    },
    // 是否点击显示大图
    isShowLarge: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: {
    // 弹窗显示控制
    isShow: true,
    defaultImgUrl: '../../resources/pp.svg',
    canvasWidth: 0,
    canvasHeight: 0,
    imgUrl: '../../resources/pp.svg',
    saveFileUrl: '',
    fileLoadId: '',
    isShowHint: false,  // 是否显示上传提示
    isShowLocal: false, // 显示的图片是否是本地的
    isShowDelete: false, // 是否显示删除按钮

    city: '',     // 获取定位的城市
    address: '',  // 获取定位的详细地址
  },

  /**
   * 组件生命周期函数，在组件布局完成后执行，此时可以获取节点信息
   */
  ready: function () {

    if (typeUtil.stringIsNull(this.properties.businessType)) {
      this.properties.businessType = "0401";
    }

    if (!typeUtil.stringIsNull(this.properties.showImgUrl)) {
      if (util.imgUrlIsLocal(this.properties.showImgUrl)) {
        this.setData({
          isShowLocal: true,
          imgUrl: this.properties.showImgUrl,
        })
      } else {
        this.setData({
          isShowLocal: false,
          imgUrl: util.createPreviewUrl(this.properties.showImgUrl),
          fileLoadId: this.properties.showImgUrl
        })
      }
    }
  },

  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    /*
     * 公有方法
     */

    // 获取定位信息
    getLocationInfo() {
      var locationInfo = "";

      try {
        locationInfo = wx.getStorageSync('locationInfo');
      } catch (e) {
        console.log("get locationInfo error: " + e);
      }

      var flag = true;
      if (locationInfo != null && locationInfo != '') {
        var preTime = locationInfo.time;
        if (util.isLocationValidTime(preTime)) {
          flag = false;

          this.setData({
            city: locationInfo.city,
            address: locationInfo.address,
          });
        }
      }

      if (flag) {
        this.doGetLocationInfo();
      }
    },

    // 获取位置信息操作
    doGetLocationInfo() {
      // 获取定位位置信息
      var that = this;
      this.getWaterMarkText(function (city, address, time) {
        that.setData({
          city: city,
          address: address,
        });

        var time = new Date();
        var locationInfo = {
          city: city,
          address: address,
          time: time,
        };

        try {
          wx.setStorageSync('locationInfo', locationInfo);
        } catch (e) {
          console.log("save locationInfo error: " + e);
        }
      });
    },

    // 是否显示组件
    showComponent(isShow) {
      this.setData({
        isShow: isShow
      })
    },

    // 显示默认图片
    showDefaultImage() {
      this.setData({
        imgUrl: this.data.defaultImgUrl,
        fileLoadId: '',
        isShowDelete: false,
        isShowHint: false,
      })
    },

    // 是否获取当前地址
    isGetAddress() {
      if (typeUtil.stringIsNull(this.data.city) || typeUtil.stringIsNull(this.data.address)) {
        return false;
      }

      return true;
    },

    // 获取水印文字
    getWaterMarkText(cb) {
      var that = this;

      if (this.isGetAddress()) {
        // 获取当前位置信息
        // this.getLocationInfo();
        var time = dateUtil.formatTime(new Date());

        typeof cb == "function" && cb(this.data.city, this.data.address, time);
        return;
      }

      codeExeTimer.start("getLocation");

      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          var latitude = res.latitude
          var longitude = res.longitude

          // 调用接口
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: latitude,
              longitude: longitude
            },
            coord_type: 1, // gps坐标
            success: function (res) {
              console.log(res);

              var city = res.result.ad_info.city;
              var address = res.result.address_component.district + res.result.address_component.street_number;
              var time = dateUtil.formatTime(new Date());

              that.setData({
                city: city,
                address: address,
              })


              codeExeTimer.stop("getLocation");

              typeof cb == "function" && cb(city, address, time);
            },
            fail: function (res) {
              console.log(res);
              // wx.hideLoading();

              that.setData({
                isShowHint: false,
              });
            },
            complete: function (res) {
              console.log(res);
            }
          });
        },
        fail: function (res) {
          // util.lastToast('获取经纬度失败！无法上传图片！', 'forbidden', that);
          console.log(res);
          // wx.hideLoading();

          var time = dateUtil.formatTime(new Date());
          typeof cb == "function" && cb("", "", time);
        },
        complete: function (res) {
          console.log(res);
        }
      })
    },

    // 增加水印
    addWaterMark(url, fileSize, index) {
      var that = this;

      // url = "http://tmp/wxaa363a58d18ffe94.o6zAJs6Mlq1vdkuh_10IQ2W8bcJE.43a8ed85efc254bad544db91a948707d.jpg";

      this.getWaterMarkText(function (city, address, time) {
        // 使用 wx.createContext 获取绘图上下文 context

        that.uploadImageOp(url, fileSize, index, city, address);

        // return;
        // that.doDrawWater(url, fileSize, index, city, address, time);
      });
    },



    // 上传图片操作
    uploadImageOp: function (url, fileSize, index, city, address) {
      var that = this;


      codeExeTimer.start("doUploadImage");

      requestUtil.doUploadImage(url, this.properties.businessType, fileSize, city, address, function (data) { // success
        var resultData = JSON.parse(data);
        if (resultData.status == 200) {
          var fileId = resultData.body.fileId;

          that.setData({
            // imgUrl: util.createPreviewUrl(fileId),
            fileLoadId: fileId,
          });

          that.triggerEvent('uploadFileSuccess', {
            imgUrl: that.data.imgUrl,
            index: index,
            fileId: fileId
          }, {});


          codeExeTimer.stop("doUploadImage");


          codeExeTimer.stop("total uploadImage");

        } else {
          var message = resultData.message;
          util.lastToast(message, 'forbidden', that);
        }

        // wx.hideLoading();

        that.setData({
          isShowHint: false,
          isShowDelete: true,
        });
      }, function (res) {  // failed
        var message = "上传图片失败！";
        util.toast(message, true);

        that.setData({
          isShowHint: false,
          isShowDelete: false,
          imgUrl: that.data.defaultImgUrl,
        });
      })
    },

    // 上传照片
    doUploadImg: function () {
      var that = this;
      var index = this.properties.index;

      wx.chooseImage({
        count: 1, // 最多可以选择的图片张数，默认9
        sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function (res) {
          // success
          var tempFilePath = res.tempFilePaths[0];
          var fileSize = res.tempFiles[0].size;

          that.setData({
            imgUrl: tempFilePath,
          });


          that.triggerEvent('changeImage', { index: index }, {});

          wx.getImageInfo({
            src: tempFilePath,
            success: function (res) {
              console.log(res.width);
              console.log(res.height);

              // that.configCanvasSize(res);

              // wx.showLoading({
              //   title: '正在上传图片...',
              // });

              that.setData({
                isShowHint: true,
              });

              codeExeTimer.start("total uploadImage");

              // 增加水印并上传图片操作
              that.addWaterMark(tempFilePath, fileSize, index);
            }
          })

          // codeExeTimer.start("save");

          // wx.saveFile({
          //   tempFilePath: res.tempFilePaths[0],
          //   success: function (res) {
          //     var savedFilePath = res.savedFilePath;

          //     that.setData({
          //       saveFileUrl: savedFilePath,
          //       imgUrl: savedFilePath,
          //     });

          //     console.log("save file is: " + savedFilePath);

          //     codeExeTimer.stop("save");

          //     that.triggerEvent('changeImage', { index: index }, {});

          //     wx.getImageInfo({
          //       src: savedFilePath,
          //       success: function (res) {
          //         console.log(res.width);
          //         console.log(res.height);

          //         // that.configCanvasSize(res);

          //         // wx.showLoading({
          //         //   title: '正在上传图片...',
          //         // });

          //         that.setData({
          //           isShowHint: true,
          //         });

          //         codeExeTimer.start("total uploadImage");

          //         // 增加水印并上传图片操作
          //         that.addWaterMark(savedFilePath, fileSize, index);
          //       }
          //     })

          //   }
          // })



        },
      });
    },




    // 点击图片
    doImage: function (e) {
      if (this.properties.isOnlyShow) {
        // if (this.data.imgUrl != this.data.defaultImgUrl) {
        //   if (this.data.isShowLocal) {
        //     util.showImageWithUrl(this.data.imgUrl);
        //   } else {
        //     util.showImageWithUrl(util.createPreviewOriUrl(this.data.fileLoadId));
        //   }
        // }
        
        if (this.properties.isShowLarge) {
          util.showImageWithUrl(util.createPreviewUrl(this.data.fileLoadId));
        }

        return;
      }

      // 上传图片
      if (this.data.imgUrl == this.data.defaultImgUrl) {
        this.doUploadImg();
      } else {

        util.showImageWithUrl(this.data.imgUrl);

        // wx.navigateTo({
        //   url: '/pages/common/previewImage/previewImage?fileID=' + this.data.fileLoadId + "&imgIndex=" + e.target.dataset.index + "&imgUrl=" + this.data.imgUrl,
        // })
      }
    },

    // 图片加载失败
    doPhotoErr: function (e) {
      var index = e.target.dataset.index;
      this.data.imgUrl = this.properties.defaultImgUrl;
      console.log('doPhotoErr photo is ', this.data.imgUrl);
    },

    // 删除图片
    doDeleteImage(e) {
      var that = this;
      wx.showModal({
        content: '是否删除',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')

            requestUtil.deleteFile(that.data.fileLoadId, function (res) {
              util.lastToast(res.message, 'forbidden', that);
              that.showDefaultImage();
              that.triggerEvent('deleteImage', {
                index: that.properties.index,
              }, {});
            }, function (res) {
              util.lastToast(res.data.message, 'forbidden', that);
            });
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },

    // 绘制水印
    doDrawWater(url, fileSize, index, city, address, time) {
      var that = this;

      codeExeTimer.start("drawWater");

      var canvasId = that.properties.canvasId;
      var context = wx.createCanvasContext(canvasId);
      context.drawImage(url, 0, 0, that.data.canvasWidth, that.data.canvasHeight);

      var mode = 0;  // 水印模式 0 有经纬度 1： 没有经纬度
      if (city == '' && address == '') {
        mode = 1;
      }

      if (mode == 1) {
        context.setFillStyle('#ffffff');
        context.font = "Arial";
        context.setShadow(0, 0, 5, 'rgba(0, 0, 0, 0.8)');
        context.setFontSize(14);

        context.fillText(time, 20, that.data.canvasHeight - 20);
      } else {
        context.drawImage(that.properties.locationUrl, 20, that.data.canvasHeight - 76, 32, 32);

        context.setFontSize(28);
        context.setFillStyle('#ffffff');
        context.font = "Arial";
        context.setShadow(0, 0, 5, 'rgba(0, 0, 0, 0.8)');
        context.fillText(city, 56, that.data.canvasHeight - 50);
        context.setFontSize(14);

        var lineWidth = 28 * city.length;
        context.fillText(time, 66 + lineWidth, that.data.canvasHeight - 50);
        context.fillText(address, 20, that.data.canvasHeight - 20);
      }

      // 绘制成功存本地并上传图片
      context.draw(false, function (e) {
        console.log('draw callback');

        setTimeout(() => {
          wx.canvasToTempFilePath({
            canvasId: canvasId,
            success: function (res) {

              codeExeTimer.stop("drawWater");

              that.uploadImageOp(res.tempFilePath, fileSize, index);
            },
            fail: function (res) {
              console.log(res);
              // wx.hideLoading();

              that.setData({
                isShowHint: false,
              });
            }
          });
        }, 300);
      })
    },


    // 配置画布大小
    configCanvasSize(res) {
      var canvasWidth = res.width;
      var canvasHeight = res.height;

      var maxHeight = maxCanvasHeight;
      var maxWidth = maxCanvasWidth;

      if (res.width > res.height) {
        maxHeight = maxCanvasWidth;
        maxWidth = maxCanvasHeight;
      }

      var sizeType = -1;   // 类型： -1 不用改变 0 最大宽度  1 最大高度
      if (res.width > maxWidth && res.height > maxHeight) {
        if (maxWidth / res.width > maxHeight / res.height) {
          sizeType = 1;
        } else {
          sizeType = 0;
        }
      } else if (res.width > maxWidth) {
        sizeType = 0;
      } else if (res.height > maxHeight) {
        sizeType = 1;
      }

      if (sizeType == 0) {
        canvasWidth = maxWidth;
        canvasHeight = res.height * maxWidth / res.width;
      } else if (sizeType == 1) {
        canvasHeight = maxHeight;
        canvasWidth = res.width * maxHeight / res.height;
      }


      this.triggerEvent('canvasSize', {
        canvasWidth: canvasWidth,
        canvasHeight: canvasHeight
      }, {});

      this.setData({
        canvasWidth: canvasWidth,
        canvasHeight: canvasHeight,
      });


      console.log("画面大小：" + canvasWidth + " * " + canvasHeight);

    },
  }
})
