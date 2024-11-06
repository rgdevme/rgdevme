import { createTheme, MantineProvider } from '@mantine/core'
import {
	Gabarito,
	JetBrains_Mono,
	Newsreader,
	Open_Sans
} from 'next/font/google'

import './globals.css'

const gabarito = Gabarito({
	subsets: ['latin'],
	variable: '--font-gabarito'
})
const jetbrains = JetBrains_Mono({
	subsets: ['latin'],
	variable: '--font-jetbrains'
})
const opensans = Open_Sans({
	subsets: ['latin'],
	variable: '--font-opensans'
})
const newsreader = Newsreader({
	subsets: ['latin'],
	variable: '--font-newsreader'
})

const theme = createTheme({})

export const metadata = {
	title: 'Rafael González: Full-stack Developer',
	description:
		'Freelance full-stack dev, based in Hungary, and ready to tackle any challenge'
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body>
				<MantineProvider theme={theme}>
					<main
						className={`${gabarito.variable} ${jetbrains.variable} ${opensans.variable} ${newsreader.variable}`}>
						{children}
					</main>
				</MantineProvider>
			</body>
		</html>
	)
}
