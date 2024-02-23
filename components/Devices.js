
import { FlatList, Text } from "react-native";

import Button from "./Button";

import { styles } from "../consts/theme";
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
    <FlatList 
      data={props.devices ?? []}
      renderItem={getItem}
    />
  );
}

export default Devices;