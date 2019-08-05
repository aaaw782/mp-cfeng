
/**
 * 判断对象是否为空
 * @param obj
 * @returns {boolean}
 */
function objectIsNull(obj) {
  if (obj == null || obj == undefined) {
    return true
  }

  return false
}

/**
 * 判断字符串是否为空
 * @param str
 * @returns {boolean}
 */
function stringIsNull(string) {
  if (string == '' || string == null || string == undefined) {
    return true
  }

  return false
}

/**
 * 安全获取字符串数据，为空时获取默认字符
 * @param str
 * @param defaultString
 * @param otherString
 * @returns {boolean}
 */
function safeGetString(str, defaultString, otherString='') {
  if (stringIsNull(str)) {
    return defaultString + otherString;
  }

  return str + otherString;
}

/**
 * 判断数组是否为空
 * @param list
 * @returns {boolean}
 */
function arrayIsNull(list) {
  if (list == null || list == undefined || list.length <= 0) {
    return true;
  }

  return false;
}

/**
 * 数组删除
 * @param list
 * @param item
 * @returns {any}
 */
function arrayRemoveItem(list, item) {　//n表示第几项，从0开始算起。
                                       //prototype为对象原型，注意这里为对象增加自定义方法的方法。
  if (this.arrayIsNull(list)) {
    return list;
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i] == item) {
      list.splice(i, 1);
    }
  }
}

/**
 * 数组删除
 * @param list
 * @param n
 * @returns {any}
 */
function arrayRemoveIndex(list, n) {　//n表示第几项，从0开始算起。
                                     //prototype为对象原型，注意这里为对象增加自定义方法的方法。
  if (this.arrayIsNull(list)) {
    return list;
  }

  if (n < 0 || n >= list.length) {
    return list;
  }

  list.splice(n, 1);;
}

/**
 * 数组插入元素
 * @param list
 * @param elem
 * @param index
 * @returns {any}
 */
function arrayInsertIndex(list, elem, index) {
  if (this.arrayIsNull(list)) {
    return list;
  } else if (index < 0 || index >= list.length) {
    return list;
  }

  list.splice(index, 0, elem);

  return list;
}

/**
 * 数组是否包含某个元素
 */
function arrayContains(arr, obj) {
  var i = arr.length;
  while (i--) {
    if (arr[i] === obj) {
      return i;
    }
  }
  return -1;
}

module.exports = {
  objectIsNull: objectIsNull,
  stringIsNull: stringIsNull,
  safeGetString: safeGetString,
  arrayIsNull: arrayIsNull,
  arrayRemoveItem: arrayRemoveItem,
  arrayRemoveIndex: arrayRemoveIndex,
  arrayInsertIndex: arrayInsertIndex,
  arrayContains: arrayContains,
}
