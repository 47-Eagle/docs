/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  experimental: {
    esmExternals: 'loose'
  },
  // Disable type checking during build for now
  typescript: {
    ignoreBuildErrors: true
  },
  // Disable eslint during build for now
  eslint: {
    ignoreDuringBuilds: true
  }
}

export default nextConfig
