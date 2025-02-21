# Next Cookie Popup

A React context provider for managing cookie consent popups in Next.js applications.

## Installation

Install the package using npm or yarn:

```bash
npm install next-cookie-popup
```

or

```bash
yarn add next-cookie-popup
```

## Usage

Wrap your application with the `CookieProvider` to manage cookie consent state.

```tsx
//provider/cookie-provider.tsx
'use client'

import { CookieProvider } from 'next-cookie-popup'

export function CookieProviderWrapper({
	children,
}: {
	children: React.ReactNode
}) {
	return <CookieProvider>{children}</CookieProvider>
}

//layout.tsx
import { CookieProviderWrapper } from './provider/cookie-provider'

function MyApp({ Component, pageProps }) {
	return (
		<CookieProviderWrapper>
			<Component {...pageProps} />
		</CookieProviderWrapper>
	)
}

export default MyApp
```

Use the `useCookiePopup` hook to access and manage cookie consent state within your components.

```tsx
//page.tsx
import { useCookiePopup } from 'next-cookie-popup'

const MyComponent = () => {
	const {
		hasConsent,
		showCookiePopup,
		acceptAll,
		rejectAll,
		toggleCookiePopup,
		savePreferences,
	} = useCookiePopup()

	return (
		<div>
			{showCookiePopup && (
				<div>
					<p>We use cookies to improve your experience.</p>
					<button onClick={acceptAll}>Accept All</button>
					<button onClick={rejectAll}>Reject All</button>
				</div>
			)}
		</div>
	)
}

export default MyComponent
```

## API

### `CookieProvider`

Props:

- `children`: React.ReactNode - The child components to be wrapped by the provider.
- `cookieName` (optional): string - The name of the cookie to store consent state. Default is `cookie-popup`.
- `expireDays` (optional): number - The number of days until the cookie expires. Default is 365 days.

### `useCookiePopup`

Returns an object with the following properties and methods:

- `hasConsent`: boolean - Indicates if the user has given consent.
- `showCookiePopup`: boolean - Indicates if the cookie popup should be shown.
- `acceptAll`: () => void - Function to accept all cookies.
- `rejectAll`: () => void - Function to reject all cookies.
- `toggleCookiePopup`: (toggle: boolean) => void - Function to show or hide the cookie popup.
- `savePreferences`: (preferences: Record<string, string>) => void - Function to save user preferences.

## License

MIT
