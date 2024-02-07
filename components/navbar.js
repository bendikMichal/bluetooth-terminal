
import { StyleSheet, Text, View } from 'react-native';

import { getColor } from "../consts/theme";

import Button from './Button';

// @props
//   title: string
//   children: List<ReactComponent>
//   leftChildren: List<ReactComponent>
//   toggleSidebar: fn

const Navbar = (props) => {

  return (
    <View style={styles.viewStyle} >
      {props.leftChildren ?? null}

      <Button 
        onPress={props.toggleSidebar}
        buttonName="menu"
        buttonColor={getColor("title")}
        background={false}
      /> 

      <Text style={[styles.title, { marginLeft: 16 }]}> 
        {props.title}  
      </Text>

      {props.children ?? null}
    </View>
  );
}

const styles = StyleSheet.create({
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
  }
});

export default Navbar;

