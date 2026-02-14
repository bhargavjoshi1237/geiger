/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  basePath: isProd ? '/notes' : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? '/notes' : '',
  },
}

export default nextConfig
