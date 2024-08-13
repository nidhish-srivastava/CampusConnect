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
          'res.cloudinary.com',
          'icon-library.com'
        ],
    },
}

module.exports = nextConfig
