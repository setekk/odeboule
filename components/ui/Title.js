import {StyleSheet, Text, Platform} from "react-native";
import Colors from "../../constants/colors";

function Title({children}) {
  return <Text style={styles.title}>{children}</Text>
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'white',
    padding: 12,
    maxWidth: '100%',
    marginBottom: 6,
    backgroundColor: Colors.accent200
  }
});