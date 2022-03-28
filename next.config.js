const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: isProd ? '/tp-1' : '',
  assetPrefix: isProd ? '/tp-1' : ''
}

module.exports = nextConfig
