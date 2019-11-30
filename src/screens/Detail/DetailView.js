import React, { Component } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  ActivityIndicator
} from "react-native";
import styles from "./styles";
import { observer } from "mobx-react";
import FS from "react-native-fs";

@observer
export default class DetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversationText: ""
    };
    this.listenNumber = 0;
  }

  _returnIdiomlis = () => {
    const { name, desc, example } = this.props.dataParams;
    return (
      <ScrollView style={{ padding: 10, flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15
          }}
        >
          <View style={{ width: 100 }}>
            <Text style={styles.title}>Name: </Text>
          </View>
          <Text style={styles.detail}>{name}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15
          }}
        >
          <View style={{ width: 100 }}>
            <Text style={styles.title}>Description: </Text>
          </View>
          <Text style={styles.detail}>{desc}</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ width: 100 }}>
            <Text style={styles.title}>Example: </Text>
          </View>
          <Text style={styles.detail}>{example}</Text>
        </View>
      </ScrollView>
    );
  };

  _returnIverbs = () => {
    const {
      BaseForm,
      PastSimple,
      PastPart,
      Person3rd,
      Gerund,
      Definition
    } = this.props.dataParams;
    return (
      <ScrollView style={{ padding: 10, flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15
          }}
        >
          <View style={{ width: 100 }}>
            <Text style={styles.title}> BaseForm: </Text>
          </View>
          <Text style={styles.detail}>{BaseForm}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15
          }}
        >
          <View style={{ width: 100 }}>
            <Text style={styles.title}>PastSimple: </Text>
          </View>
          <Text style={styles.detail}>{PastSimple}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15
          }}
        >
          <View style={{ width: 100 }}>
            <Text style={styles.title}>PastPart: </Text>
          </View>
          <Text style={styles.detail}>{PastPart}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15
          }}
        >
          <View style={{ width: 100 }}>
            <Text style={styles.title}>Person3rd: </Text>
          </View>
          <Text style={styles.detail}>{Person3rd}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15
          }}
        >
          <View style={{ width: 100 }}>
            <Text style={styles.title}>Gerund: </Text>
          </View>
          <Text style={styles.detail}>{Gerund}</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ width: 100 }}>
            <Text style={styles.title}>Definition: </Text>
          </View>
          <Text style={styles.detail}>{Definition}</Text>
        </View>
      </ScrollView>
    );
  };

  _returnConversations = () => {
    let fileName =
      this.props.dataParams._id < 10
        ? `0${this.props.dataParams._id}.txt`
        : `${this.props.dataParams._id}.txt`;
    FS.readFileAssets("conversations/" + fileName, "utf8")
      .then(text => {
        this.setState({ conversationText: text });
      })
      .catch(() => {
        alert("Can not load conversation...");
      });

    let checkListen_1 = this.props.playingSound && this.listenNumber == 1;
    let checkListen_2 = this.props.playingSound && this.listenNumber == 2;

    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            marginVertical: 15
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              this.listenNumber = 1;
              this.props.callBack("PLAY_SOUND", { type: 1 });
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "40%",
                height: 40
              }}
            >
              <Image
                source={
                  checkListen_1
                    ? require("../../assets/images/listen_focus.png")
                    : require("../../assets/images/listen.png")
                }
                style={{ width: 20, height: 20, marginRight: 15 }}
              />
              <Text>Slow</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              this.listenNumber = 2;
              this.props.callBack("PLAY_SOUND", { type: 2 });
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "40%",
                height: 40
              }}
            >
              <Image
                source={
                  checkListen_2
                    ? require("../../assets/images/listen_focus.png")
                    : require("../../assets/images/listen.png")
                }
                style={{ width: 20, height: 20, marginRight: 15 }}
              />
              <Text>Normal</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{ width: "100%", alignItems: "center", marginBottom: 15 }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500", color: "black" }}>
              {this.props.dataParams.Title}
            </Text>
          </View>
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "300", color: "gray" }}>
              {this.state.conversationText}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  };

  _returnView = () => {
    switch (this.props.dataParams.sign) {
      case "CON1":
      case "CON2":
      case "CON3":
        return this._returnConversations();
        break;
      case "Idi":
        return this._returnIdiomlis();
        break;
      case "IVe":
        return this._returnIverbs();
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <View style={styles.container}>
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
          <Text style={styles.textHeader}>{"Details"}</Text>
          <View
            style={{
              width: 20,
              height: (20 * 80) / 92
            }}
          />
        </View>
        {this.props.loadedSound ? null : (
          <ActivityIndicator
            size="large"
            style={{ position: "absolute", top: 15, right: 15 }}
            color="orange"
          />
        )}

        {this._returnView()}
      </View>
    );
  }
}
