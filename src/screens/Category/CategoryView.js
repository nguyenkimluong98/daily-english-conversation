import React, { Component } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  FlatList,
  TouchableNativeFeedback
} from "react-native";
import styles from "./styles";
import Colors from "../../constants/Colors";

export default class CategoryView extends Component {
  _renderCategoryItem = (item, index) => {
    return (
      <TouchableWithoutFeedback
        // gui sang 1 categoryID
        onPress={() =>
          this.props.callBack("GO_TO_LISTWORD_SCREEN", item.properties)
        }
        // background={TouchableNativeFeedback.Ripple(Colors.colorPrimary, true)}
        // useForeground={TouchableNativeFeedback.canUseNativeForeground()}
      >
        <View>
          <ImageBackground
            source={require("../../assets/images/accommodation.png")}
            style={[styles.categoryWrapper]}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "300",
                color: "black",
                fontFamily: "F black",
                marginLeft: 40
              }}
            >
              {item.properties.CatName}
            </Text>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    return (
      <ImageBackground
        source={require("../../assets/images/bg2.png")}
        style={styles.container}
      >
        <View style={[styles.headerWrapper]}>
          <TouchableWithoutFeedback
            onPress={() => this.props.callBack("GO_BACK")}
          >
            <View style={styles.iconWrapper}>
              <Image
                style={{
                  width: 20,
                  height: (20 * 80) / 92,
                  tintColor: "orange"
                }}
                source={require("../../assets/images/back.png")}
              />
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.textHeader}>{"Categories"}</Text>
          <View
            style={{
              width: 20,
              height: (20 * 80) / 92,
              tintColor: "orange"
            }}
          />
        </View>

        <View style={{ flex: 1, alignItems: "center" }}>
          <FlatList
            data={this.props.dataCategory}
            renderItem={({ item, index }) =>
              this._renderCategoryItem(item, index)
            }
            keyExtractor={({ index }) => index + ""}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ImageBackground>
    );
  }
}
