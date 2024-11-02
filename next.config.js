/** @type {import('next').NextConfig} */
const nextConfig = {
	i18n: {
		locales: ['en'],
		defaultLocale: 'en'
	},
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com'
			}
		]
	}
}

module.exports = nextConfig
