
import { StyleSheet, View, Text, Animated } from "react-native";
import { useEffect, useRef, useState } from "react";

import { sidebarLayer, sidebarW, height } from "../consts/constants";
import { getColor } from "../consts/theme";

import Button from "./Button";
import useAnimated from "../utils/useAnimated";


const Sidebar = (props) => {
  const [ value, setValue ] = useState(0);
  const startValueAnimation = useAnimated(value, setValue);
  
  useEffect(() => {
    startValueAnimation(1 * props.open, 500);
  }, [props.open]);


  if (!props.open && value <= 0) return <></>;
  return (
    <Animated.View style={[styles.sidebar, { left: (-sidebarW * (1 - value)) ?? 0 }]}>
      <Button 
        onPress={props.onClose}
        buttonName="arrow"
        background={false}
      />
    </Animated.View>
  );

}

const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: getColor("secondary"),
    position: "absolute",
    top: 0,
    left: 0,
    width: sidebarW,
    height: "100%",
    zIndex: sidebarLayer,
    padding: 4,
    paddingTop: 32,
  },
});

export default Sidebar;