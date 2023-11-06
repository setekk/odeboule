import {StyleSheet, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Colors from "../../constants/colors";
import Winner from "../game-over/Winner";

function TeamItem({team}) {
  const isWinner = team.winner === 1;

  if (isWinner) {
    return <Winner team={team} />
  }
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={[styles.text, {fontWeight: 'bold'}]} >
          {team.name} :
        </Text>
        <Text style={styles.text}>
          {team.score}
        </Text>
      </View>
      <Text style={{color: 'white', paddingLeft: 8}}>
        Equipe {team.isOdd === 1 ? 'impaire' : 'paire'} : {team.players.map((p) => p.name).join(', ')}
      </Text>
    </View>


  )
}

export default TeamItem;

const styles = StyleSheet.create({
  container: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: Colors.primary700,
  },
  item: {
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    padding: 8,
  }
})