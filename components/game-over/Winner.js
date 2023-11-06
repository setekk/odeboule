import {FlatList, StyleSheet, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Colors from "../../constants/colors";

function Winner({team}) {

  return (
      <View style={styles.container}>
        <View style={styles.teamScoreContainer}>
          <View style={styles.iconScoreContainer}>
            <Ionicons name="trophy" size={52} color="white" />
            <Text style={[styles.winner, {fontSize: 42, color: Colors.accent500}]}>
              {team.score}
            </Text>
          </View>
          <Text style={styles.winner}>{team.name}</Text>
          <Text style={styles.players}>Equipe {team.isOdd === 1 ? 'impaire' : 'paire'} : {team.players.map((p) => p.name).join(', ')}</Text>
        </View>
      </View>
    )
}

export default Winner;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 8,
    padding: 8,
    backgroundColor: Colors.primary700,
    borderRadius: 8,
    elevation: 8,
  },
  teamScoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  winner: {
    fontSize: 24,
    color: 'white',
  },
  players: {
    fontSize: 16,
    color: 'white',
    padding: 8
  },
  iconScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});