import { View, Text, FlatList } from "react-native";

import Button from "./Button";

import { styles, getColor } from "../consts/theme";
import { useState } from "react";
import Messager from "./Messager";


const Server = (props) => {

  const [ timeout, setTimeout ] = useState(-1);

  return (
    <View
      style={{
        width: "100%",
        height: "95%",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "86%",
        }}
      >
        <View
          style={styles.row}
        >
          <Text
            style={[styles.text, { paddingLeft: 8 }]}
          > 
            Server status: 
          </Text>

          <Text
            style={[styles.text, { marginLeft: 24, fontWeight: "600" }]}
          >
            {props.started ? "running": props.trying ? "waiting" : "stopped"}
          </Text>

          <Button 
            buttonName={props.started ? "stop": props.trying ? "wait" : "play"}
            buttonColor={getColor("fg")}
            customStyles={{ marginLeft: "auto", marginRight: 32, padding: 8 }}
            background={true}
            colored={true}
            onPress={() => {
              if (!props.started) props.startServer(timeout)
              else props.stopServer()
            }}
          />
        </View>

        <FlatList 
          data={props.messages}
          renderItem={({index, item}) => (
            <Text
              key={index}
              style={styles.text}
            >
              {`${item.author ?? item.timestamp.toISOString()} - ${item.message}`}
            </Text>
          )}
        />

      </View>
      {props.started && <Messager
        onSend={props.onSend}
      />}
    </View>
  );

}

export default Server;