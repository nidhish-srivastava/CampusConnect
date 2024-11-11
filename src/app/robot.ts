import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',  // User agents are seearch engine inedxing bots like that of google,apple,bing bots so we allow all of them
      allow: '/',
      disallow: [],
    },
    sitemap: 'https://campus-connect-mu.vercel.app/sitemap.xml',
  }
}