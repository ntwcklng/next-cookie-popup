"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  CookieProvider: () => CookieProvider,
  useCookiePopup: () => useCookiePopup
});
module.exports = __toCommonJS(index_exports);

// src/context/CookieContext.tsx
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var CookieContext = (0, import_react.createContext)(
  null
);
var getCookie = (name) => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return null;
};
var setCookie = (name, value, days) => {
  if (typeof document === "undefined") return;
  const expires = /* @__PURE__ */ new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1e3);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()}`;
};
var CookieProvider = ({
  children,
  cookieName = "cookie-popup",
  expireDays = 365
}) => {
  const [state, setState] = (0, import_react.useState)({
    hasConsent: false,
    showCookiePopup: false,
    preferences: {}
  });
  (0, import_react.useEffect)(() => {
    const consentCookie = getCookie(cookieName);
    if (consentCookie) {
      setState(JSON.parse(consentCookie));
    } else {
      setState((prev) => ({ ...prev, showCookiePopup: true }));
    }
  }, [cookieName]);
  const acceptAll = () => {
    const newState = {
      hasConsent: true,
      showCookiePopup: false,
      preferences: {}
    };
    setCookie(cookieName, JSON.stringify(newState), expireDays);
    setState(newState);
  };
  const toggleCookiePopup = (toggle) => {
    const newState = { ...state, showCookiePopup: toggle };
    setCookie(cookieName, JSON.stringify(newState), expireDays);
    setState(newState);
  };
  const rejectAll = () => {
    const newState = {
      hasConsent: false,
      showCookiePopup: false,
      preferences: {}
    };
    setCookie(cookieName, JSON.stringify(newState), expireDays);
    setState(newState);
  };
  const savePreferences = (preferences) => {
    const newState = { ...state, preferences };
    setCookie(cookieName, JSON.stringify(newState), expireDays);
    setState(newState);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    CookieContext.Provider,
    {
      value: {
        ...state,
        acceptAll,
        rejectAll,
        savePreferences,
        toggleCookiePopup
      },
      children
    }
  );
};
var useCookiePopup = () => {
  const context = (0, import_react.useContext)(CookieContext);
  if (context === null) {
    throw new Error("useCookiePopup must be used within a CookieProvider");
  }
  return context;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CookieProvider,
  useCookiePopup
});
//# sourceMappingURL=index.cjs.map