import React, { Component } from "react";
import MainView from "./MainView";
import { startActivityForResult, rateApp } from "../../utils";
import { inject, observer } from "mobx-react";
import { DrawerActions } from "react-navigation";
import { observable } from "mobx";
import menuData from "../../assets/data/menu";

@inject("store")
@observer
export default class MainScreen extends Component {
  @observable
  textSearch = "";

  constructor(props) {
    super(props);
    this.myMenu = menuData;
  }

  componentDidMount() {
    if (!this.props.store.shownRate) {
      rateApp();
      this.props.store.shownRate = true;
    }
  }

  callBack = (key, data) => {
    switch (key) {
      case "CHANGE_TEXT":
        this.textSearch = data;
        if (this.textSearch != "") {
          this.myMenu = [];
          menuData.map(e => {
            if (
              e[this.props.store.appLanguage]
                .toLowerCase()
                .indexOf(this.textSearch.toLowerCase().trim()) > -1
            ) {
              this.myMenu.push(e);
            }
          });
        } else {
          this.myMenu = menuData;
        }

        break;
      case "GO_TO_LISTWORD_SCREEN":
        if (data.sign == "PBC" || data.sign == "WBC") {
          startActivityForResult(this.props.navigation, "Category", data);
        } else startActivityForResult(this.props.navigation, "ListWord", data);
        break;
      case "OPEN_MENU":
        this.props.navigation.dispatch(DrawerActions.openDrawer());
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <MainView
        {...this.props}
        myMenu={this.myMenu}
        callBack={this.callBack}
        textSearch={this.textSearch}
      />
    );
  }
}
