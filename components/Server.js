import { View, Text, FlatList } from "react-native";

import { useState } from "react";

import Button from "./Button";
import Messager from "./Messager";

import { styles, getColor } from "../consts/theme";


const Server = (props) => {

  const [ timeout, setTimeout ] = useState(-1);

  return (
    <View
      style={{
        width: "100%",
        height: "98%",
      }}
    >
      {(props.started && props.connected === "client") ?

        (<Text
          style={styles.text}
        >
          Can not start server while client is running. If you want to start server, please stop client.
        </Text>) :

        <>
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
                buttonColor={getColor("text")}
                customStyles={{ marginLeft: "auto", marginRight: 32, padding: 8 }}
                background={true}
                // colored={true}
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
                  style={[styles.text, { fontFamily: "monospace" }]}
                >
                  {`${item.author ?? item.timestamp.toISOString()} - ${item.message}`}
                </Text>
              )}
            />

          </View>
          {props.started && <Messager
            onSend={props.onSend}
          />}
        </>}
    </View>
  );

}

export default Server;