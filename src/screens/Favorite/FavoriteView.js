import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableNativeFeedback,
  ImageBackground,
  TouchableWithoutFeedback,
  TextInput
} from "react-native";
import styles from "./styles";
import Colors from "../../constants/Colors";
import { observer } from "mobx-react";
import language from "../../assets/data/language";

@observer
export default class FavoriteView extends Component {
  constructor(props) {
    super(props);
  }

  _renderCategoryWord = (item, index) => {
    // if (index == 0 && this.props.textSearch == "") return null;
    if (item.id == 7 || item.id == 9) return;
    return (
      <TouchableWithoutFeedback
        // gui sang 1 categoryID
        onPress={() =>
          this.props.callBack("GO_TO_LISTWORD_SCREEN", {
            headerName: item.name,
            sign: item.sign,
            isFavorited: true
          })
        }
        // background={TouchableNativeFeedback.Ripple(Colors.colorPrimary, true)}
        // useForeground={TouchableNativeFeedback.canUseNativeForeground()}
      >
        <View>
          <ImageBackground source={item.img} style={[styles.categoryWrapper]}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "300",
                color: "black",
                fontFamily: "F black",
                marginLeft: 40
              }}
            >
              {item.name}
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
          <Text style={styles.textHeader}>{"Favorites"}</Text>
          <View
            style={{
              width: 20,
              height: (20 * 80) / 92
            }}
          />
        </View>
        <FlatList
          style={{ flex: 1 }}
          data={this.props.myMenu}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) =>
            this._renderCategoryWord(item, index)
          }
          keyExtractor={({ index }) => index + ""}
        />
      </ImageBackground>
    );
  }
}
