
import { useEffect, useState } from "react";
import { FlatList, View, TextInput, Text } from "react-native";

import Button from "./Button";

import { _retrieveData, _storeData } from "../utils/asyncStorage";
import useStateAsync from "../utils/useStateAsync";
import { styles, getColor } from "../consts/theme";
import { isStringNumeric } from "../utils/typeUtils";
import { getNewUUID } from "../utils/uuidUtils";


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
        style={[{ 
          padding: 1,
          paddingTop: 8,
          paddingBottom: 8,
          borderColor: getColor("accent"),
          borderWidth: 1,
          borderRadius: 16,
          margin: 16,
          backgroundColor: getColor("fg")
        }]}
      >
        <View
          style={
            styles.row
          }
        >
          <TextInput 
            style={[styles.text, { 
              width: "40%", 
              borderWidth: 1, 
              borderColor: "#cfcfcf5c", 
              borderRadius: 6, 
              paddingLeft: 24,
              backgroundColor: getColor("bg"),
              fontFamily: "monospace"
            }]}
            onChangeText={newVal => changeVariable(item, { ...item, name: newVal })}
            value={item.name}
          />

          <TextInput 
            style={[styles.text, { 
              width: "40%", 
              marginLeft: "auto",
              marginRight: 16,
              borderWidth: 1, 
              borderColor: "#cfcfcf5c", 
              borderRadius: 6, 
              paddingLeft: 24,
              backgroundColor: getColor("bg"),
              fontFamily: "monospace"
            }]}
            onChangeText={newVal => changeVariable(item, { ...item, value: newVal })}
            value={item.value}
          />
        </View>

        <View
          style={
            styles.row
          }
        >
          <Button 
            buttonName="minus"
            buttonColor={getColor("fg")}
            customStyles={{ marginLeft: 16, padding: 8 }}
            background={true}
            colored={true}
            onPress={() => {
              if (isStringNumeric(item.value)) changeVariable(item, { ...item, value: `${parseFloat(item.value) - 1}` })
            }}
          />

          <Button 
            buttonName="plus"
            buttonColor={getColor("fg")}
            customStyles={{ marginLeft: 16, padding: 8 }}
            background={true}
            colored={true}
            onPress={() => {
              if (isStringNumeric(item.value)) changeVariable(item, { ...item, value: `${parseFloat(item.value) + 1}` })
            }}
          />

          <Button 
            buttonName="trash"
            buttonColor={getColor("fg")}
            customStyles={{ marginLeft: "auto", padding: 8 }}
            background={true}
            colored={true}
            onPress={() => {
              setVariables({
                ...variables,
                [deviceId]: variables[deviceId].filter(x => x.name !== item.name)
              });
            }}
          />
          
          <Button 
            buttonName="send"
            buttonColor={getColor("fg")}
            customStyles={{ marginRight: 16, padding: 8 }}
            background={true}
            colored={true}
            onPress={() => props.onSend(`${item.name}|${item.value}`)}
          />
        </View>

      </View>
    );
  }


  return (
    <View
      style={{
        width: "100%",
        height: "97%",
      }}
    >

      <FlatList 
        data={(variables ?? {})[deviceId]}
        renderItem={getItem}
      />

      <View style={{
          marginBottom: 72,
        }}
      > 
      </View>

      <Button 
        customStyles={{ position: "absolute", right: 16, bottom: 16 }}
        buttonColor={getColor("fg")}
        buttonName="plus"
        background={true}
        colored={true}
        onPress={() => {
          setVariables({
            ...variables,
            [deviceId]: [
              ...variables[deviceId],
              { name: `${getNewUUID()}`, value: "0" }
            ]
          })
        }}
      />

    </View>
  );

}

export default ClientVariableChanger;