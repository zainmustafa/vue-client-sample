module.exports = {
  transpileDependencies: ['vuetify'], // this comment is here, so that black duck doesn't think it is from another package
  configureWebpack: (config) => {
    config.target = "web";
    if (process.env.NODE_ENV === "development") {
      config.devtool = "source-map";
    } else {
      config.devtool = false;
    }
  },
};
