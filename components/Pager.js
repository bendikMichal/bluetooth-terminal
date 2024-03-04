
import { useRef, useState } from "react";
import { ScrollView, Text, View, Dimensions } from "react-native";
import { styles } from "../consts/theme";

const width = Dimensions.get("window").width;

const Pager = (props) => {
  const [ titles, __setTitles ] = useState(props.children?.map(c => c.props.name) ?? []);
  const [ page, setPage ] = useState(0);

  const scrollViewRef = useRef(null);
  
  const handleScroll = (event) => {
    const newPage = Math.round(event.nativeEvent.contentOffset.x / width);
    if (newPage != page) setPage(newPage);
  }

  const moveToPage = (pageNum) => {
    const newScroll = pageNum * width;
    scrollViewRef.current.scrollTo({ x: newScroll });
  }

  return (
    <View>
      <View style={[styles.row, { justifyContent: "space-around", padding: 8 }]} >
        {titles.map((t, index) => <Text 
                            key={t}
                            style={[
                              styles.boldText, 
                              { marginLeft: "auto", marginRight: "auto" }, 
                              page === index ? styles.selectedText : {}
                            ]}
                            onPress={() => moveToPage(index)}
                          > 
                            {t} 
                          </Text>)}
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        pagingEnabled={true}
        onScroll={handleScroll}
      >
        {props.children ?? <></>}
      </ScrollView>
    </View>
  );
}

export default Pager;