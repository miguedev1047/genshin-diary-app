/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dhnjhei13/**',
      },
      {
        protocol: 'https',
        hostname: 'gensh.honeyhunterworld.com',
        port: '',
        pathname: '/img/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.wanderer.moe',
        port: '',
        pathname: '/genshin-impact/**',
      },
    ],
  },
}

export default nextConfig
