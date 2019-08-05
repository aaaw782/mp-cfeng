
// 服务器地址
var host = "http://localhost:8080/";

// 文件服务器地址
var host_file = "http://192.168.31.10:8585/oss/";


// 缓存的定位位置有效时间
var locationInfoValidTime = 60 * 5;

var showCount = "10";
var statusSuccess = 200;

const appId = 'wxaa363a58d18ffe94';
const appSecret = '4c40148467c1576e6112b352ead90408';

var config = {
  // 更新令牌
  refreshTokenUrl: `oauth/refreshToken`,
  
  // 文件预览
  filePreview: `file/preview`,
  // 文件上传
  fileUpload: `file/upload`,
  // 删除文件
  fileDelete: `file/delete`,
};

module.exports = {
  config: config,
  locationInfoValidTime: locationInfoValidTime,
  showCount: showCount,
  statusSuccess: statusSuccess,
  host: host,
  host_file: host_file,
  appId: appId,
  appSecret: appSecret,
}