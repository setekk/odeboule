import {StyleSheet,  View} from "react-native";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import Loading from "../components/common/Loading";
import ScoresTeamsView from "../components/game/ScoresTeamsView";
import {setSelectedTeam} from "../store/gameSlice";

function GameScreen({navigation}) {
  const dispatch = useDispatch();
  const game = useSelector((state) => state.game.game)
  const numRound = useSelector((state) => state.game.numRound)
  const [isLoading, setIsLoading] = useState(false);

  function showAddScore(teamItem) {
    dispatch(setSelectedTeam({...teamItem}))
    navigation.navigate('AddScores')
  }

  if(isLoading || !game) {
    return <Loading/>
  }

  return (
    <View style={styles.screen}>
      <Title>Manche {numRound}</Title>
      <ScoresTeamsView onSelect={showAddScore} />
    </View>
  )
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 8,
    backgroundColor: Colors.primary500
  }
})