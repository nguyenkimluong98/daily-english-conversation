import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  ImageBackground,
  ActivityIndicator
} from "react-native";
import styles from "./styles";

const dataToRenderDetailScreen = ["CON1", "CON2", "CON3", "Idi", "IVe"];

export default class ListWordView extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { sign } = this.props;
    this.checkRenderDetail = dataToRenderDetailScreen.indexOf(sign) >= 0;
  }

  _returnDataToContainer = () => {
    if (this.props.dataCategoryWord.length <= 0) return;
    const { dataCategoryWord, idWordOpening } = this.props;
    let result = null;
    switch (this.props.sign) {
      case "CON1":
      case "CON2":
      case "CON3":
        result = dataCategoryWord[idWordOpening]["properties"].NormalAudio;
        break;
      case "Idi":
        result = dataCategoryWord[idWordOpening]["properties"].name;
        break;
      case "WBA":
      case "WBC":
        result = dataCategoryWord[idWordOpening]["properties"].AudioURL;
        break;
      case "PBA":
      case "PBC":
        result = dataCategoryWord[idWordOpening]["properties"].NormalAudio;
        break;
      case "IVe":
        result = dataCategoryWord[idWordOpening]["properties"].BaseForm;
        break;
      default:
        break;
    }
    return result;
  };

  _receiveTitleFromContainer = item => {
    let result = null;
    switch (this.props.sign) {
      case "CON1":
      case "CON2":
      case "CON3":
        result = item.properties.Title;
        break;
      case "Idi":
        result = item["properties"].name;
        break;
      case "WBA":
      case "WBC":
        result = item["properties"].Word;
        break;
      case "PBA":
      case "PBC":
        result = item["properties"].Phrase;
        break;
      case "IVe":
        result = item["properties"].BaseForm;
        break;
      default:
        break;
    }
    return result;
  };

  _renderWordItem = (item, index) => {
    const check = this.props.idWordOpening == index;
    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.callBack("CHANGE_ID_CARD", index)}
      >
        <ImageBackground
          style={styles.cardWrapper}
          source={
            check
              ? require("../../assets/images/rec2.png")
              : require("../../assets/images/rec1.png")
          }
        >
          <TouchableWithoutFeedback
            onPress={() => this.props.callBack("CHANGE_ID_CARD", index)}
          >
            <View style={{ width: "80%" }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "black",
                  fontFamily: "F black"
                }}
              >
                {this._receiveTitleFromContainer(item)}
              </Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              this.props.callBack("FAVORITE_PHRASE", index);
            }}
          >
            <View
              style={{
                width: "20%",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                style={{ width: 30, height: 30 }}
                source={
                  item["properties"]["Favorite"] == null
                    ? require("../../assets/images/emty_star.png")
                    : require("../../assets/images/star.png")
                }
              />
            </View>
          </TouchableWithoutFeedback>
        </ImageBackground>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const { idWordOpening, dataCategoryWord, loadedSound } = this.props;
    const isFavoriteCategory = false;
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.showInfo}
          source={
            isFavoriteCategory
              ? require("../../assets/images/rec4.png")
              : require("../../assets/images/rec3.png")
          }
        >
          <View
            style={[styles.headerWrapper, { justifyContent: "space-between" }]}
          >
            <TouchableWithoutFeedback
              onPress={() => this.props.callBack("GO_BACK")}
            >
              <View style={styles.iconWrapper}>
                <Image
                  style={{ width: 20, height: (20 * 80) / 92 }}
                  source={require("../../assets/images/back.png")}
                />
              </View>
            </TouchableWithoutFeedback>
            <Text style={styles.textHeader}>{this.props.headerName}</Text>
            {this.checkRenderDetail ? (
              <TouchableWithoutFeedback
                onPress={() =>
                  this.props.callBack(
                    "GO_TO_DETAIL_SCREEN",
                    dataCategoryWord[idWordOpening].properties
                  )
                }
              >
                <View style={styles.iconWrapper}>
                  <Image
                    style={{ width: 25, height: 25 }}
                    source={require("../../assets/images/ic_exam.png")}
                  />
                </View>
              </TouchableWithoutFeedback>
            ) : (
              <View style={{ width: 20, height: (20 * 80) / 92 }} />
            )}
          </View>

          <TouchableWithoutFeedback
            onPress={() =>
              this.props.callBack("PLAY_SOUND", this._returnDataToContainer())
            }
          >
            <View style={styles.showWordWrapper}>
              <View style={styles.mainWordWrapper}>
                <View style={styles.mainWord}>
                  <Text
                    style={{
                      color: "black",
                      fontSize: 18,
                      fontWeight: "bold",
                      fontFamily: "F black",
                      marginBottom: 10,
                      textAlign: "center"
                    }}
                  >
                    {dataCategoryWord.length > 0
                      ? this._receiveTitleFromContainer(
                          dataCategoryWord[idWordOpening]
                        )
                      : ""}
                  </Text>
                </View>
                <View style={styles.option}>
                  <Image
                    source={require("../../assets/images/play.png")}
                    style={{ width: 25, height: 25 }}
                  />
                </View>
                {loadedSound ? null : (
                  <ActivityIndicator
                    size="large"
                    style={{ position: "absolute", right: 15, bottom: 15 }}
                    color="#0000ff"
                  />
                )}
              </View>
              <View style={styles.deco} />
            </View>
          </TouchableWithoutFeedback>
        </ImageBackground>

        <View style={{ flex: 1, alignItems: "center" }}>
          <FlatList
            data={dataCategoryWord}
            renderItem={({ item, index }) => this._renderWordItem(item, index)}
            keyExtractor={({ index }) => index + ""}
            showsVerticalScrollIndicator={false}
            extraData={this.props.reloadFavorite}
          />
        </View>
      </View>
    );
  }
}
