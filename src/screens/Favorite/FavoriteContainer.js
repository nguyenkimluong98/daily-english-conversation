import React, { Component } from "react";
import FavoriteView from "./FavoriteView";
import { startActivityForResult, rateApp, goBack } from "../../utils";
import { inject, observer } from "mobx-react";
import menuData from "../../assets/data/menu";

@inject("store")
@observer
export default class FavoriteScreen extends Component {
  constructor(props) {
    super(props);
    this.myMenu = menuData;
  }

  callBack = (key, data) => {
    switch (key) {
      case "GO_TO_LISTWORD_SCREEN":
        if (data.sign == "PBC" || data.sign == "WBC") {
          startActivityForResult(this.props.navigation, "Category", data);
        } else startActivityForResult(this.props.navigation, "ListWord", data);
        break;
      case "GO_BACK":
        goBack(this.props.navigation);
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <FavoriteView
        {...this.props}
        myMenu={this.myMenu}
        callBack={this.callBack}
      />
    );
  }
}
