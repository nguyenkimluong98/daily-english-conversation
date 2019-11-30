import React, { Component } from "react";
import DetailView from "./DetailView";
import { goBack, getParamData } from "../../utils";
import Sound from "react-native-sound";
import { observer } from "mobx-react";
import { observable } from "mobx";

@observer
export default class DetailScreen extends Component {
  @observable
  loadedSound = true;

  @observable
  playingSound = false;

  constructor(props) {
    super(props);
    Sound.setCategory("Playback");
    this.dataParams = null;
    this.sound = null;
    this.conversationText = "";
  }

  componentWillMount() {
    // lay ra sign va info cua item duoc pass sang
    this.dataParams = getParamData(this.props.navigation);
  }

  componentWillUnmount() {
    if (this.sound) {
      this.sound.stop();
    }
  }

  _callBack = (key, data) => {
    switch (key) {
      case "GO_BACK":
        goBack(this.props.navigation);
        break;
      case "PLAY_SOUND":
        // type data type: 1 - slow | 2 - normal
        if (data.type == 1) {
          this._playSound(this.dataParams.SlowAudio);
        } else if (data.type == 2) {
          this._playSound(this.dataParams.NormalAudio);
        }

        break;

      default:
        break;
    }
  };

  render() {
    return (
      <DetailView
        {...this.props}
        dataParams={this.dataParams}
        callBack={this._callBack}
        loadedSound={this.loadedSound}
        playingSound={this.playingSound}
      />
    );
  }

  _getConversationData = () => {};

  _playSound = url => {
    if (this.sound != null) {
      if (this.sound.isPlaying) {
        this.sound.stop();
      }
    }

    this.loadedSound = false;
    this.sound = new Sound(url, Sound.MAIN_BUNDLE, error => {
      if (error) {
        alert(
          "Cannot loading sound! Please check your network or try again later..."
        );
      } else {
        this.loadedSound = true;
        this.playingSound = true;
        this.sound.play(() => {
          setTimeout(
            () => (this.playingSound = false),
            this.sound.getDuration()
          );
          this.sound.release();
        });
      }
    });
  };
}
