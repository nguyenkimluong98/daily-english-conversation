module.exports = {
  get AIBEmptyView() {
    return require("./EmptyView").default;
  },
  get AIBToolbar() {
    return require("./Toolbar").default;
  },
  get AIBStatusBar() {
    return require("./StatusBar").default;
  },
  get MyMenuDrawer() {
    return require("./MenuDrawer").default;
  }
};
