"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = require("./router/router");
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
mongoose_1.default.set('strictQuery', true);
mongoose_1.default.connect('mongodb://localhost:27017/quanly_banhang').then(() => {
    console.log('connect database Success');
});
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use((0, express_fileupload_1.default)({
    createParentPath: true
}));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('./public'));
app.use('', router_1.router);
app.listen(8080, () => {
    console.log('sever is running');
});
//# sourceMappingURL=index.js.map