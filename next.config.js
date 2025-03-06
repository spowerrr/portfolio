/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // This base path should match your GitHub repository name
  // For example, if your repo is "username.github.io", leave it as ""
  // If your repo is "portfolio", use "/portfolio"
  basePath: "",
  // Set this to false since GitHub Pages doesn't support trailing slashes
  trailingSlash: false,
};

module.exports = nextConfig;
