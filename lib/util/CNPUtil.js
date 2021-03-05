"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var CNPUtil = function () {
  function CNPUtil() {
    (0, _classCallCheck2["default"])(this, CNPUtil);
  }

  (0, _createClass2["default"])(CNPUtil, null, [{
    key: "isNull",
    value: function isNull(value) {
      if (typeof value == 'function') {
        return false;
      }

      return typeof value == 'undefined' || value == null || value == undefined || value == 'null' || value == 'undefined' || Number.isNaN(value);
    }
  }, {
    key: "isNotNull",
    value: function isNotNull(value) {
      return !CNPUtil.isNull(value);
    }
  }, {
    key: "isEmpty",
    value: function isEmpty(value) {
      if (CNPUtil.isNull(value)) {
        return true;
      }

      var result = false;

      if (typeof value == 'string') {
        result = 0 == value.length;
      } else if ((0, _typeof2["default"])(value) == 'object') {
        var array = Object.keys(value);
        result = 0 == array.length;
      }

      return result;
    }
  }, {
    key: "isNotEmpty",
    value: function isNotEmpty(value) {
      return !CNPUtil.isEmpty(value);
    }
  }]);
  return CNPUtil;
}();

exports["default"] = CNPUtil;