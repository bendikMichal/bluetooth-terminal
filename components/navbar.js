
import { StyleSheet, Text, View } from 'react-native';

import { getColor } from "../consts/theme";

import Button from './Button';
import { styles } from '../consts/theme';      

// @props
//   title: string
//   children: List<ReactComponent>
//   leftChildren: List<ReactComponent>
//   toggleSidebar: fn

const Navbar = (props) => {

  return (
    <View style={styles.viewStyle} >
      {props.leftChildren ?? null}

      <Button 
        onPress={() => {
          props.ignoreClose.current = true;
          props.toggleSidebar();
        }}
        buttonName="menu"
        buttonColor={getColor("title")}
        background={false}
      /> 

      <Text style={[styles.title, { marginLeft: 16 }]} onPress={() => props.handleChangeRoute({ route: "/" })}> 
        {props.title}  
      </Text>

      {props.children ?? <></>}
    </View>
  );
}



export default Navbar;

