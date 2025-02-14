
import { useState, useEffect } from "react";

import Button from "./Button";

import useAnimated from "../utils/useAnimated";
import { getColor, styles } from "../consts/theme";

const SelectItem = (props) => {
  const [ value, setValue ] = useState(0);
  const startValueAnimation = useAnimated(value, setValue);

  useEffect(() => {
    if (value < 1) return
    startValueAnimation(0, 350);
  }, [value]);

  return (
    <>
      <Button
        text={props.text}
        subText={props.subText}
        customStyles={{ ...styles.menuItem, ...{ marginTop: 16 } }}
        textStyles={styles.text}
        subTextStyles={styles.subText}
        buttonName={props.buttonName}
        buttonSubName="checkmark"
        actionStyles={{ position: "relative", right: Math.floor(-150 + 175 * Math.sin(Math.PI / 2 * value)) }}
        background={false}
        onPress={() => {
          props.onPress();
          startValueAnimation(1, 350);
        }}
      />
    </>
  )
}


export default SelectItem;