/** @type {import('next').NextConfig} */

module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.pngmart.com'
            },
            {
                protocol: 'https',
                hostname: 'images.clerk.dev'
            },
            {
                protocol: 'https',
                hostname: 'uploadthing.com'
            },
            {
                protocol: 'https',
                hostname: 'img.clerk.com'
            },
            {
                protocol: 'https',
                hostname: 'utfs.io'
            },
            {
                protocol : 'https',
                hostname : 'png.pngtree.com'
            }
        ]
    },
} 
