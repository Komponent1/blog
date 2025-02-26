/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.cloudflare.steamstatic.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'shared.akamai.steamstatic.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'avatars.steamstatic.com',
        port: '',
      },
    ]
  },
  reactStrictMode: true,
  swcMinify: true,

  async rewrites() {
    return [
      {
        source: '/app/:path*',
        destination: 'https://store.steampowered.com/app/:path*',
      },
      {
        source: '/steam_api/:path*',
        destination: 'https://store.steampowered.com/api/:path*',
      },
      {
        source: '/seolim/:path*',
        destination: `http://${process.env.SERVER_HOST}/:path*`,
      }
    ]
  }
}

module.exports = nextConfig
