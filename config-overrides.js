const {
  override,
  addLessLoader,
  fixBabelImports,
  addDecoratorsLegacy
} = require("customize-cra");
//自定义主题
const theme = require("./theme");

module.exports = override(
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: theme
  }),
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  //高阶组件装饰器配置
  addDecoratorsLegacy()
);
