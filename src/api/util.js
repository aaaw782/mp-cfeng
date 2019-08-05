var typeUtil = require('./typeUtil')
var config = require('./config')
import wux from '../libs/wux/wux'


// 弹出窗口
function lastToast(message, iconType, that) {

  that.$wuxToast = wux(that).$wuxToast;

  that.$wuxToast.show({
    type: iconType,
    timer: 2000,
    color: '#fff',
    text: message,
    success: () => console.log(message)
  })
}


// 弹出窗口
function toast(message, isSuccess) {
  var icon = 'success';
  if (!isSuccess) {
    icon = 'loading';
  }

  wx.showToast({
    title: message,
    icon: icon,
    mask: true,
    duration: 2000
  })
}

// 弹出窗口
function toastNoDuration(message, isSuccess) {
  var icon = 'success';
  if (!isSuccess) {
    icon = 'loading';
  }

  wx.showToast({
    title: message,
    icon: icon,
  })
}



//银行卡号隐藏
function bankCard(cardNum) {
  var bankNo = cardNum.substr(4, 11);
  var bankCard = cardNum.replace(bankNo, "********");
  return bankCard;
}

//银行卡号隐藏
function lastBankCardNum(cardNum) {
  var length = cardNum.length;
  var bankNo = cardNum.substr(length - 4, length);
  return bankNo;
}


// 金额显示
function toThousands(num) {
  if (num == null) {
    return "0.00";
  }

  var minusFlag = false;
  if (num < 0) {
    minusFlag = true;
    num = -num;
  }

  var n = 2;
  var s = num;
  n = n > 0 && n <= 20 ? n : 2;
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  var l = s.split(".")[0].split("").reverse(),
    r = s.split(".")[1];
  var t = "";
  for (var i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
  }

  var result = t.split("").reverse().join("") + "." + r;

  if (minusFlag) {
    result = "-" + result;
  }

  return result;
}

// 返回上一页面的数据传递
function backToSubView(cb, backIndex = 1) {
  if (backIndex <= 0) {
    return;
  }

  var pages = getCurrentPages();
  if (pages.length < backIndex + 1) {
    return;
  }

  var prevPage = pages[pages.length - 1 - backIndex];  //上一个页面

  //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
  typeof cb == "function" && cb(prevPage);

  wx.navigateBack({
    delta: backIndex, // 回退前 delta(默认为1) 页面
  });
}





/**
 * 生成键值对
 */
function createKeyValue(key, value) {
  var object = new Object();
  object.key = key;
  object.value = value;

  return object;
}



function isOriginFormalEnv(serverUrl) {
  if (serverUrl.indexOf("https") != -1) {
    return true;
  }
  return false;
}

/**
 * 图片显示
 *
 * param: url
 */
function showImageWithUrl(url) {
  wx.previewImage({
    current: url,
    urls: [url],
  })

  console.log("下载图片并显示: " + url);
}

/**
 * 图片显示
 *
 * param: fileLoadId
 */
function showImageWithId(fileLoadId) {
  var url = config.host_file + config.config.filePreview + "?fileId=" + fileLoadId;

  wx.previewImage({
    current: url,
    urls: [url],
  })
}


/**
 * 图片显示
 *
 * param: fileLoadId   id以符号分隔
 * param: seqStr   id以符号分隔
 */
function showImageWithIds(fileLoadIds, seqStr) {
  if (typeUtil.stringIsNull(fileLoadIds) || typeUtil.stringIsNull(seqStr)) {
    return;
  }

  let fileIds = fileLoadIds.split(seqStr);
  let url = [];

  for (let fileId of fileIds) {
    let tmpUrl = this.createPreviewUrl(fileId);
    url.push(tmpUrl);
  }

  wx.previewImage({
    current: url[0],
    urls: url,
  })
}




/**
 * 通用图片显示
 *
 * param: info   数据
 * param: attType  附件类型
 */
function showImage(info, attType) {
  if (info == null) {
    return;
  } else if (info.attachmentList == null) {
    return;
  } else if (info.attachmentList.length <= 0) {
    return;
  }

  var localImageList = localImage.LocalImageUtil.getListUrl(info.fileid, attType);
  if (!this.arrayIsNull(localImageList)) {
    wx.previewImage({
      current: localImageList[0],
      urls: localImageList
    })

    console.log("显示本地图片: " + localImageList);

    return;
  }

  var attList = info.attachmentList;
  var selectAttList = [];
  for (let att of attList) {
    if (att.fileType == attType) {
      var url = config.host_file + config.config.filePreview + "?fileId=" + att.fileLoadId + "&mode=1";
      //var url = config.host + config.config.filePreview + att.fileLoadId;
      selectAttList.push(url);
    }
  }

  if (selectAttList.length <= 0) {
    return;
  }


  console.log("下载图片并显示: " + selectAttList);

  wx.previewImage({
    current: selectAttList[0],
    urls: selectAttList
  })
}


