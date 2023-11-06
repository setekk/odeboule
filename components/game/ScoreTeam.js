import {StyleSheet, Text, View} from "react-native";
import Colors from "../../constants/colors";
import TeamIcon from "./TeamIcon";
import Card from "../ui/Card";

function ScoreTeam({team}) {
    return <View style={styles.scoreContainer}>
    <Card>
      <TeamIcon
        name={team.name}
        size={56}
        color="white"
        textStyle={styles.textStyle}
      />
      <Text style={{color: 'white'}}>Equipe {team.isOdd === 1 ? 'impaire' : 'paire'} : {team.players.map((p) => p.name).join(', ')}</Text>
      <Text style={styles.score}>{team.score}</Text>
    </Card>
  </View>
}

export default ScoreTeam;

const styles = StyleSheet.create({
  scoreContainer: {
    alignItems: 'center',
    padding: 8
  },
  score: {
    fontSize: 60,
    color: Colors.accent500
  },
  textStyle: {
    color: 'white'
  }
})