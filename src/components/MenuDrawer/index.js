import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  TouchableWithoutFeedback
} from "react-native";
import styles from "./styles";
import { startActivityForResult, rateApp } from "../../utils";
import { DrawerActions } from "react-navigation";
import { inject } from "mobx-react";

@inject("store")
export default class index extends Component {
  render() {
    return (
      <ImageBackground
        source={require("../../assets/images/menu_drawer.png")}
        style={styles.container}
      >
        <View style={styles.wrapper}>
          <TouchableWithoutFeedback
            onPress={() =>
              startActivityForResult(this.props.navigation, "Favorite", {
                headerName: "Favorites",
                sign: "fav"
              })
            }
          >
            <ImageBackground
              style={styles.cardItem}
              source={require("../../assets/images/favorite.png")}
            >
              <TouchableWithoutFeedback
                onPress={() =>
                  startActivityForResult(this.props.navigation, "Favorite", {
                    headerName: "Favorites",
                    sign: "fav"
                  })
                }
              >
                <Text style={styles.textStyle}>{"Favorites"}</Text>
              </TouchableWithoutFeedback>
            </ImageBackground>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              this.props.navigation.dispatch(DrawerActions.closeDrawer());
              rateApp();
            }}
          >
            <ImageBackground
              style={styles.cardItem}
              source={require("../../assets/images/rate.png")}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  this.props.navigation.dispatch(DrawerActions.closeDrawer());
                  rateApp();
                }}
              >
                <Text style={styles.textStyle}>{"Rate App"}</Text>
              </TouchableWithoutFeedback>
            </ImageBackground>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback>
            <ImageBackground
              style={styles.cardItem}
              source={require("../../assets/images/share.png")}
            >
              <TouchableWithoutFeedback>
                <Text style={styles.textStyle}>{"Share"}</Text>
              </TouchableWithoutFeedback>
            </ImageBackground>
          </TouchableWithoutFeedback>
        </View>
      </ImageBackground>
    );
  }
}
