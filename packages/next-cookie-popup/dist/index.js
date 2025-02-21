// src/context/CookieContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { jsx } from "react/jsx-runtime";
var CookieContext = createContext(
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
  const [state, setState] = useState({
    hasConsent: false,
    showCookiePopup: false,
    preferences: {}
  });
  useEffect(() => {
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
  return /* @__PURE__ */ jsx(
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
  const context = useContext(CookieContext);
  if (context === null) {
    throw new Error("useCookiePopup must be used within a CookieProvider");
  }
  return context;
};
export {
  CookieProvider,
  useCookiePopup
};
//# sourceMappingURL=index.js.map