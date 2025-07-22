import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  // output: 'export',
  reactStrictMode: true,
  transpilePackages: ['react-quizlet-flashcard'],
  redirects: async () => [
    { source: "/", destination: "/docs", permanent: true },
  ]
};

export default withMDX(config);
