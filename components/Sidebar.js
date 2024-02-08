
import { StyleSheet, View, Text, Animated } from "react-native";
import { useEffect, useRef, useState } from "react";

import { sidebarW } from "../consts/constants";
import { styles } from "../consts/theme";

import useAnimated from "../utils/useAnimated";
import MenuItem from "./MenuItem";

// @props
//   open: bool
//   menuItems: List<ReactComponent>
//   onClose: fn
//   route: string
//   setRoute: fn

const Sidebar = (props) => {
  const [ value, setValue ] = useState(0);
  const startValueAnimation = useAnimated(value, setValue);

  useEffect(() => {
    startValueAnimation(1 * props.open, 250);
  }, [props.open]);

  const buildMenu = () => props.menuItems?.map((item, index) => <MenuItem 
                                    key={index} 
                                    id={index} 
                                    activeRoute={props.route}
                                    onPress={() => props.setRoute(item)} 
                                    {...item} />);


  if (!props.open && value <= 0) return <></>;
  return (
    <Animated.View style={[styles.sidebar, { left: (-sidebarW * (1 - value)) ?? 0 }]}>
      {buildMenu()}
    </Animated.View>
  );

}

export default Sidebar;