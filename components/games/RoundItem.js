import {View, StyleSheet, Text} from "react-native";
import Colors from "../../constants/colors";

function RoundItem(props) {
  return (
    <View style={styles.roundItem}>
        <Text style={[styles.roundText, {fontWeight: 'bold'}]} >
          Manche {props.number} :
        </Text>
      <Text style={styles.roundText}>
        Equipe {props.isOdd === 1 ? 'impaire' : 'paire'} - Score : {props.score}
      </Text>
    </View>
  );
}

export default RoundItem;

const styles = StyleSheet.create({
  roundItem: {
    flexDirection: 'row',
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: Colors.primary600,
  },
  roundText: {
    color: Colors.accent500,
    padding: 8,

  }
})