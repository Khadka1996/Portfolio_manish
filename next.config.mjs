/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  experimental: {
    // Tree-shake icon/animation libraries so only used exports ship
    optimizePackageImports: ['react-icons/fa', 'react-icons/fa6', 'react-icons/fi', 'react-icons/si', 'framer-motion', 'antd', '@mui/material', '@mui/icons-material'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      // Add other domains if needed for production
      // {
      //   protocol: 'https',
      //   hostname: 'your-production-domain.com',
      //   pathname: '/uploads/**',
      // },
    ],
  },
  async headers() {
    return [
      {
        source: '/:all*(jpg|jpeg|png|webp|avif|svg|ico|pdf|woff2)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*' // Proxy to Express
      },
      // Optional: Rewrite for image uploads if needed
      // {
      //   source: '/uploads/:path*',
      //   destination: 'http://localhost:5000/uploads/:path*'
      // }
    ]
  }
}

export default nextConfig
