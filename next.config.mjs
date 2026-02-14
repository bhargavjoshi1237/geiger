/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'PRODUCTION'

const nextConfig = {
  basePath: isProd ? '/notes' : '',
  assetPrefix: isProd ? '/notes/' : '',
}

export default nextConfig
