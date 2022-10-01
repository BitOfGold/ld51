import path from "path";
import fs from "fs";
//import glsl from "vite-plugin-glsl";
import { defineConfig } from "vite";
const crossOriginIsolation = import("vite-plugin-cross-origin-isolation");

module.exports = defineConfig({
  publicDir: "static",
  server: {
    https: {
      key: fs.readFileSync("./.cert/key.pem"),
      cert: fs.readFileSync("./.cert/cert.pem"),
    },
    fs: {
      allow: ["..","../.."],
    },
  },
  resolve: {
    alias: []
  },
  plugins: [
    //glsl(),
    {
      name: "configure-response-headers",
      configureServer: (server) => {
        server.middlewares.use((_req, res, next) => {
          res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
          res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
          next();
        });
      },
    },
  ],
  esbuild: {
    minify: true,
  },
  build: {
    minify: true,
    chunkSizeWarningLimit: 4096
  },
});
