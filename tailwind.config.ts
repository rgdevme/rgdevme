import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
	content: ['./src/**/*.{ts,js,tsx,jsx}'],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			},
			fontFamily: {
				sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
				serif: ['Newsreader', ...defaultTheme.fontFamily.serif],
				mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
				display: ['Gabarito', ...defaultTheme.fontFamily.sans]
			},
			margin: {
				full: '100%'
			}
		}
	},
	plugins: []
}
export default config
