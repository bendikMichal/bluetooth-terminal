

import { ScrollView, Text, View, Linking } from "react-native";
import { styles } from "../consts/theme";

import package_json from "../package.json";

const item_pad = { padding: 16, paddingLeft: 32, paddingRight: 32, justifyContent: "space-between" };

const Info = (props) => {

  return (
    <View style={{
      height: "98%"
    }}>
      <ScrollView>
        <View style={[styles.row, styles.centered, item_pad]}>
          <Text style={styles.title}>Icons by</Text>
          <Text style={[styles.text, styles.link]} onPress={() => Linking.openURL("https://icons8.com")}> icons8.com </Text>
        </View>

        <View style={[styles.row, styles.centered, item_pad]}>
          <Text style={styles.boldText}>Version</Text>
          <Text style={styles.text}> {package_json.version} </Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default Info;