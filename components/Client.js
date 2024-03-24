
import { View, Text, ScrollView } from "react-native";

import Button from "./Button";
import ClientTerminal from "./ClientTerminal";

import { styles, getColor } from "../consts/theme";
import Page from "./Page";
import Pager from "./Pager";
import ClientVariableChanger from "./ClientVariableChanger";
import ClientActions from "./ClientActions";

const Client = (props) => {

  return (
    <View
      style={{
        width: "100%",
        height: "95%",
      }}
    >
      {(props.started && props.connected === "server") ?

        (<Text
          style={styles.text}
        >
          Can not start client while server is running. If you want to start client, please stop the server.
        </Text>) :

        <>
          <Pager>
            <Page name="Terminal"><ClientTerminal {...props}/></Page>
            { props.started && <Page name="Variables"><ClientVariableChanger {...props}/></Page> }
            { props.started && <Page name="Actions"><ClientActions {...props}/></Page> }
          </Pager>
        </>}
    </View>
  )
}


export default Client;