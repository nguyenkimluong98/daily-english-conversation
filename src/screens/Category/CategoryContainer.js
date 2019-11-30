import React, { Component } from "react";
import CategoryView from "./CategoryView";
import Categories from "../../assets/data/Categories";
import { goBack, getParamData, startActivityForResult } from "../../utils";

export default class CategoryScreen extends Component {
  constructor(props) {
    super(props);
    this.dataCategory = Categories.features;
  }

  render() {
    return (
      <CategoryView
        {...this.props}
        dataCategory={this.dataCategory}
        callBack={this.callBack}
      />
    );
  }

  callBack = (key, data) => {
    switch (key) {
      case "GO_TO_LISTWORD_SCREEN":
        startActivityForResult(this.props.navigation, "ListWord", {
          ...data,
          sign: getParamData(this.props.navigation).sign,
          headerName: data.CatName
        });
        break;
      case "GO_BACK":
        goBack(this.props.navigation);
        break;
      default:
        break;
    }
  };
}
