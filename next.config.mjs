/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'enka.network',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'homdgcat.wiki',
        port: '',
        pathname: '/homdgcat-res/**',
      },
      {
        protocol: 'https',
        hostname: 'gensh.honeyhunterworld.com',
        port: '',
        pathname: '/img/**',
      },
    ],
  },
}

export default nextConfig
