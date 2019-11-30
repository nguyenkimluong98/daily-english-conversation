import React, { Component } from "react";
import SplashView from "./SplashView";
import { AIBAds } from "../../libs/AIBAds";
import Config from "../../config/env";
import { startActivity } from "../../utils";
import { inject } from "mobx-react/native";
import { observer } from "mobx-react";
import asynStorage from "../../config/asynStorage";
import { observable } from "mobx";
import { showInter } from "../../utils/showIntern";

@inject("store")
@observer
export default class SplashScreen extends Component {
  // @observable
  // showChooseLanguage = false;

  constructor(props) {
    super(props);
    AIBAds.loadAds(Config.app_id, () => {
      showInter(100, () => this._loadData());
    });
  }

  // _changeAppLanguage = index => {
  //   this.props.store._changeAppLanguage(index);
  //   if (this.showChooseLanguage)
  //     this.props.store.setData(asynStorage.APP_LANGUAGE, JSON.stringify(index));

  // };

  _loadData = () => {
    // alert(this.props.store.favoriteIdArray);
    this.props.store.getData(asynStorage.FAVORITE_PHRASE, res => {
      if (res != null) {
        this.props.store.favoriteIdArray = JSON.parse(res);
        // alert(this.props.store.favoriteIdArray);
      }
      startActivity(this.props.navigation, "MenuDrawer");
    });

    // this.props.store.getData(asynStorage.APP_LANGUAGE, res => {
    //   if (res !== null) {
    //     this._changeAppLanguage(res);
    //   } else {
    //     this.showChooseLanguage = true;
    //   }
    // });
  };

  render() {
    return (
      <SplashView
        {...this.props}
        // showChooseLanguage={this.showChooseLanguage}
        // _changeAppLanguage={this._changeAppLanguage}
      />
    );
  }
}
