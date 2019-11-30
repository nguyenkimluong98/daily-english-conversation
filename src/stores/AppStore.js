import { observable, action } from "mobx";
import { AsyncStorage } from "react-native";
import asynStorage from "../config/asynStorage";

const typeCategory = ["english", "chinese", "vietnamese"];
class AppStore {
  @observable
  appLanguage = "english";

  @observable
  favoriteIdArray = {
    conversations: [],
    idioms: [],
    phrases: [],
    verbs: [],
    words: []
  };

  @observable
  shownRate = false;

  @action
  _handleFavoriteId = (id, category, key = "add") => {
    if (key == "add") {
      this.favoriteIdArray[category].push(id);
    } else {
      let index = this.favoriteIdArray[category].indexOf(id);
      if (index > -1) {
        this.favoriteIdArray[category].splice(index, 1);
      }
    }

    this.setData(
      asynStorage.FAVORITE_PHRASE,
      JSON.stringify(this.favoriteIdArray)
    );
  };

  @action
  setData(key, data) {
    AsyncStorage.setItem(key, data).then();
  }
  @action
  getData(key, callBack) {
    AsyncStorage.getItem(key).then(res => {
      callBack(res);
    });
  }

  @action
  _changeAppLanguage = index => (this.appLanguage = typeCategory[index]);
}
export default new AppStore();
