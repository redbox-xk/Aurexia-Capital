/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
  // Performance optimizations
  swcMinify: true,
  compress: true,
  // Experimental React Compiler for automatic optimizations
  experimental: {
    reactCompiler: true,
    optimizePackageImports: ['lucide-react', '@supabase/supabase-js'],
  },
  // Static generation timeout
  staticPageGenerationTimeout: 60,
  // Headers for caching
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
      {
        source: '/public/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
}

export default nextConfig
