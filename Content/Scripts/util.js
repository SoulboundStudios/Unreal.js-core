
var CIRCULAR_ERROR_MESSAGE;

module.exports = {
    inherits: function inherits(ctor, superCtor) {
        ctor.super_ = superCtor
        ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
    },

    tryStringify: function tryStringify(arg) {
        try {
            return JSON.stringify(arg);
        } catch (err) {
            // Populate the circular error message lazily
            if (!CIRCULAR_ERROR_MESSAGE) {
                try {
                    const a = {}; a.a = a; JSON.stringify(a);
                } catch (err) {
                    CIRCULAR_ERROR_MESSAGE = err.message;
                }
            }
            if (err.name === 'TypeError' && err.message === CIRCULAR_ERROR_MESSAGE)
                return '[Circular]';
            throw err;
        }
    },

    format: function format(f) {
        if (typeof f !== 'string') {
            const objects = new Array(arguments.length);
            for (var index = 0; index < arguments.length; index++) {
                objects[index] = inspect(arguments[index]);
            }
            return objects.join(' ');
        }

        if (arguments.length === 1) return f;

        var str = '';
        var a = 1;
        var lastPos = 0;
        for (var i = 0; i < f.length;) {
            if (f.charCodeAt(i) === 37/*'%'*/ && i + 1 < f.length) {
                if (f.charCodeAt(i + 1) !== 37/*'%'*/ && a >= arguments.length) {
                    ++i;
                    continue;
                }
                switch (f.charCodeAt(i + 1)) {
                    case 100: // 'd'
                        if (lastPos < i)
                            str += f.slice(lastPos, i);
                        str += Number(arguments[a++]);
                        break;
                    case 105: // 'i'
                        if (lastPos < i)
                            str += f.slice(lastPos, i);
                        str += parseInt(arguments[a++]);
                        break;
                    case 102: // 'f'
                        if (lastPos < i)
                            str += f.slice(lastPos, i);
                        str += parseFloat(arguments[a++]);
                        break;
                    case 106: // 'j'
                        if (lastPos < i)
                            str += f.slice(lastPos, i);
                        str += tryStringify(arguments[a++]);
                        break;
                    case 115: // 's'
                        if (lastPos < i)
                            str += f.slice(lastPos, i);
                        str += String(arguments[a++]);
                        break;
                    case 37: // '%'
                        if (lastPos < i)
                            str += f.slice(lastPos, i);
                        str += '%';
                        break;
                }
                lastPos = i = i + 2;
                continue;
            }
            ++i;
        }
        if (lastPos === 0)
            str = f;
        else if (lastPos < f.length)
            str += f.slice(lastPos);
        while (a < arguments.length) {
            const x = arguments[a++];
            if (x === null || (typeof x !== 'object' && typeof x !== 'symbol')) {
                str += ' ' + x;
            } else {
                str += ' ' + inspect(x);
            }
        }
        return str;
    }
};