import {ActivityIndicator, StyleSheet, View} from "react-native";
import Colors from "../../constants/colors";

function Loading() {
  return <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color="#d9ac99" />
  </View>
}

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});