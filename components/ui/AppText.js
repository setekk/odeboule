import {StyleSheet, Text} from "react-native";
import Colors from "../../constants/colors";

function AppText({children, style}) {
  return <Text style={[styles.text, style]}>{children}</Text>
}

const styles = StyleSheet.create({
  text: {
    color: Colors.accent700,
    fontSize: 20,
    marginTop: 12
  },
})
export default AppText;