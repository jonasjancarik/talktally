/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: process.env.NODE_ENV === 'development' ? '' : '/talktally',
};

export default nextConfig;
