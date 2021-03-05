export default class CNPURLUtil {

  /**
    * 获取Url参数
    * @method urlParameter
    * @for JJTool
    * @param {String} name 参数说明:如果有参数则值返回当前name的参数与值，否则则全部返回
    * @return {Object} 返回值说明 标准的Object key:value 类型
    */
  static getUrlParameter(name = '') {
    let urlparam = window.location.search === '' ? window.location.hash : window.location.search;
    if (!urlparam || urlparam.length === 0) {
      return {}
    }
    const index = urlparam.indexOf('?')
    if (index < 0) {
      return {}
    }
    urlparam = urlparam.slice(index + 1);
    if (!urlparam || urlparam.length === 0) {
      return {};
    }
    const urlparamArray = urlparam.split("&");
    let param = {};
    if (urlparamArray && urlparamArray.length > 0) {
      urlparamArray.forEach(item => {
        if (urlparam && urlparam.length > 0 && item.indexOf('=') !== -1) {
          let data = item.split('=');
          if (name === data[0]) {
            param = Object.assign({}, param, { [decodeURIComponent(data[0])]: decodeURIComponent(data[1]) })
          } else if (name === '' || name === undefined) {
            param = Object.assign({}, param, { [decodeURIComponent(data[0])]: decodeURIComponent(data[1]) })
          }
        }
      })
    }
    return param;
  }




}