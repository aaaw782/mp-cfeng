
/**
 * 截取时间格式前16 位   YYYY/MM/dd mm:hh
 * @param dateString
 * @returns {any}
 */
function getDateMinuteShow(dateString) {
  if (stringUtil.stringIsNull(dateString)) {
    return "--";
  }

  dateString = dateString.substring(0, 16);

  return dateString;
}

/**
 * 截取时间年月日
 * @param dateString
 * @param joinString
 * @returns {any}
 */
function getDateShow(dateString, joinString) {
  if (stringUtil.stringIsNull(dateString)) {
    return "--";
  }

  dateString = dateString.substring(0, 10);
  var list = dateString.split("-");
  if (list.length < 3) {
    return "";
  }

  if (stringUtil.stringIsNull(joinString)) {
    return list[0] + '年' + list[1] + '月' + list[2] + '日';
  }

  return [list[0], list[1], list[2]].map(formatNumber).join(joinString);
}

/**
 * 截取时间年月日
 * @param date
 * @returns {any}
 */
function formatTime(date) {

  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  return [year, month, day].map(formatNumber).join('-');
}

/**
 * 日期的格式化显示
 * @param n
 * @returns {any}
 */
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 2017-08 -》 2017年08月
function formatChMonthString(date) {
  if (date.length < 7) {
    return date;
  }

  var year = date.substring(0, 4);
  var month = date.substring(5, 7);
  if (month.indexOf('0') <= 0) {
    month = month.substring(1, 2);
  }

  return year + '年' + month + '月';
}

// 从字符串日期中获取只有年 月格式的时间
function formatMonthString(date) {
  if (date.length < 7) {
    return date;
  }

  return date.substring(0, 7);
}

// 获取只有年 月格式的时间
function formatMonthDate(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1

  return [year, month].map(formatNumber).join('-')
}

// 获取只有年 月 日格式的时间
function formatDayDate(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}


// 获取相差monthDiff个月的年 月 日格式的时间
function formatDiffMonthDate(date, monthDiff) {
  date.setMonth(date.getMonth() + monthDiff);

  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

// dayDiff 月 日格式的时间
function formatDiffDayDate(date, dayDiff) {
  date.setDate(date.getDate() + dayDiff);

  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

/**
 * 时间戳转化为时间显示
 */
function stampToDate(stamp) {
  if (stamp.indexOf("/Date(-") >= 0) {
    return null;
  } else if (stamp.indexOf("/Date(") >= 0) {
    var start = "/Date(".length;
    var length = stamp.length;
    stamp = stamp.substring(start, length - 2);
  }

  var date = new Date(parseInt(stamp));
  return formatDayDate(date);
}

//时间计算,<=30 true
function DateDiff(lastData, nowData) {
  if (stringUtil.stringIsNull(lastData) ||
    stringUtil.stringIsNull(nowData)) {
    return false;
  }

  var aDate, oDate1, oDate2, iDays
  aDate = lastData.split("-")
  oDate1 = new Date(aDate[0], aDate[1] - 1, aDate[2]);
  aDate = nowData.split("-");
  oDate2 = oDate2 = new Date(aDate[0], aDate[1] - 1, aDate[2]);
  iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)
  if (iDays <= '30') {
    return true;
  } else {
    return false;
  }
}

// 计算现两个时间差
function countDateInterval(startTime, endTime) {
  var dateBegin = new Date(startTime.replace(/-/g, "/"));//将-转化为/，使用new Date
  var dateEnd = new Date(endTime.replace(/-/g, "/"));
  var dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
  var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
  var leave1 = dateDiff % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000))//计算出小时数
  //计算相差分钟数
  var leave2 = leave1 % (3600 * 1000)    //计算小时数后剩余的毫秒数
  var minutes = Math.floor(leave2 / (60 * 1000))//计算相差分钟数
  //计算相差秒数
  var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
  var seconds = Math.round(leave3 / 1000)
  var result = '';

  if (dayDiff > 0) {
    result += dayDiff + "天";
  }
  if (hours > 0 || dayDiff > 0) {
    result += hours + "小时";
  }
  if (minutes > 0 || hours > 0 || dayDiff > 0) {
    result += minutes + "分";
  }

  return result;
}

// 格式化时间
function formatAllTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}


module.exports = {
  getDateMinuteShow: getDateMinuteShow,
  getDateShow: getDateShow,
  formatTime: formatTime,
  formatNumber: formatNumber,
  formatChMonthString: formatChMonthString,
  formatMonthString: formatMonthString,
  formatMonthDate: formatMonthDate,
  formatDayDate: formatDayDate,
  formatDiffMonthDate: formatDiffMonthDate,
  formatDiffDayDate: formatDiffDayDate,
  stampToDate: stampToDate,
  DateDiff: DateDiff,
  countDateInterval: countDateInterval,
  formatAllTime: formatAllTime,
}