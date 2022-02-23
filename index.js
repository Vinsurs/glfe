/**
 * Author: Vinsurs<2407232109@qq.com>
 * Date: 2022/02/13
 * Github: https://github.com/Vinsurs/glfe
 * Description: A simple but powerful dot-notation prop path util
 * Lisense: MIT
 */
;(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define("glfe", [], factory)
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory()
    } else {
        global.glfe = factory()
    }
})(this, function() {
    var toString = Object.prototype.toString
    var arrayPropFlag = "!"
    var arrayPropReg = new RegExp("^[\\w\\$]+" + arrayPropFlag + "$")
    function isPlainObject(target) {
        return toString.call(target) === "[object Object]"
    }
    function hasSB(propPart) {
        return propPart.indexOf("[") !== -1
    }
    /**
     * @param {Object} target 
     * @param {string} propPath 
     * @returns 
     */
    function get(target, propPath) {
        if(!isPlainObject) {
            warn(`"target" must be a plain object.`)
            return target
        }
        if(!isValidPropPath(propPath)) {
            warn(`"propPath" must be a non-empty prop path string.`)
            return target
        }
        return propPath.split(".").reduce((prev, next) => {
            if(hasSB(next)) {
                return next.replace(/\]/g, "").split("[").reduce((b, a) => b[a], prev)
            }
            return prev[next]
        }, target)
    }
    /**
     * @param {Object} target 
     * @param {string} propPath 
     * @returns 
     */
    function find(target, propPath) {
        if(!isPlainObject) {
            warn(`"target" must be a plain object.`)
            return target
        }
        if(!isValidPropPath(propPath)) {
            warn(`"propPath" must be a non-empty prop path string.`)
            return target
        }
        return propPath.split(".").reduce((prev, next) => {
            if(hasSB(next)) {
                return next.replace(/\]/g, "").split("[").reduce((b, a) => (b && b[a]) ? b[a] : undefined, prev)
            }
            return (prev && prev[next]) ? prev[next] : undefined
        }, target)
    }
    /**
     * @param {Object} target 
     * @param {string} propPath 
     * @param {*} value 
     * @returns 
     */
    function set(target, propPath, value) {
        if(!isPlainObject) {
            warn(`"target" must be a plain object.`)
            return target
        }
        if(!isValidPropPath(propPath)) {
            warn(`"propPath" must be a non-empty prop path string.`)
            return target
        }
        var propParts = propPath.split(".")
        // when propPath likes "a.b.d[f]"
        if(propParts.length > 1) {
            var lastPropPart = propParts.pop()
            var subTarget = propParts.reduce((prev, next) => {
                if(hasSB(next)) {
                    return next.replace(/\]/g, "").split("[").reduce((b, a) => {
                        var flag = isArrayProp(a)
                        if(flag) {
                            a = a.slice(0, -1)
                        }
                        return (b[a] = b[a] || (flag ? [] : {}))
                    }, prev)
                }
                return (prev[next] = prev[next] || {})
            }, target)
            if(hasSB(lastPropPart)) {
                var paths = lastPropPart.replace(/\]/g, "").split("[")
                var propLast = paths.pop()
                return (paths.reduce((b, a) => {
                    var flag = isArrayProp(a)
                    if(flag) {
                        a = a.slice(0, -1)
                    }
                    return (b[a] = b[a] || (flag ? [] : {}))
                }, subTarget)[propLast] = value, target)
            }
            return (subTarget[lastPropPart] = value, target)
        }
        var prop = propParts.pop()
        // when propPath likes "a[b][d]"
        if(hasSB(prop)) {
            var paths = prop.replace(/\]/g, "").split("[")
            var propLast = paths.pop()
            return (paths.reduce((b, a) => {
                var flag = isArrayProp(a)
                if(flag) {
                    a = a.slice(0, -1)
                }
                return (b[a] = b[a] || (flag ? [] : {}))
            }, target)[propLast] = value, target)
        }
        // when propPath likes "a"
        return (target[prop] = value, target)
    }
    function isValidPropPath(propPath) {
        return typeof propPath === "string" && propPath.replace(/^\s|\s$/, "").length > 0
    }
    function isArrayProp(prop) {
        return arrayPropReg.test(prop)
    }
    function warn(message) {
        console.warn(`[glfe] ${message}`)
    }
    return {
        get,
        set,
        find
    }
})
