// src/context/CookieContext.tsx
'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'

type ConsentState = {
	hasConsent: boolean
	showCookiePopup: boolean
	preferences: Record<string, string>
}

type ConsentActions = {
	acceptAll: () => void
	rejectAll: () => void
	toggleCookiePopup: (toggle: boolean) => void
	savePreferences: (preferences: Record<string, string>) => void
}

export type CookieProviderProps = {
	children: React.ReactNode
	cookieName?: string
	expireDays?: number
}

const CookieContext = createContext<(ConsentState & ConsentActions) | null>(
	null
)

const getCookie = (name: string) => {
	if (typeof document === 'undefined') return null
	const value = `; ${document.cookie}`
	const parts = value.split(`; ${name}=`)
	if (parts.length === 2) return parts.pop()?.split(';').shift()
	return null
}

const setCookie = (name: string, value: string, days: number) => {
	if (typeof document === 'undefined') return
	const expires = new Date()
	expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
	document.cookie = `${name}=${value};expires=${expires.toUTCString()}`
}

export const CookieProvider = ({
	children,
	cookieName = 'cookie-popup',
	expireDays = 365,
}: CookieProviderProps) => {
	const [state, setState] = useState<ConsentState>({
		hasConsent: false,
		showCookiePopup: false,
		preferences: {},
	})

	useEffect(() => {
		const consentCookie = getCookie(cookieName)
		if (consentCookie) {
			setState(JSON.parse(consentCookie))
		} else {
			setState((prev) => ({ ...prev, showCookiePopup: true }))
		}
	}, [cookieName])

	const acceptAll = () => {
		const newState = {
			hasConsent: true,
			showCookiePopup: false,
			preferences: {},
		}
		setCookie(cookieName, JSON.stringify(newState), expireDays)
		setState(newState)
	}

	const toggleCookiePopup = (toggle: boolean) => {
		const newState = { ...state, showCookiePopup: toggle }
		setCookie(cookieName, JSON.stringify(newState), expireDays)
		setState(newState)
	}

	const rejectAll = () => {
		const newState = {
			hasConsent: false,
			showCookiePopup: false,
			preferences: {},
		}
		setCookie(cookieName, JSON.stringify(newState), expireDays)
		setState(newState)
	}

	const savePreferences = (preferences: Record<string, string>) => {
		const newState = { ...state, preferences }
		setCookie(cookieName, JSON.stringify(newState), expireDays)
		setState(newState)
	}

	return (
		<CookieContext.Provider
			value={{
				...state,
				acceptAll,
				rejectAll,
				savePreferences,
				toggleCookiePopup,
			}}>
			{children}
		</CookieContext.Provider>
	)
}

export const useCookiePopup = () => {
	const context = useContext(CookieContext)
	if (context === null) {
		throw new Error('useCookiePopup must be used within a CookieProvider')
	}
	return context
}
