
import { View, Text, FlatList } from "react-native";

import Button from "./Button";
import Messager from "./Messager";

import { styles, getColor } from "../consts/theme";

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
          <Button
            text={props.device?.name ?? "No device selected"}
            subText={props.device?.address ?? "No address"}
            customStyles={{ ...styles.menuItem, ...{ marginTop: 16 } }}
            textStyles={styles.text}
            subTextStyles={styles.subText}
            buttonName="device"
            background={false}
            onPress={() => {
              if (!props.started) props.onGotoDevices()
            }}
          />

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
                Client
              </Text>

              <Button 
                buttonName={props.started ? "connected" : props.trying ? "wait" : "disconnected"}
                buttonColor={getColor("fg")}
                customStyles={{ marginLeft: "auto", marginRight: 32, padding: 8 }}
                background={true}
                colored={true}
                onPress={() => {
                  if (!props.started) props.startClient();
                  else props.stopClient();
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
        </>}
    </View>
  )
}


export default Client;