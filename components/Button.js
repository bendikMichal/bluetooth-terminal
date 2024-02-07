import { Image, TouchableOpacity, Text, StyleSheet, View } from "react-native";

import {
  buttonSize,
  buttonSizeBg,
} from "../consts/constants";

import { getColor } from "../consts/theme";

export default function Button({
  buttonName: buttonName,
  onPress: onPress,
  useMargin: useMargin,
  background: background,
  text: text,
  subText: subText,
  noOpacity: noOpacity,
  angle: angle,
  colored: colored,
  uriImage: uriImage,
  customStyles: customStyles,
  textStyles: textStyles,
  subTextStyles: subTextStyles,

} = props) {

  useMargin = useMargin ?? false;
  background = background ?? true;
  noOpacity = noOpacity ?? false;
  angle = angle ?? false;
  colored = colored ?? false;
  uriImage = uriImage ?? false;
  customStyles = customStyles ?? {};
  textStyles = textStyles ?? {};
  subTextStyles = subTextStyles ?? {};
  const textActive = text === undefined ? false : true;
  const subTextActive = subText === undefined ? false : true;

  const images = {
    ["file"]: require("./../assets/buttons/file.png"),
    ["arrow"]: require("./../assets/buttons/arrow.png"),
    ["arrowDown"]: require("./../assets/buttons/arrowDown.png"),
    ["plus"]: require("./../assets/buttons/plus.png"),
    ["accept"]: require("./../assets/buttons/accept.png"),
    ["cross"]: require("./../assets/buttons/cross.png"),
    ["gallery"]: require("./../assets/buttons/gallery.png"),
    ["zoom-in"]: require("./../assets/buttons/zoom-in.png"),
    ["zoom-out"]: require("./../assets/buttons/zoom-out.png"),
    ["menu"]: require("./../assets/buttons/menu.png"),
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          margin: useMargin ? "6%" : "2%",
          backgroundColor: !background ? "transparent" : colored ? getColor("secondary") : getColor("accent"),
        },
        customStyles,
      ]}
      activeOpacity={noOpacity ? 1 : 0.5}
      onPress={onPress}
    >
      <Image
        style={[
          styles.image,
          {
            width: uriImage ? buttonSizeBg * 2 : buttonSize,
            height: uriImage ? buttonSizeBg * 2 : buttonSize,
            borderRadius: uriImage ? 8 : 0,
            transform: angle ? [{ rotate: angle + "deg" }] : [],
          },
        ]}
        source={
          uriImage
            ? {
                uri: uriImage,
              }
            : images[buttonName]
        }
        tintColor={uriImage ? null : getColor("text")}
      ></Image>
      <View>
        {textActive && (
          <Text
            style={[
              {
                color: getColor("secondary"),
              },
              textStyles,
            ]}
          >
            {text}
          </Text>
        )}
        {subTextActive && (
          <Text
            style={[
              {
                color: getColor("secondary"),
              },
              subTextStyles,
            ]}
          >
            {subText}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: buttonSize,
    height: buttonSize,
    // color: "black",
  },
  button: {
    width: buttonSizeBg,
    height: buttonSizeBg,
    borderRadius: buttonSizeBg / 4,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
