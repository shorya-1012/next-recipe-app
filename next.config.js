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
            }
        ]
    },
    experimental: {
        serverActions: true
    }
} 
