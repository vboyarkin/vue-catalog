const path = require("path");

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/vue-catalog/" : "/",
  outputDir: path.resolve(__dirname, "./docs"),
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/styles/_variables.sass"`,
      },
    },
  },
};
