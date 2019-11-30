import React, { Component } from "react";
import { View } from "react-native";
import ListWordView from "./ListWordView";
import { getParamData, goBack, startActivityForResult } from "../../utils";
import { inject, observer } from "mobx-react";
import { observable } from "mobx";
import Converstations from "../../assets/data/Conversations";
import Idiomlist from "../../assets/data/Idiomlist";
import IVerbsFull from "../../assets/data/IVerbsFull";
import Phrases from "../../assets/data/Phrases";
import Words from "../../assets/data/Words";
import { AIBBanner } from "../../libs/AIBAds";
import Sound from "react-native-sound";
import Tts from "react-native-tts";

@inject("store")
@observer
export default class ListWordScreen extends Component {
  @observable
  dataCategoryWord = [];

  @observable
  idWordOpening = 0;

  @observable
  reloadFavorite = 0;

  @observable
  loadedSound = true;

  constructor(props) {
    super(props);
    let data = getParamData(this.props.navigation);
    this.headerName = data.headerName;
    this.menuSign = data.sign;
    this.isFavorited = data.isFavorited;
    Sound.setCategory("Playback");
    Tts.setDefaultLanguage("en-US");
    Tts.setDefaultVoice("com.apple.ttsbundle.Moira-compact");
    Tts.setDefaultRate(0.45);
  }

  componentWillMount() {
    // fav -> favorites
    // if (this.menuSign == 'fav') {
    //   this.props.store.favoriteIdArray.map(e => {
    //     this.dataCategoryWord.push(phraseData[e - 1]);
    //   });
    // } else {
    //   this.dataCategoryWord = phraseData.filter(
    //     e => e.category_id == this.categoryID
    //   );
    // }

    // if (this.dataCategoryWord.length > 0) {
    //   this.dataCategoryWord.map(e => {
    //     if (this.props.store.favoriteIdArray.indexOf(e._id) > -1) {
    //       e.favorite = 1;
    //     }
    //   });
    // }

    this.dataCategoryWord = this._getDataBySign();
  }

  // danh dau cac tu duoc yeu thich sau do filter theo level
  _getDataFavorited = (totalData, categoryToFavorite) => {
    // chi tim nhung item da danh dau favorite
    let data = [];
    if (this.isFavorited) {
      this.props.store.favoriteIdArray[categoryToFavorite].map(e => {
        data.push(totalData[e - 1]);
      });
    } else {
      data = totalData;
    }

    if (data.length > 0) {
      data.map(e => {
        if (
          this.props.store.favoriteIdArray[categoryToFavorite].indexOf(
            e["properties"]._id
          ) > -1
        ) {
          e["properties"]["Favorite"] = 1;
        } else e["properties"]["Favorite"] = null;
      });
    }

    return data;
  };

  _getDataBySign = () => {
    let data = null;
    let categoryToFavorite = this._returnCategoryToFavorite();
    let allDataConversation = Converstations.features;
    switch (this.menuSign) {
      case "CON1":
        data = this._getDataFavorited(
          allDataConversation,
          categoryToFavorite
        ).filter(e => e.properties.Level == 1);
        this.type = 1;
        break;
      case "CON2":
        data = data = this._getDataFavorited(
          allDataConversation,
          categoryToFavorite
        ).filter(e => e.properties.Level == 2);
        this.type = 1;
        break;
      case "CON3":
        data = data = this._getDataFavorited(
          allDataConversation,
          categoryToFavorite
        ).filter(e => e.properties.Level == 3);
        this.type = 1;
        break;
      case "Idi":
        let totalIdioms = Idiomlist.features;
        totalIdioms.map((e, i) => (e.properties._id = i + 1));
        // alert(JSON.stringify(totalIdioms));
        data = this._getDataFavorited(totalIdioms, categoryToFavorite);
        this.type = 2;
        break;
      case "WBA":
        let totalWords1 = Words.features;
        totalWords1.map((e, i) => (e["properties"]["_id"] = i + 1));
        data = this._getDataFavorited(totalWords1, categoryToFavorite);
        this.type = 1;
        break;
      case "PBA":
        let totalPhrases = Phrases.features;
        totalPhrases.map((e, i) => (e["properties"]["_id"] = i + 1));
        data = this._getDataFavorited(totalPhrases, categoryToFavorite);
        this.type = 1;
        break;
      case "WBC":
        let totalWords = Words.features;
        totalWords.map((e, i) => (e["properties"]["_id"] = i + 1));
        data = this._getDataFavorited(totalWords, categoryToFavorite).filter(
          e => e.properties.CatID == getParamData(this.props.navigation).CatID
        );
        this.type = 1;
        break;
      case "PBC":
        let totalPhrases1 = Phrases.features;
        totalPhrases1.map((e, i) => (e["properties"]["_id"] = i + 1));
        data = this._getDataFavorited(totalPhrases1, categoryToFavorite).filter(
          e => e.properties.CatID == getParamData(this.props.navigation).CatID
        );
        this.type = 1;
        break;
      case "IVe":
        let totalIVerbs = IVerbsFull.features;
        totalIVerbs.map((e, i) => {
          e["properties"]["_id"] = i + 1;
          e["properties"]["Favorite"] = null;
        });
        data = this._getDataFavorited(totalIVerbs, categoryToFavorite);
        this.type = 2;
        break;
      default:
        break;
    }

    return data;
  };

