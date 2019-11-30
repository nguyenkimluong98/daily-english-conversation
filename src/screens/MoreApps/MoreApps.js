import React, { Component } from 'react';
import { View } from 'react-native';
import { AIBMoreApps } from '../../libs/AIBAds';
import { goBack } from '../../utils';

class MoreApps extends Component {
  constructor(props) {
    super(props);
  }

  backCallback = () => {
    goBack(this.props.navigation);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AIBMoreApps backCallback={this.backCallback} />
      </View>
    );
  }
}

export default MoreApps;
