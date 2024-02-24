
import { FlatList, Text, View } from "react-native";

import Button from "./Button";

import { getColor, styles } from "../consts/theme";
import SelectItem from "./SelectItem";

const Devices = (props) => {

  const getItem = ({index, item}) => {
    return (
      <SelectItem 
        key={index}
        text={item.name}
        subText={item.address}
        buttonName="device"
        onPress={() => props.onSelect(item)}
      />
        
    );
  }

  return (
    <View 
      style={{
        height: "95%"

      }}
    >
      {(props.started && props.connected === "server") ?

        (<Text
          style={styles.text}
        >
          Can not change device while client is running. If you want to change device, please stop client.
        </Text>) :

        <>
          <FlatList 
            data={props.devices ?? []}
            renderItem={getItem}
          />

          <Button 
            customStyles={{ position: "absolute", right: 16, bottom: 16 }}
            buttonColor={getColor("fg")}
            buttonName="refresh"
            background={true}
            colored={true}
            onPress={props.refreshDevices}
          />
        </>}
    </View>
  );
}

export default Devices;