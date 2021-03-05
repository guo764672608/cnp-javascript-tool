"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var CNPURLUtil = function () {
  function CNPURLUtil() {
    (0, _classCallCheck2["default"])(this, CNPURLUtil);
  }

  (0, _createClass2["default"])(CNPURLUtil, null, [{
    key: "getUrlParameter",
    value: function getUrlParameter() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var urlparam = window.location.search === '' ? window.location.hash : window.location.search;

      if (!urlparam || urlparam.length === 0) {
        return {};
      }

      var index = urlparam.indexOf('?');

      if (index < 0) {
        return {};
      }

      urlparam = urlparam.slice(index + 1);

      if (!urlparam || urlparam.length === 0) {
        return {};
      }

      var urlparamArray = urlparam.split("&");
      var param = {};

      if (urlparamArray && urlparamArray.length > 0) {
        urlparamArray.forEach(function (item) {
          if (urlparam && urlparam.length > 0 && item.indexOf('=') !== -1) {
            var data = item.split('=');

            if (name === data[0]) {
              param = Object.assign({}, param, (0, _defineProperty2["default"])({}, decodeURIComponent(data[0]), decodeURIComponent(data[1])));
            } else if (name === '' || name === undefined) {
              param = Object.assign({}, param, (0, _defineProperty2["default"])({}, decodeURIComponent(data[0]), decodeURIComponent(data[1])));
            }
          }
        });
      }

      return param;
    }
  }]);
  return CNPURLUtil;
}();

exports["default"] = CNPURLUtil;