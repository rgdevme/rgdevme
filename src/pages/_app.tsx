import type { AppProps } from 'next/app'
import '../globals.css'

import { createTheme, MantineProvider } from '@mantine/core'
import Head from 'next/head'

const theme = createTheme({})

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			</Head>
			<MantineProvider theme={theme}>
				<Component {...pageProps} />
			</MantineProvider>
		</>
	)
}
