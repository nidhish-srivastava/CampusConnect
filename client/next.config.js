/** @  {import('next').NextConfig} */
const nextConfig = {
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
