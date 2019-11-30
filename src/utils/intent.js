import { StackActions, NavigationActions } from "react-navigation";

export function startActivityForResult(navigation, screen, data, callback) {
  navigation.navigate(screen, {
    data,
    callback
  });
}

export function startActivity(navigation, screen) {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: screen })]
  });
  navigation.dispatch(resetAction);
}

export function goBack(navigation, key = "", data = {}) {
  if (navigation.state.params.callback != null) {
    navigation.state.params.callback(key, data);
  }
  navigation.goBack();
}

export const getParamData = navigation => {
  return navigation.getParam("data");
};
