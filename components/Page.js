
import { View, Dimensions } from "react-native";

const Page = (props) => {

  return (
    <View
      style={{
        width: Dimensions.get('window').width,
        height: "100%",
      }}
    >
      {props.children ?? <></>}
    </View>
  );
}

export default Page;