import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: '3D Model',
	description: 'Next.js with 3D model',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" className="dark">
			<body>{children}</body>
		</html>
	)
}
