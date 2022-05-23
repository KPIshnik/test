"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send('Aloha Mather Fucker! \n');
});
app.get('/huita', (req, res) => {
    res.send('Huita is hapening \n');
});
app.post('/huita', (req, res) => {
    res.send('Huita is chenged');
});
app.listen(3000, () => {
    console.log('started server');
});
module.exports = app;
