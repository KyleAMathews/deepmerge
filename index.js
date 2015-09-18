(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.deepmerge = factory();
    }
}(this, function () {

return function deepmerge(target, src, opts) {
    var array = Array.isArray(src);
    var dst = array && [] || {};
    opts = opts || {};

    if (array) {
        target = target || [];
        dst = dst.concat(target);

        src.forEach(function(e, i) {
            if (opts.arrays === 'concat') {
                dst.push(e);
            } else {
                if (typeof dst[i] === 'undefined') {
                    dst[i] = e;
                } else if (typeof e === 'object') {
                    dst[i] = deepmerge(target[i], e, opts);
                } else {
                    if (target.indexOf(e) === -1) {
                        dst.push(e);
                    }
                }
            }
        });
    } else {
        if (target && typeof target === 'object') {
            Object.keys(target).forEach(function (key) {
                dst[key] = target[key];
            })
        }
        Object.keys(src).forEach(function (key) {
            if (typeof src[key] !== 'object' || !src[key]) {
                dst[key] = src[key];
            }
            else {
                if (!target[key]) {
                    dst[key] = src[key];
                } else {
                    dst[key] = deepmerge(target[key], src[key], opts);
                }
            }
        });
    }

    return dst;
}

}));
