import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import ExitView from './ExitView';

import { goBack } from '../../utils';

export default class ExitScreen extends Component {
  constructor(props) {
    super(props);
  }

  _exitApp = () => {
    BackHandler.exitApp();
  };

  _goBack = () => {
    goBack(this.props.navigation);
  };

  render() {
    return <ExitView {...this.props} exitApp={this._exitApp} goBack={this._goBack} />;
  }
}
