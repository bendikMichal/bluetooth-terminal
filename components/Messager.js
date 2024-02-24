
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
          width: "77%", 
          borderWidth: 2, 
          borderColor: "#cfcfcfac", 
          borderRadius: 6, 
          paddingLeft: 24,
          backgroundColor: getColor("fg")
        }]}
        onChangeText={setValue}
        value={value}
      />
      
      <Button
        buttonName="send"
        buttonColor={getColor("fg")}
        customStyles={{ marginLeft: "auto", marginRight: 16, padding: 8 }}
        background={true}
        colored={true}
        onPress={() => props.onSend(value)}
      />
    </View>
  );
}

export default Messager;