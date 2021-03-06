var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var common = require("oci-common");
var st = require("oci-streaming"); // OCI SDK package for OSS
var ociConfigFile = "<config_file_path>";
var ociProfileName = "<config_file_profile_name>";
var ociMessageEndpointForStream = "<stream_message_endpoint>"; // example value "https://cell-1.streaming.region.oci.oraclecloud.com"
var ociStreamOcid = "<stream_OCID>";
// provide authentication for OCI and OSS
var provider = new common.ConfigFileAuthenticationDetailsProvider(ociConfigFile, ociProfileName);
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var client, messages, i, entry_1, putMessageDetails, putMessagesRequest, putMessageResponse, _i, _a, entry;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    client = new st.StreamClient({ authenticationDetailsProvider: provider });
                    client.endpoint = ociMessageEndpointForStream;
                    messages = [];
                    for (i = 1; i <= 3; i++) {
                        entry_1 = {
                            key: Buffer.from("messageKey" + i).toString("base64"),
                            value: Buffer.from("messageValue" + i).toString("base64")
                        };
                        messages.push(entry_1);
                    }
                    console.log("Publishing %s messages to stream %s.", messages.length, ociStreamOcid);
                    putMessageDetails = { messages: messages };
                    putMessagesRequest = {
                        putMessagesDetails: putMessageDetails,
                        streamId: ociStreamOcid
                    };
                    return [4 /*yield*/, client.putMessages(putMessagesRequest)];
                case 1:
                    putMessageResponse = _b.sent();
                    for (_i = 0, _a = putMessageResponse.putMessagesResult.entries; _i < _a.length; _i++) {
                        entry = _a[_i];
                        console.log("Published messages to parition %s, offset %s", entry.partition, entry.offset);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
main()["catch"](function (err) {
    console.log("Error occurred: ", err);
});
