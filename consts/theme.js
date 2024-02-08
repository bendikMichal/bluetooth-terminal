
import { StyleSheet } from "react-native";
import { _retrieveData, _storeData } from "../utils/asyncStorage";
import { sidebarW, sidebarLayer, rootLayer } from "./constants";

export const darkTheme = "dark";
export const lighTheme = "green";
export let theme = darkTheme;


const colors = {
  light: {
    bg: "#fff",
    text: "#2f0f0f",
    title: "#2f0f0f",
    fg: "#efdfdf",
    accent: "#ddd0d0",
    secondary: "#e0bfbf"
  },
  brown: {
    bg: "#EAF9D9",
    text: "#653239",
    title: "#653239",
    fg: "#E2D4BA",
    accent: "#CCC7B9",
    secondary: "#AF7A6D"
  },
  green: {
    bg: "#efefef",
    // text: "#3B0D11",
    text: "#493657",
    title: "#493657",
    fg: "#BEE5BF",
    accent: "#9DC7C8",
    secondary: "#DFF3E3"
  },
  dark: {
    bg: "#493657",
    // text: "#3B0D11",
    text: "#efefef",
    title: "#BEE5BF",
    fg: "#392647",
    accent: "#9DC7C8",
    secondary: "#291637"
  }

}


export const setTheme = async (_theme) => {
  await _storeData("theme", _theme);
  await initTheme();
}

export const getColor = (name) => colors[theme][name];

const getStyles = () => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: getColor("bg"),
  },

  wrapMenu: {
    borderRadius: 10,
    marginTop: 12,
    justifyContent: "left",
    flexDirection: "row",
  },

  activeDot: {
    backgroundColor: getColor("text"),
    width: 4,
    marginRight: 4,
    height: 24,
    borderRadius: 8,

    alignSelf: "center"
  },

  menuItem: {
    padding: 8,
    margin: 4,
    marginRight: 0,
    marginLeft: "auto",
    marginRight: "auto",
    width: "89%",
    height: "auto",
    borderRadius: 0,
    // justifyContent: "space-around",
    justifyContent: "left",
    // justifyContent: "center"
  },

  text: {
    color: getColor("text"),
    fontSize: 18,
    fontWeight: "500",
    textAlignVertical: 'center',
    marginLeft: 16
  },

  viewStyle: {
    backgroundColor: getColor("fg"),
    padding: 4,
    paddingTop: 32,
    position: "absolute",
    top: 0,
    width: "100%",
    minHeight: 64,
    // alignItems: "left",
    justifyContent: "left",
    flexDirection: "row"
  },

  title: {
    // monospace, serif
    fontFamily: "Roboto",
    fontSize: 20,
    color: getColor("title"),
    fontWeight: "bold",
    textAlignVertical: 'center'
  },

  sidebar: {
    backgroundColor: getColor("secondary"),
    position: "absolute",
    top: 91,
    left: 0,
    width: sidebarW,
    height: "100%",
    zIndex: sidebarLayer,
    padding: 4,
    paddingTop: 32,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    borderWidth: 2,
    borderLeftWidth: 0,
    borderColor: getColor("text")
  },

  settingsItem: {
    padding: 8,
    marginRight: 0,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    height: "auto",
    borderRadius: 0,
    justifyContent: "space-around",
  },
});

export let styles = getStyles();

const initTheme = async () => {
  theme = await _retrieveData("theme", darkTheme);
  styles= getStyles();
}

initTheme();