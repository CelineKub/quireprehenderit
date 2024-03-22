"use strict";
import hash from "iwcrypto/hashjs";
//const _ripemd160 = _hash.ripemd160;
import { arrayify } from "../bytes";
import { SupportedAlgorithm } from "./types";
import { Logger } from "../logger";
const logger = new Logger('sha2/sha2');
export function ripemd160(data) {
    return "0x" + (hash.ripemd160().update(arrayify(data)).digest("hex"));
}
export function sha256(data) {
    return "0x" + (hash.sha256().update(arrayify(data)).digest("hex"));
}
export function sha512(data) {
    return "0x" + (hash.sha512().update(arrayify(data)).digest("hex"));
}
export function computeHmac(algorithm, key, data) {
    if (!SupportedAlgorithm[algorithm]) {
        logger.throwError("unsupported algorithm " + algorithm, Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "hmac",
            algorithm: algorithm
        });
    }
    return "0x" + hash.hmac(hash[algorithm], arrayify(key)).update(arrayify(data)).digest("hex");
}
//# sourceMappingURL=sha2.js.map