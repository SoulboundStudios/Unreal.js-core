"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Hash {
    update(data) {
		if (typeof data === 'string')
            data = Uint8Array.from(Array.from(data, c => c.charCodeAt(0)));
		
		
        if (!this.data)
            this.data = new Unreal.JavascriptMD5();
        memory.exec(data.buffer, () => {
            this.data.Update();
        });
        return this;
    }
    digest(encoding = "hex") {
        const ret = this.data ? this.data.Final() : 'd41d8cd98f00b204e9800998ecf8427e';
        return ret;
    }
}
exports.Hash = Hash;
function createHash(algorithm = "md5") {
    return new Hash();
}
exports.createHash = createHash;
function randomBytes(size) {
    const ret = new Uint8Array(size);
    randomFillSync(ret, 0, size);
    return ret;
}
exports.randomBytes = randomBytes;
function randomFillSync(buffer, offset = 0, size) {
    if (size === undefined)
        size = buffer.length - offset;
    for (let idx = 0; idx < size; ++idx)
        buffer[idx] = Unreal.KismetMathLibrary.RandomInteger(256);
    return buffer;
}
exports.randomFillSync = randomFillSync;
//# sourceMappingURL=crypto.js.map