/**
 * 生成文件预览地址
 */
function createPreviewUrl(fileLoadId) {
  return config.host_file + config.config.filePreview + "?fileId=" + fileLoadId + "&mode=1";
}

/**
 * 生成文件预览原文件地址
 */
function createPreviewOriUrl(fileLoadId) {
  return config.host_file + config.config.filePreview + "?fileId=" + fileLoadId;
}


/**
 * 获取地区地址   省-市-区  -》 省市区
 * @param address
 * @returns {any}
 */
function getAddress(address) {
  if (typeUtil.stringIsNull(address)) {
    return "";
  }

  var list = address.split("-");
  var result = "";
  for (var i = 0; i < list.length; i++) {
    result += list[i];
  }

  return result;
}




/**
 * 定位信息是否在有效时间内
 */
function isLocationValidTime(preTime) {
  if (preTime == null) {
    return false;
  }

  var now = new Date();
  var locationInfoValidTime = config.locationInfoValidTime;

  var date = new Date(preTime);

  var diff = (now.getTime() - date.getTime()) / 1000  //时间差的毫秒数
  if (diff < locationInfoValidTime) {
    return true;
  }

  return false;
}

/**
 * imgUrl 是否是本地的图片
 */
function imgUrlIsLocal(imgUrl) {
  if (typeUtil.stringIsNull(imgUrl)) {
    return false;
  } else if (imgUrl.indexOf("http:") >= 0) {
    return true;
  }

  return false;
}

function showFailRequest(message, that) {
  if (typeUtil.stringIsNull(message)) {
    message = "请求失败！";
  }
  this.lastToast(message, 'forbidden', that);
}

// 获取用户openId
function getUserOpenId(cb) {
  // wx.login({
  //   //获取code
  //   success: function (res) {
  //     var code = res.code //返回code

  //     wx.request({
  //       url: 'https://api.weixin.qq.com/sns/jscode2session?appid='+config.appId+'&secret='+config.appSecret+'&js_code=' + code + '&grant_type=authorization_code',
  //       data: {},
  //       header: {
  //         'content-type': 'application/json'
  //       },
  //       success: function (res) {
  //         var openId = res.data.openid //返回openid
  //         console.log('openId is: ' + openId);

  //         try {
  //           wx.setStorageSync('openId', openId);

  //           var isSuccess = true;
  //           typeof cb == "function" && cb(openId);
  //         } catch (e) {
  //           console.log("save locationInfo error: " + e);
  //         }
  //       }
  //     })
  //   }
  // })
}

// 获取服务器地址
function getServer() {
  // 非正式环境
  if (!this.isOriginFormalEnv(config.host)) {
    var serverUrl = wx.getStorageSync('serverUrl');
    var fileUrl = wx.getStorageSync('fileUrl');

    if (!stringUtil.stringIsNull(serverUrl)) {
      config.host = serverUrl
      console.log("host is " + config.host);

      if (!stringUtil.stringIsNull(fileUrl)) {
        config.host_file = fileUrl;
        console.log("host_file is " + config.host_file);
      }
    }
  }
}


module.exports = {
  lastToast: lastToast,
  toast: toast,
  toastNoDuration: toastNoDuration,

  bankCard: bankCard,
  lastBankCardNum: lastBankCardNum,
  toThousands: toThousands,

  backToSubView: backToSubView,
  createKeyValue: createKeyValue,
  isOriginFormalEnv: isOriginFormalEnv,

  showImageWithUrl: showImageWithUrl,
  showImageWithId: showImageWithId,
  showImageWithIds: showImageWithIds,
  showImage: showImage,

  createPreviewUrl: createPreviewUrl,
  createPreviewOriUrl: createPreviewOriUrl,

  getAddress: getAddress,
  isLocationValidTime: isLocationValidTime,
  imgUrlIsLocal: imgUrlIsLocal,
  showFailRequest: showFailRequest,
  getUserOpenId: getUserOpenId,
  getServer: getServer,
}


