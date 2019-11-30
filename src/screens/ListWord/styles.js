import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import Constants from "../../constants/Constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  cardWrapper: {
    width: Constants.screen.width * 0.9,
    height: (Constants.screen.width * 0.9 * 244) / 1000,
    marginBottom: 7,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 25,
    paddingRight: 15,
    paddingBottom: 5
  },
  icon: {
    width: 20,
    height: 20
  },
  showInfo: {
    width: "100%",
    height: (Constants.screen.width * 1160) / 1440,
    alignItems: "center"
  },
  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    width: Constants.screen.width
  },
  iconWrapper: {
    width: 40,
    height: 40,
    marginHorizontal: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  textHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    fontFamily: "F black"
  },
  showWordWrapper: {
    width: "65%",
    height: "60%",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 15
  },
  mainWordWrapper: {
    width: "100%",
    height: "95%",
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    borderRadius: 10,
    elevation: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  deco: {
    width: "70%",
    height: "20%",
    borderRadius: 10,
    backgroundColor: "white"
  },
  mainWord: {
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    paddingBottom: 5
  },
  option: {
    width: "95%",
    alignItems: "center",
    justifyContent: "center"
  }
});
