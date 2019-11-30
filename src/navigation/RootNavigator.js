import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import Colors from "../constants/Colors";
import { MyMenuDrawer } from "../components/index";
import SplashScreen from "../screens/Splash/SplashContainer";
import MainScreen from "../screens/Main/MainContainer";
import MoreAppsScreen from "../screens/MoreApps/MoreApps";
import ListWordScreen from "../screens/ListWord/ListWordContainer";
import CategoryScreen from "../screens/Category/CategoryContainer";
import DetailScreen from "../screens/Detail/DetailContainer";
import FavoriteScreen from "../screens/Favorite/FavoriteContainer";

const MenuDrawer = createDrawerNavigator(
  {
    MainScreen: {
      screen: MainScreen
    }
  },
  {
    initialRouteName: "MainScreen",
    contentComponent: MyMenuDrawer
  }
);

const RootNavigator = createStackNavigator(
  {
    SplashScreen: {
      screen: SplashScreen
    },
    MenuDrawer: {
      screen: MenuDrawer
    },
    Favorite: {
      screen: FavoriteScreen
    },
    ListWord: {
      screen: ListWordScreen
    },
    MoreAppsScreen: {
      screen: MoreAppsScreen
    },
    Category: {
      screen: CategoryScreen
    },
    Detail: {
      screen: DetailScreen
    }
  },
  {
    headerMode: "none",
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: "normal",
        color: "white"
      },
      headerStyle: {
        backgroundColor: Colors.colorPrimary
      }
    })
  }
);

export default RootNavigator;
