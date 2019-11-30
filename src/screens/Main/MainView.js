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
export default class MainView extends Component {
  constructor(props) {
    super(props);
  }

  _renderCategoryWord = (item, index) => {
    // if (index == 0 && this.props.textSearch == "") return null;
    return (
      <TouchableWithoutFeedback
        // gui sang 1 categoryID
        onPress={() =>
          this.props.callBack("GO_TO_LISTWORD_SCREEN", {
            headerName: item.name,
            sign: item.sign,
            isFavorited: false
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
        <View style={styles.searchBarWrapper}>
          <TouchableWithoutFeedback
            style={{
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center"
            }}
            onPress={() => this.props.callBack("OPEN_MENU")}
          >
            <Image
              style={{ width: 30, height: (30 * 108) / 124 }}
              source={require("../../assets/images/menu.png")}
            />
          </TouchableWithoutFeedback>
          <ImageBackground
            style={styles.searchBar}
            source={require("../../assets/images/search.png")}
          >
            <TextInput
              underlineColorAndroid={"transparent"}
              autoCorrect={false}
              placeholder={language[this.props.store.appLanguage]["search"]}
              onChangeText={text => this.props.callBack("CHANGE_TEXT", text)}
              placeholderTextColor={"black"}
              style={{ flex: 1, paddingLeft: 15 }}
            />
          </ImageBackground>
        </View>
        <FlatList
          style={{ flex: 1 }}
          data={this.props.myMenu}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) =>
            this._renderCategoryWord(item, index)
          }
          extraData={this.props.textSearch}
          keyExtractor={({ index }) => index + ""}
        />
      </ImageBackground>
    );
  }
}
