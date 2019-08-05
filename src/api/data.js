
var config = require('./config');
var typeUtil = require('./typeUtil');
var mapUtil = require('./mapUtil');
var ServerAddress = require('../pages/ServerAddress/ServerAddress.js');

let globalData = {
  userInfo: null,
};


/**
 * 设置参数
 * @param params
 * @returns {any}
 */
function setParam(value, cb) {
  if (typeUtil.stringIsNull(value)) {
    return;
  }

  typeof cb == "function" && cb(value);
}

/**
 * 配置参数
 * @param params
 * @returns {any}
 */
function configParams(params) {
  if (typeUtil.objectIsNull(params)) {
    return;
  }

  // 全局数据
  setParam(params.globalData, function (value) {
    globalData = value;
  });

  // 服务器地址
  setParam(params.host, function (value) {
    config.host = value;
  });

  // 文件服务器地址
  setParam(params.hostFile, function (value) {
    config.host_file = value;
  });

  // 常用服务器地址列表
  setParam(params.normalServerAddress, function (value) {
    ServerAddress.normalServerAddress = value;
  });

  // 常用文件服务器地址列表
  setParam(params.normalFileAddress, function (value) {
    ServerAddress.normalFileAddress = value;
  });

  // 请求成功状态
  setParam(params.statusSuccess, function (value) {
    config.statusSuccess = value;
  });

  // qq地图key
  setParam(params.qqKey, function (value) {
    mapUtil.configKey(value);
  });
}


module.exports = {
  globalData: globalData,
  configParams: configParams,
}
