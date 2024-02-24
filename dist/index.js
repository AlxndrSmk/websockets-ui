"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_ts_1 = require("./src/http_server/index.ts");
const HTTP_PORT = 8181;
console.log(`Start static http server on the ${HTTP_PORT} port!`);
index_ts_1.httpServer.listen(HTTP_PORT);
//# sourceMappingURL=index.js.map