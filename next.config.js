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
            }
        ]
    },
    experimental: {
        serverActions: true
    }
} 
