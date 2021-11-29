"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LangService = void 0;
const i18next_1 = __importDefault(require("i18next"));
const react_i18next_1 = require("react-i18next");
const lang_contract_1 = require("@sotaoi/contracts/http/lang-contract");
class LangService extends lang_contract_1.Lang {
    constructor() {
        super(...arguments);
        this.available = null;
        this.multilang = false;
    }
    init(store) {
        return __awaiter(this, void 0, void 0, function* () {
            const selectedLang = store().getSelectedLang();
            const defaultLang = store().getDefaultLang();
            this.available = store().getAvailableLangs();
            this.multilang = this.available && this.available.length > 1;
            const resources = {};
            for (const [lang, translations] of Object.entries(store().getTranslations())) {
                resources[lang] = { translation: translations };
            }
            i18next_1.default.use(react_i18next_1.initReactI18next).init({
                resources,
                lng: selectedLang.code,
                fallbackLng: defaultLang.code,
                interpolation: {
                    escapeValue: false,
                },
            });
        });
    }
    isMultilang() {
        return this.multilang;
    }
    useTranslation() {
        return react_i18next_1.useTranslation();
    }
    availableLangs() {
        if (!this.available) {
            return [];
        }
        return this.available;
    }
}
exports.LangService = LangService;
