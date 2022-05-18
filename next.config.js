/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	optimizeFonts: true,
	env: {
		APP_URL: process.env.REACT_APP_URL,
		APP_ENV: process.env.REACT_APP_ENV,
		APP_SERVER_URL: process.env.REACT_APP_SERVER_URL,
	},
	images: {
		domains: ['res.cloudinary.com'],
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `https://tranquil-mesa-26378.herokuapp.com/api/:path*`,
			},
		];
	},
};

module.exports = nextConfig;
