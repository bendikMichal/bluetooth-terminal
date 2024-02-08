
import { View } from "react-native";

import Button from "./Button";
import { styles } from "../consts/theme";

// props:
//   title: string
//   route: string
//   icon: string
//   onPress: fn
//   activeRoute: string

const MenuItem = (props) => {

  const isActive = () => props.route === props.activeRoute;

  return (
    <View style={[styles.wrapMenu, isActive() && { borderRadius: 12, marginLeft: 24 }]} >
      <Button 
        text={props.title}
        customStyles={styles.menuItem}
        textStyles={styles.text}
        buttonName={props.icon}
        background={false}
        onPress={props.onPress}
      />

      { isActive() && <View style={styles.activeDot} />}
    </View>
  );
}

export default MenuItem;