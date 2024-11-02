import type { AppProps } from 'next/app'
import '../globals.css'
import {
	Gabarito,
	JetBrains_Mono,
	Open_Sans,
	Newsreader
} from 'next/font/google'

import { createTheme, MantineProvider } from '@mantine/core'
import Head from 'next/head'

const gabarito = Gabarito({ subsets: ['latin'], variable: '--font-gabarito' })
const jetbrains = JetBrains_Mono({
	subsets: ['latin'],
	variable: '--font-jetbrains'
})
const opensans = Open_Sans({ subsets: ['latin'], variable: '--font-opensans' })
const newsreader = Newsreader({
	subsets: ['latin'],
	variable: '--font-newsreader'
})

const theme = createTheme({})

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<title>Rafael González: Full-stack Developer</title>
				<meta
					name='description'
					content='Freelance full-stack dev, based in Hungary, and ready to tackle any challenge'
				/>
			</Head>
			<MantineProvider theme={theme}>
				<main
					className={`${gabarito.variable} ${jetbrains.variable} ${opensans.variable} ${newsreader.variable}`}>
					<Component {...pageProps} />
				</main>
			</MantineProvider>
		</>
	)
}
