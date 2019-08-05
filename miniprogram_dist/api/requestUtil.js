var config = require('./config');
var data = require('./data');
var dateUtil = require('./dateUtil');
var typeUtil = require('./typeUtil');


var refreshDelay = 1800000; //刷新延时
// var refreshDelay = 1000; //刷新延时


/**
 * post请求
 *
 * @param requestUrl: 请求url
 * @param paramData: 请求参数
 * @param successFun： 成功函数
 */
function smallRequestPost(requestUrl, paramData, successFun) {
  var that = this;
  requestPost(requestUrl, paramData, successFun, function (errMsg) { }, function () { }, that, false, true);
}

/**
 * post请求
 *
 * @param requestUrl: 请求url
 * @param paramData: 请求参数
 * @param successFun： 成功函数
 * @param isAddToken 是否增加令牌参数
 */
function smallRequestPostToken(requestUrl, paramData, successFun, isAddToken) {
  var that = this;
  requestPost(requestUrl, paramData, successFun, function (errMsg) { }, function () { }, that, false, isAddToken);
}

/**
 * post请求
 *
 * @param requestUrl: 请求url
 * @param paramData: 请求参数
 * @param successFun： 成功函数
 * @param that： 页面类型
 * @param isShowLoading： 是否显示 loading
 * @param isAddToken 是否增加令牌参数
 */
function middleRequestPost(requestUrl, paramData, successFun, that, isShowLoading, isAddToken) {
  requestPost(requestUrl, paramData, successFun, function (errMsg) { }, function () { }, that, isShowLoading, isAddToken);
}

/**
 * post请求
 *
 * @param requestUrl: 请求url
 * @param paramData: 请求参数
 * @param successFun： 成功函数
 * @param failFun： 失败函数
 * @param completeFun：完成函数
 * @param that： 页面类型
 * @param isShowLoading： 是否显示 loading
 * @param isAddToken 是否增加令牌参数
 */
function requestPost(requestUrl, paramData, successFun, failFun, completeFun, that, isShowLoading, isAddToken) {


  if (isShowLoading) {
    that.setData({
      loading: true
    })
  }
  var request_Url = config.host + requestUrl;

  console.log("url is " + getUrl(request_Url, paramData));

  var authHeader = "";
  if (isAddToken) {
    var userInfo = data.globalData.userInfo;

    if (!typeUtil.objectIsNull(userInfo)) {
      authHeader = userInfo.accessToken;
    } else {
      paramData.USERNAME = '18122709156';
      paramData.PASSWORD = 'MTIzNDU2';
      paramData.CLIENT = config.CLIENT;
      paramData.SCANTYPE = config.SCANTYPE;
      // paramData.ISSPECIAL = config.ISSPECIAL;
    }
  }

  wx.request({
    url: request_Url,
    data: paramData,
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
      "accessToken": authHeader
    },
    success: function (res) {
      console.log('message: ', res.data.message);
      if (res.data != null && res.data.message != null) {
        if (res.data.message == '认证失败，accessToken有误或已过期') {
          wx.redirectTo({
            url: '/pages/login/login',
          })
        }
      }

      typeof successFun == "function" && successFun(res);

      if (isShowLoading) {
        that.setData({
          loading: false
        })
      }
    },
    fail: function (errMsg) {
      // fail
      console.log('request fail', errMsg)
      typeof failFun == "function" && failFun(errMsg);

      if (isShowLoading) {
        that.setData({
          loading: false
        })
      }
    },
    complete: function () {
      // complete
      typeof completeFun == "function" && completeFun();
    }
  })
}

// 定时更新令牌
function pollingRefreshToken() {
  if (data.globalData.userInfo == null) {
    return;
  } else if (data.globalData.userInfo.accessToken == null) {
    return;
  }

  var that = this;
  setTimeout(() => {
    let token = data.globalData.userInfo.accessToken;
    if (token) {
      var paramData = {
        accessToken: token,
      };

      that.smallRequestPost(config.config.refreshTokenUrl, paramData, function (res) {
        if (res.data.status == 200) {
          // success
          data.globalData.userInfo.accessToken = res.data.body.accessToken;
          data.globalData.userInfo.expiresIn = res.data.body.expiresIn;

          wx.setStorageSync('userInfo', data.globalData.userInfo);
        } else {
          // fail
          // util.lastToast(res.data.message, 'forbidden', that);
        }

        that.pollingRefreshToken();
      });
    }
  }, refreshDelay);
}

// 删除文件
function deleteFile(fileId, success, fail) {

  var paramData = {
    fileId: fileId,
  };

  var url = config.host_file + config.config.fileDelete;

  wx.request({
    url: url,
    data: paramData,
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    success: function (res) {
      console.log('message: ', res.data.message);
      if (res.data.status == 200) {
        typeof success == "function" && success(res.data);
      } else {
        typeof fail == "function" && fail(res);
      }
    },
    fail: function (errMsg) {
      // fail
      console.log('request fail', errMsg)
      typeof fail == "function" && fail(res);
    },
    complete: function () {
      // complete

    }
  })
}

/**
 * 获取网络请求的地址
 * @param url
 * @param paramData
 * @returns {any}
 */
function getUrl(url, paramData) {
  var result = url + "?";
  for (var prop in paramData) {
    result += prop + "=" + paramData[prop] + "&";
  }

  var length = result.length;
  result = result.substring(0, length - 1);

  return result;
}


/**
 * 上传图片
 * @param filePath
 * @param businessType
 * @param fileSize
 * @param city
 * @param fail
 * @returns {any}
 */
function doUploadImage(filePath, businessType, fileSize, city, address, success, fail) {
  if (filePath == '' || filePath == null) {
    return;
  }

  var fileNameList = filePath.split(".");
  var length = fileNameList.length;
  if (length <= 1) {
    return;
  }

  var fileName = fileNameList[length - 2] + "." + fileNameList[length - 1];
  var fileType = "." + fileNameList[length - 1]
  var formData = {
    businessType: businessType,
    fileName: fileName,
    fileType: fileType,
    fileSize: fileSize,
    city: city,
    address: address,
  };


  var url = config.host_file + config.config.fileUpload;

  var time = dateUtil.formatAllTime(new Date());

  console.log(time + "   upload image url: " + url + " \n param is: " + JSON.stringify(formData));

  wx.uploadFile({
    url: url,
    filePath: filePath,
    name: fileName,
    header: {
      'content-type': 'multipart/form-data'
    }, // 设置请求的 header
    formData: formData, // HTTP 请求中其他额外的 form data
    success: function (res) {
      console.log(res);
      if (res.statusCode == 200) {
        typeof success == "function" && success(res.data);
      } else {
        typeof fail == "function" && fail(res);
      }
    },
    fail: function (res) {
      console.log(res);
      typeof fail == "function" && fail(res);
    }
  })
}


module.exports = {
  smallRequestPost: smallRequestPost,
  middleRequestPost: middleRequestPost,
  requestPost: requestPost,
  pollingRefreshToken: pollingRefreshToken,
  deleteFile: deleteFile,
  getUrl: getUrl,
  doUploadImage: doUploadImage,
}
