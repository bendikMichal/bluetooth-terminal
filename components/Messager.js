
import { TextInput, View } from "react-native";
import { useState } from "react";

import Button from "./Button";

import { styles, getColor } from "../consts/theme";


const Messager = (props) => {
  const [ value, setValue ] = useState("");

  return (
    <View
      style={[styles.row, { position: "absolute", bottom: 16, width: "100%", marginBottom: 24 }]}
    >
      <TextInput 
        style={[styles.text, { 
          width: "78%", 
          borderWidth: 2, 
          // borderColor: "#cfcfcfac", 
          borderColor: getColor("accent"), 
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderRadius: 6, 
          paddingLeft: 24,
          paddingTop: 4,
          paddingBottom: 4,
          height: 52,
          backgroundColor: getColor("fg"),
          marginTop: "auto",
          marginBottom: "auto",
          fontFamily: "monospace"

        }]}
        onChangeText={setValue}
        value={value}
      />
      
      <Button
        buttonName="send"
        buttonColor={getColor("text")}
        customStyles={{ marginLeft: 0, marginRight: 8, padding: 8, padding: 26, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
        // customStyles={{ position: "absolute", right: 16, bottom: 16 }}
        background={true}
        onPress={() => props.onSend(value)}
      />
    </View>
  );
}

export default Messager;