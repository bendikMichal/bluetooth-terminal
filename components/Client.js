

import Button from "./Button";

import { styles } from "../consts/theme";

const Client = (props) => {

  return (
    <>
      <Button
        text={props.device?.name ?? "No device selected"}
        subText={props.device?.address ?? "No address"}
        customStyles={{ ...styles.menuItem, ...{ marginTop: 16 } }}
        textStyles={styles.text}
        subTextStyles={styles.subText}
        buttonName="device"
        background={false}
        onPress={() => {}}
      />
    </>
  )
}


export default Client;