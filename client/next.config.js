/** @  {import('next').NextConfig} */
const nextConfig = {
  typescript : {
    ignoreBuildErrors: true,
  },
    eslint: {
        ignoreDuringBuilds: true,
      },
      images: {
        domains: [
          'res.cloudinary.com'
        ],
    },
}

module.exports = nextConfig
