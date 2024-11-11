import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://campus-connect-mu.vercel.app',
      lastModified: new Date(),
    },
    // What extra that i can do is seo the users as well so programmatically,fetch all users from db then put their Name in the url,last modified will be their time their account were created in db
  ]
}