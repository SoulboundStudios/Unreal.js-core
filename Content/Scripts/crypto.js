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