"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Hash {
    update(data) {
        if (!this.data)
            this.data = new Unreal.JavascriptMD5();
        memory.exec(data.buffer, () => {
            this.data.Update();
        });
        return this;
    }
    digest(encoding = "hex") {
        const ret = this.data ? this.data.Final() : '0xd41d8cd98f00b204e9800998ecf8427e';
        return ret;
    }
}
exports.Hash = Hash;
function createHash(algorithm = "md5") {
    return new Hash();
}
exports.createHash = createHash;