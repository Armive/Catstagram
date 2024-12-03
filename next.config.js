/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "wwmqajtqreqlejynvabz.supabase.co",
			},
			{ protocol: "https", hostname: "avatars.githubusercontent.com" },

			// {
			// 	protocol: "https",
			// 	hostname: "i.pinimg.com",
			// },
		],
	},
};

module.exports = nextConfig;
