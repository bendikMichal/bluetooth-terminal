
import { View, Text, StyleSheet } from "react-native";

import { getColor } from "../consts/theme";
import Button from "./Button";

// props:
//   title: string
//   route: string
//   icon: string

const MenuItem = (props) => {

  return (
    <View style={[styles.wrap, props.id == 2 && { borderColor: "#4936572a", borderBottomWidth: 2, borderRightWidth: 0 }]} >
      <Button 
        text={props.title}
        customStyles={styles.menuItem}
        textStyles={styles.text}
        buttonName={props.icon}
        background={false}
      />

      {props.id == 2 && <View style={styles.activeDot} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: 10,
    marginTop: 12,
    justifyContent: "left",
    flexDirection: "row"
  },
  activeDot: {
    backgroundColor: getColor("text"),
    width: 4,
    marginRight: 4,
    height: 32,
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
    fontSize: 18,
    fontWeight: "500",
    textAlignVertical: 'center',
    marginLeft: 16
  }
});

export default MenuItem;