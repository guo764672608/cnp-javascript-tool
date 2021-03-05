export default class CNPUtil {
    /* 
     * 判定是否为null 
     */
    static isNull(value) {
        if (typeof value == 'function') {
            return false;
        }

        return typeof value == 'undefined' ||
            value == null ||
            value == undefined ||
            value == 'null' ||
            value == 'undefined' ||
            Number.isNaN(value)
    }

    /* 
     * 判定是否非null 
     */
    static isNotNull(value) {
        return !CNPUtil.isNull(value)
    }

    /* 
     * 判定是否为空 
     */
    static isEmpty(value) {
        if (CNPUtil.isNull(value)) {
            return true
        }

        let result = false

        if (typeof value == 'string') {
            result = (0 == value.length)
        } else if (typeof value == 'object') {
            const array = Object.keys(value)
            result = (0 == array.length)
        }

        return result
    }

    /* 
     * 判定非空 
     */
    static isNotEmpty(value) {
        return !CNPUtil.isEmpty(value)
    }

    
}