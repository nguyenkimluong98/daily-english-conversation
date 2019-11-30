import React, { Component } from "react";
import styles from "./styles";
import { View, Image, TouchableOpacity, Text } from "react-native";
import I18n from "../../locales/i18n";

class Toolbar extends Component {
  render() {
    return (
      <View style={styles.toolbar}>
        {this.props.leftCallback ? (
          <TouchableOpacity
            style={styles.toolbar_back}
            onPress={() => this.props.leftCallback()}
          >
            <Image style={styles.toolbar_left_arrow} source={this.props.left} />
          </TouchableOpacity>
        ) : null}

        <Text style={styles.toolbar_title}>
          {this.props.title
            ? this.props.title
            : I18n.t("appName").toUpperCase()}
        </Text>

        {this.props.rightCallback ? (
          <TouchableOpacity
            style={styles.toolbar_right}
            onPress={() => this.props.rightCallback()}
          >
            <Image
              style={styles.toolbar_right_button}
              source={this.props.right}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}
export default Toolbar;
