import {StyleSheet, Text, View} from "react-native";
import Colors from "../../constants/colors";
import {AntDesign} from "@expo/vector-icons";

function Fallback({children}) {
  return <View style={styles.fallbackContainer}>
    <AntDesign name="warning" size={20} color={Colors.accent500}/>
    <Text style={styles.fallbackText}>{children}</Text>
  </View>
}

export default Fallback;

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1 ,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  fallbackText: {
    paddingLeft: 8,
    fontSize: 16,
    color: Colors.accent500,
    textAlign: 'center'
  },
});