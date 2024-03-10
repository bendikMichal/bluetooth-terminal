
import { useEffect, useState } from "react";
import { FlatList, View, TextInput } from "react-native";

import { _retrieveData, _storeData } from "../utils/asyncStorage";
import useStateAsync from "../utils/useStateAsync";
import { styles, getColor } from "../consts/theme";

// _storeData("variables", JSON.stringify([{ name: "test", value: "10", packet: "test,10"}]));

const ClientVariableChanger = (props) => {

  // { name: string, value: string }
  // packet vould be = "name,value"
  const [ variables, setVariables ] = useStateAsync(_retrieveData("variables", JSON.stringify({})), data => JSON.parse(data));
  const deviceId = props.device ? props.device.address : "";
  // _storeData("variables", JSON.stringify({ [deviceId]: [{ name: "test", value: "10" }] }));

  useEffect(() => {
    if (variables) {
      _storeData("variables", JSON.stringify(variables));
    }
  }, [variables]);

  const changeVariable = async (original, changed) => {
    let newData = variables[deviceId];
    if (!newData) return;

    for (let i = 0; i < newData.length; i++) {
      if (newData[i].name === original.name) {
        newData[i] = { ...changed };

        let newVars = {
          ...variables,
          [deviceId]: newData
        };

        return setVariables(newVars);
      }
    }
  }

  const getItem = ({index, item}) => {
    return (
      <View
        key={index}
        style={[styles.row, { padding: 8 }]}
      >
        <TextInput 
          style={[styles.text, { 
            width: "35%", 
            borderWidth: 2, 
            borderColor: "#cfcfcfac", 
            borderRadius: 6, 
            paddingLeft: 24,
            backgroundColor: getColor("fg")
          }]}
          onChangeText={newVal => changeVariable(item, { ...item, name: newVal })}
          value={item.name}
        />

        <TextInput 
          style={[styles.text, { 
            width: "35%", 
            borderWidth: 2, 
            borderColor: "#cfcfcfac", 
            borderRadius: 6, 
            paddingLeft: 24,
            backgroundColor: getColor("fg")
          }]}
          onChangeText={newVal => changeVariable(item, { ...item, value: newVal })}
          value={item.value}
        />

      </View>
    );
  }


  return (
    <View
      style={{
        width: "100%",
        height: "86%",
      }}
    >

      <FlatList 
          data={(variables ?? {})[deviceId]}
          renderItem={getItem}
        />

    </View>
  );

}

export default ClientVariableChanger;