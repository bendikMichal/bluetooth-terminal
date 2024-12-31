
import { StyleSheet } from "react-native";
import { _retrieveData, _storeData } from "../utils/asyncStorage";
import { sidebarW, sidebarLayer, rootLayer } from "./constants";

export const darkTheme = "trueDark";
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
  },
  trueDark: {
    bg: "#121212",
    // text: "#3B0D11",
    text: "#dfdfdf",
    title: "#dfdfdf",
    fg: "#000",
    accent: "#5b79fa",
    secondary: "#111"
  },
  modern: {
    bg: "#323d60",
    text: "#fcfbff",
    title: "#fcfbff",
    // fg: "#3c486d",
    fg: "#252f4b",
    accent: "#333",
    secondary: "#3c486d",
    border: "#323d60"
    // border: "#fff"

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
    // backgroundColor: getColor("text"),
    backgroundColor: getColor("accent"),
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
    borderBottomWidth: 1,
    borderColor: "#cfcfcf2c",
    // justifyContent: "space-around",
    justifyContent: "left",
    // justifyContent: "center"
  },

  smallButton: {
    padding: 8,
    margin: 4,
    marginRight: 0,
    marginLeft: "auto",
    marginRight: "auto",
    minWidth: "25%",
    height: "auto",
    borderRadius: 0,
    // justifyContent: "space-around",
    justifyContent: "left",
    // justifyContent: "center"
  },

  link: {
    color: getColor("accent"),
    fontStyle: "italic",
    textDecorationLine: 'underline'
  },

  text: {
    color: getColor("text"),
    fontSize: 18,
    // fontWeight: "500",
    fontWeight: "200",
    textAlignVertical: 'center',
    marginLeft: 16
  },

  boldText: {
    color: getColor("text"),
    fontSize: 18,
    // fontWeight: "500",
    fontWeight: "300",
    textAlignVertical: 'center',
    marginLeft: 16
  },

  selectedText: {
    fontWeight: "500",
    // borderBottomColor: getColor("text"),
    borderBottomColor: getColor("accent"),
    borderBottomWidth: 1
  },

  subText: {
    color: getColor("text"),
    fontSize: 12,
    // fontWeight: "500",
    fontWeight: "100",
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

  row: {
    justifyContent: "left",
    flexDirection: "row"
  },

  centered: {
    justifyContent: "center",
    alignContent: "center",
    alignContent: "center"
  },

  title: {
    // monospace, serif
    fontFamily: "Roboto",
    fontSize: 21,
    color: getColor("title"),
    fontWeight: "200",
    textAlignVertical: 'center'
  },

  bigTitle: {
    // monospace, serif
    fontFamily: "monospace",
    fontSize: 30,
    fontStyle: "italic",
    color: getColor("title"),
    fontWeight: "900",
    textAlignVertical: "center",
    padding: 16
  },

  sidebar: {
    backgroundColor: getColor("secondary"),
    position: "absolute",
    top: 87,
    left: 0,
    width: sidebarW,
    height: "100%",
    zIndex: sidebarLayer,
    padding: 4,
    paddingTop: 32,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 24,
    borderWidth: 2,
    borderLeftWidth: 0,
    borderColor: getColor("text")
    // borderColor: "#cfcfcfac",
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
  theme = theme ?? darkTheme;
  styles= getStyles();
}

initTheme();