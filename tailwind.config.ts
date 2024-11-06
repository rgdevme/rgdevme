import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
	content: ['./src/**/*.{ts,js,tsx,jsx}', './app/**/*.{ts,js,tsx,jsx}'],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			},
			fontFamily: {
				display: ['var(--font-gabarito)', ...defaultTheme.fontFamily.sans],
				mono: ['var(--font-jetbrains)', ...defaultTheme.fontFamily.mono],
				sans: ['var(--font-opensans)', ...defaultTheme.fontFamily.sans],
				serif: ['var(--font-newsreader)', ...defaultTheme.fontFamily.serif]
			},
			margin: {
				full: '100%'
			}
		}
	},
	plugins: []
}
export default config
