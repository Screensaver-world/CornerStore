const images = require('next-images')
const withPlugins = require('next-compose-plugins')

// optional next.js configuration
const nextConfig = {
}

module.exports = withPlugins([images], nextConfig)
