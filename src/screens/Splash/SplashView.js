import React, { Component } from "react";
import styles from "./styles";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  ImageBackground,
  ProgressBarAndroid
} from "react-native";
import { observer } from "mobx-react";
import I18n from "../../locales/i18n";

@observer
export default class SplashView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ImageBackground
        source={require("../../assets/images/bg1.png")}
        style={styles.container}
      >
        {/* {this.props.showChooseLanguage ? (
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "300",
                color: "gray",
                fontFamily: "F thin"
              }}
            >
              {I18n.t("pickLang")}
            </Text>
            <TouchableWithoutFeedback
              onPress={() => this.props._changeAppLanguage(0)}
            >
              <ImageBackground
                source={require("../../assets/images/rec1.png")}
                style={styles.cardItem}
              >
                <TouchableWithoutFeedback
                  onPress={() => this.props._changeAppLanguage(0)}
                >
                  <Text style={styles.cardText}>{I18n.t("english")}</Text>
                </TouchableWithoutFeedback>
              </ImageBackground>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => this.props._changeAppLanguage(2)}
            >
              <ImageBackground
                source={require("../../assets/images/rec2.png")}
                style={styles.cardItem}
              >
                <TouchableWithoutFeedback
                  onPress={() => this.props._changeAppLanguage(2)}
                >
                  <Text style={styles.cardText}>{I18n.t("vietnamese")}</Text>
                </TouchableWithoutFeedback>
              </ImageBackground>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => this.props._changeAppLanguage(0)}
            >
              <ImageBackground
                source={require("../../assets/images/rec1.png")}
                style={styles.cardItem}
              >
                <TouchableWithoutFeedback
                  onPress={() => this.props._changeAppLanguage(0)}
                >
                  <Text style={styles.cardText}>{I18n.t("chinese")}</Text>
                </TouchableWithoutFeedback>
              </ImageBackground>
            </TouchableWithoutFeedback>
          </View>
        ) : ( */}
        <ProgressBarAndroid
          styleAttr="Inverse"
          indeterminate={false}
          progress={0.5}
        />
        {/* )} */}
      </ImageBackground>
    );
  }
}
