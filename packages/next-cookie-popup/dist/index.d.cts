import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

type ConsentState = {
    hasConsent: boolean;
    showCookiePopup: boolean;
    preferences: Record<string, string>;
};
type ConsentActions = {
    acceptAll: () => void;
    rejectAll: () => void;
    toggleCookiePopup: (toggle: boolean) => void;
    savePreferences: (preferences: Record<string, string>) => void;
};
type CookieProviderProps = {
    children: React.ReactNode;
    cookieName?: string;
    expireDays?: number;
};
declare const CookieProvider: ({ children, cookieName, expireDays, }: CookieProviderProps) => react_jsx_runtime.JSX.Element;
declare const useCookiePopup: () => ConsentState & ConsentActions;

export { CookieProvider, useCookiePopup };