  // xac dinh ten array da luu data
  _returnCategoryToFavorite = () => {
    let categoryToFavorite = "";
    switch (this.menuSign) {
      case "CON1":
      case "CON2":
      case "CON3":
        categoryToFavorite = "conversations";
        break;
      case "Idi":
        categoryToFavorite = "idioms";
        break;
      case "WBC":
      case "WBA":
        categoryToFavorite = "words";
        break;
      case "PBC":
      case "PBA":
        categoryToFavorite = "phrases";
        break;
      case "IVe":
        categoryToFavorite = "verbs";
        break;
    }

    return categoryToFavorite;
  };

  _playSound = data => {
    // nhan data voi type 1: conversation | type 2: word
    if (this.dataCategoryWord.length <= 0) return;
    if (this.type == 1) {
      if (this.sound != undefined) {
        if (this.sound.isPlaying) {
          this.sound.stop();
        }
      }

      this.loadedSound = false;
      this.sound = new Sound(data, Sound.MAIN_BUNDLE, error => {
        if (error) {
          alert(
            "Cannot loading sound! Please check your network or try again later..."
          );
        } else {
          this.loadedSound = true;
          this.sound.play(() => {
            this.sound.release();
          });
        }
      });
    } else if (this.type == 2) {
      Tts.speak(data);
    }
    // alert("Phát nhạc nè^^");
  };

  callBack = (key, data = null) => {
    switch (key) {
      case "GO_BACK":
        goBack(this.props.navigation);
        break;

      case "CHANGE_ID_CARD":
        this.reloadFavorite++;
        if (this.idWordOpening != data) {
          this.idWordOpening = data;
        }

        break;

      case "PLAY_SOUND":
        this._playSound(data);
        break;

      case "GO_TO_DETAIL_SCREEN":
        if (this.dataCategoryWord.length <= 0) return;
        // chi conversation, idiom va iverb moi duoc chuyen den DetailScreen
        //gui sang info cua item duoc click va chu ki cua category hien tai
        startActivityForResult(this.props.navigation, "Detail", {
          ...data,
          sign: this.menuSign
        });
        break;

      case "FAVORITE_PHRASE":
        // nhan index tu view truyen sang
        // xac dinh xem tu` yeu thich se duoc them vao array nao
        let categoryToFavorite = this._returnCategoryToFavorite();

        this.reloadFavorite++;
        let item = this.dataCategoryWord[data];
        if (item["properties"]["Favorite"] == null) {
          this.props.store._handleFavoriteId(
            item["properties"]._id,
            categoryToFavorite,
            "add"
          );
          this.dataCategoryWord[data]["properties"]["Favorite"] = 1;
        } else {
          this.props.store._handleFavoriteId(
            item["properties"]._id,
            categoryToFavorite,
            "remove"
          );
          this.dataCategoryWord[data]["properties"]["Favorite"] = null;
        }
        break;
      default:
        break;
    }
  };

  componentWillUnmount() {
    if (this.sound != undefined) {
      if (this.sound.isPlaying) {
        this.sound.stop();
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ListWordView
          {...this.props}
          callBack={this.callBack}
          headerName={this.headerName}
          dataCategoryWord={this.dataCategoryWord}
          idWordOpening={this.idWordOpening}
          reloadFavorite={this.reloadFavorite}
          loadedSound={this.loadedSound}
          sign={this.menuSign}
        />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <AIBBanner />
        </View>
      </View>
    );
  }
}
