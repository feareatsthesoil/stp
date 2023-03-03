/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV !== "production";

const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
