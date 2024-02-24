import { Image, TouchableOpacity, Text, StyleSheet, View } from "react-native";

import {
  buttonSize,
  buttonSizeBg,
} from "../consts/constants";

import { getColor } from "../consts/theme";

export default function Button({
  buttonName: buttonName,
  buttonSubName: buttonSubName,
  onPress: onPress,
  useMargin: useMargin,
  background: background,
  text: text,
  subText: subText,
  noOpacity: noOpacity,
  angle: angle,
  colored: colored,
  uriImage: uriImage,
  uriSubImage: uriSubImage,
  customStyles: customStyles,
  textStyles: textStyles,
  subTextStyles: subTextStyles,
  buttonColor: buttonColor,
  actionStyles: actionStyles

} = props) {

  useMargin = useMargin ?? false;
  background = background ?? true;
  noOpacity = noOpacity ?? false;
  angle = angle ?? false;
  colored = colored ?? false;
  uriImage = uriImage ?? false;
  uriSubImage = uriSubImage ?? false;
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
    ["terminal"]: require("./../assets/buttons/terminal.png"),
    ["device"]: require("./../assets/buttons/device.png"),
    ["devices"]: require("./../assets/buttons/devices.png"),
    ["settings"]: require("./../assets/buttons/settings.png"),
    ["info"]: require("./../assets/buttons/info.png"),
    ["client"]: require("./../assets/buttons/client.png"),
    ["server"]: require("./../assets/buttons/server.png"),
    ["checkmark"]: require("./../assets/buttons/checkmark.png"),
    ["refresh"]: require("./../assets/buttons/refresh.png"),
    ["play"]: require("./../assets/buttons/play.png"),
    ["stop"]: require("./../assets/buttons/stop.png"),
    ["wait"]: require("./../assets/buttons/wait.png"),
    ["send"]: require("./../assets/buttons/send.png"),
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          margin: useMargin ? "6%" : "2%",
          backgroundColor: !background ? "transparent" : colored ? getColor("text") : getColor("accent"),
        },
        customStyles,
      ]}
      activeOpacity={noOpacity ? 1 : 0.5}
      onPress={onPress}
    >
      { ( buttonName || uriImage ) && <Image
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
        tintColor={uriImage ? null : buttonColor ?? getColor("text")}
      />}
      <View>
        {textActive && (
          <Text
            style={[
              {
                color: getColor("text"),
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
                color: getColor("text"),
              },
              subTextStyles,
            ]}
          >
            {subText}
          </Text>
        )}
      </View>

      { ( buttonSubName || uriSubImage ) && <Image
        style={[
          styles.image,
          styles.subImage,
          {
            width: uriImage ? buttonSizeBg * 2 : buttonSize,
            height: uriImage ? buttonSizeBg * 2 : buttonSize,
            borderRadius: uriImage ? 8 : 0,
            transform: angle ? [{ rotate: angle + "deg" }] : [],
          },
          actionStyles ?? {}
        ]}
        source={
          uriSubImage
            ? {
                uri: uriSubImage,
              }
            : images[buttonSubName]
        }
        tintColor={uriSubImage ? null : buttonColor ?? getColor("text")}
      />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: buttonSize,
    height: buttonSize,
    // color: "black",
  },
  subImage: {
    marginLeft: "auto"
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
