'use client'

import { CookieProvider } from 'next-cookie-popup'

export function CookieProviderWrapper({
	children,
}: {
	children: React.ReactNode
}) {
	return <CookieProvider>{children}</CookieProvider>
}
