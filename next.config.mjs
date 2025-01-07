/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
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
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'gensh.honeyhunterworld.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
