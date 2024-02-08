
import { StyleSheet, View } from "react-native";

const Row = (props) => {

  return (
    <View style={[styles.row, props.style]} >
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row"
  },

});
export default Row;