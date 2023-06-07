"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnosisService_1 = __importDefault(require("./services/diagnosisService"));
const patientService_1 = __importDefault(require("./services/patientService"));
const app = (0, express_1.default)();
const PORT = 3001;
const cors = require('cors');
app.use(cors());
app.get('/api/ping', (_req, res) => {
    console.log('Someone pinged here');
    res.send('pong');
});
app.get('/api/patients', (_req, res) => {
    res.send(patientService_1.default.getRestrictedEntries());
});
app.get('/api/diagnoses', (_req, res) => {
    res.send(diagnosisService_1.default.getEntries());
});
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
