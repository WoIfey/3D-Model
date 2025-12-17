import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'buh',
	description: '3D model of myself',
	openGraph: {
		title: 'buh',
		description: '3D model of myself',
		url: 'https://me.wolfey.me',
		images: [
			{
				url: 'https://up.wolfey.me/l6UBUOeu',
				width: 1280,
				height: 720,
				alt: 'whos that!',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" className="dark">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				{children}
			</body>
		</html>
	)
}
