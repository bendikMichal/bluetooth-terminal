
import { useEffect, useState } from "react";
import { FlatList, View, TextInput, Text, TouchableOpacity } from "react-native";

import Button from "./Button";

import { _retrieveData, _storeData } from "../utils/asyncStorage";
import useStateAsync from "../utils/useStateAsync";
import { styles, getColor } from "../consts/theme";

const ClientActions = (props) => {
  const [ actions, setActions ] = useStateAsync(_retrieveData("actions", JSON.stringify({})), data => JSON.parse(data));
  const deviceId = props.device ? props.device.address : "";

  useEffect(() => {
    if (actions) {
      _storeData("actions", JSON.stringify(actions));
    }
  }, [actions]);

  const getItem = ({index, item}) => {
    const handleLongPress = () => {
      let newActions = [...actions[deviceId]];
      newActions[index].inEdit = !newActions[index].inEdit;

      setActions({
        ...actions, 
        [deviceId]: newActions
      });
    }

    return (
      <>
      { !item.inEdit ?

        <Button 
          key={index}
          text={item.value}
          textStyles={[ styles.text, {
            marginLeft: "auto",
            marginRight: "auto"
          } ]}
          buttonColor={getColor("text")}
          customStyles={{ 
            margin: 8, 
            // padding: 26, 
            borderRadius: 16,
            width: "45%",
            height: 170,
          }}
          background={true}
          onPress={() => props.onSend(`${item.value}`)}
          onLongPress={handleLongPress}
        /> :
        <TouchableOpacity 
          style={{ 
            margin: 8, 
            // padding: 26, 
            borderRadius: 16,
            width: "45%",
            height: 170,
            backgroundColor: getColor("accent")
          }}
          onLongPress={handleLongPress}
          activeOpacity={0.5}
        >
          <TextInput 
            style={[styles.text, { 
              width: "90%", 
              borderWidth: 2, 
              borderColor: "#cfcfcf5c", 
              borderColor: getColor("text"),
              borderRadius: 6, 
              paddingLeft: 24,
              height: 52,
              marginTop: "auto",
              marginBottom: "auto",
              marginLeft: 8,
              backgroundColor: getColor("bg"),
              fontFamily: "monospace"
            }]}
            onChangeText={newVal => {
              let newActions = actions[deviceId];
              newActions[index].value = newVal;
              
              setActions({
                ...actions,
                [deviceId]: newActions
              });
            }}
            value={item.value}
          />

          <Button 
            buttonName="trash"
            buttonColor={getColor("fg")}
            customStyles={{ marginLeft: "auto", marginRight: "auto", marginBottom: "auto", padding: 8 }}
            background={true}
            colored={true}
            onPress={() => {
              let newActions = actions[deviceId];
              newActions.splice(index, 1);
              
              setActions({
                ...actions,
                [deviceId]: newActions
              });
            }}
          />

        </TouchableOpacity>
      }
      </>
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
        data={(actions ?? {})[deviceId] ?? []}
        numColumns={2}
        renderItem={getItem}
      />


      <View
        style={{ 
          position: "absolute", 
          right: 16, 
          bottom: 3, 
          width: 64, 
          height: 64,
          borderRadius: 16,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          backgroundColor: getColor("bg")

        }}
      />

      <Button 
        customStyles={{ position: "absolute", right: 16, bottom: -5 }}
        buttonColor={getColor("text")}
        buttonName="plus"
        background={true}
        onPress={() => {
          console.log(actions, deviceId)
          setActions({
            ...actions,
            [deviceId]: [
              ...(actions[deviceId] ?? []),
              { value: "No Action" }
            ]
          })
        }}
      />

    </View>
  );

}

export default ClientActions;