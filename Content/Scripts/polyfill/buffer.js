class Buffer extends Uint8Array {
    static allocUnsafe(size) {
        return new Buffer(size);
    }
    constructor(size) { super(size); }
}

(function (target) {
	target.Buffer = Buffer;
})(this);