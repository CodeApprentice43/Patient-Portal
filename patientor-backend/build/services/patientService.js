"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const patentEntries = patients_1.default;
const getEntries = () => {
    return patentEntries;
};
const getRestrictedEntries = () => {
    return patentEntries.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
exports.default = {
    getEntries,
    getRestrictedEntries
};
