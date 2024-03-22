"use strict";
import sha3 from "iwcrypto/sha3";
import { arrayify } from "../bytes";
export function keccak256(data) {
    return '0x' + sha3.keccak_256(arrayify(data));
}
//# sourceMappingURL=index.js.map