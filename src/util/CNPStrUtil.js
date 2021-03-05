import CNPUtil from './CNPUtil'

export default class CNPStrUtil {

    /**
     * 检查字符串是否为纯数字
     * @param {} numStr 
     */
    static isPureNum(numStr) {
        var pattern = /^[0-9]+$/;
        if (pattern.test(numStr)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 检查手机号
     * @param {*} phoneNum 
     */
    static isPhoneNumber(phoneNum) {
        if (CNPUtil.isNull(phoneNum)) {
            return false;
        }
        const num = phoneNum.replace(/\s/g, "");
        if (num.length == 0) {
            return false;
        } else if (num.length != 11) {
            return false;
        }
        let myReg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|17[1-9]{1}|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
        return myReg.test(num);
    }

    static getSecurityPhoneNumber(phoneNum) {
        if (CNPUtil.isNull(phoneNum) || phoneNum.length != 11) {
            return '';
        }
        let num = phoneNum.slice(0);
        let first = num.substr(0, 3)
        let last = num.substr(-4, 4)
        num = first + "****" + last;
        return num;
    }

    /**
     * 身份证号校验
     * string   要校验的字符串
     */
    static isIDCard(idNum) {
        if (CNPUtil.isNull(idNum)) {
            return false;
        }
        let MyRegExp = new RegExp(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/);
        if (idNum.replace(/\s/g, "").length != '18') {
            return false;
        }
        if (!MyRegExp.test(idNum.replace(/\s/g, ""))) {
            return false;
        }
        return true;
    }

    /**
     * 严格校验身份证号
     * string   要校验的字符串
     */
    static strictlyCheckIDCard(val) {
        if (SNCStringUtil.checkCode(val)) {
            var date = val.substring(6, 14);
            if (SNCStringUtil.checkDate(date)) {
                if (SNCStringUtil.checkProv(val.substring(0, 2))) {
                    return true;
                }
            }
        }
        return false;
    }


    /**
     * 身份证号 -> 省级地址码校验
     * val   要校验的字符串
     */
    static checkProv(val) {
        var pattern = /^[1-9][0-9]/;
        var provs = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门" };
        if (pattern.test(val)) {
            if (provs[val]) {
                return true;
            }
        }
        return false;
    }

    /**
     * 身份证号 -> 出生日期码校验
     * val   要校验的字符串
     */
    static checkDate(val) {
        var pattern = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/;
        if (pattern.test(val)) {
            var year = val.substring(0, 4);
            var month = val.substring(4, 6);
            var date = val.substring(6, 8);
            var date2 = new Date(year + "-" + month + "-" + date);
            if (date2 && date2.getMonth() == (parseInt(month) - 1)) {
                return true;
            }
        }
        return false;
    }

    /**
     * 身份证号 -> 校验码校验
     * val   要校验的字符串
     */
    static checkCode(val) {
        var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
        var code = val.substring(17);
        if (p.test(val)) {
            var sum = 0;
            for (var i = 0; i < 17; i++) {
                sum += val[i] * factor[i];
            }
            if (parity[sum % 11] == code.toUpperCase()) {
                return true;
            }
        }
        return false;
    }

    /*
     * 获取出生日期
     * @param {String} idCard 身份证号码
     * @returns {String}
     */
    static getBirthdateByIDCard(idCard) {
        if (CNPUtil.isEmpty(idCard)) {
            return 0;
        }
        var filter = /\d{6}([12]\d{3})([01]\d)([0123]\d)\W{4}/;
        var Data = filter.exec(idCard) || [];
        if (CNPUtil.isEmpty(Data) && Data.length > 1) {
            return Number(Data[1]);
        } else {
            return 0;
        }
    }

    //去掉所有空格
    static clearSpace(str) {
        if (CNPUtil.isNull(str)) {
            return '';
        }
        return str.replace(/\s/g, '');
    }


}
