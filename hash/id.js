import { keccak256 } from "../keccak256";
import { toUtf8Bytes } from "../strings";
export function id(text) {
    return keccak256(toUtf8Bytes(text));
}
//# sourceMappingURL=id.js.map