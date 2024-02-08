
// props:
//   routes: List<ReactComponent>
//   route: string

import { StyleSheet, View } from "react-native";
import { rootLayer } from "../consts/constants";

const Navigation = (props) => {

  const getElement = () => props.routes.filter((item) => item.props.route === props.route);

  return (
    <View style={styles.wrap} >
      {getElement()}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "relative",
    top: 91,
    zIndex: rootLayer,    
  }
})


export default Navigation;