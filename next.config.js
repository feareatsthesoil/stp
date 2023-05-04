/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV !== "production";

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  }
};

module.exports = nextConfig;
