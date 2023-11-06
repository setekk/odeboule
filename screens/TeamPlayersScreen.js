import {View, Text, StyleSheet, FlatList} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import Colors from "../constants/colors";
import Loading from "../components/common/Loading";
import PlayerIconList from "../components/game/PlayerIconList";
import FirstActionBtn from "../components/ui/FirstActionBtn";
import {postGame} from "../data/services/GameService";
import {setGame} from "../store/gameSlice";
import {CommonActions} from "@react-navigation/native";

function TeamPlayersScreen({navigation}) {
  const teams = useSelector((state) => state.game.teamsPlayers)
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  async function launchGame() {
    setIsLoading(true)
    try {
      // //Créer la partie
      await createGame()
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
      navigation.navigate('Game')
    }
  }

  async function createGame() {
    const game= await postGame(teams)
    dispatch(setGame({...game}))
  }

  if(isLoading || !teams) {
    return <Loading/>
  }
  return (
    <View style={styles.screen}>
      <FlatList data={teams} renderItem={ (itemData) => {
        return (
          <View style={styles.team}>
            <Text style={styles.teamName}>{itemData.item.name}</Text>
            <PlayerIconList players={itemData.item.players} size={48}/>
            <Text style={styles.dicesType}>Equipe {itemData.item.isOdd === 1 ? 'impaire' : 'paire'} => dés {itemData.item.isOdd === 1 ? 'impairs' : 'pairs'}</Text>
          </View>
        )
      } }/>
      <View>
        <FirstActionBtn onPress={launchGame}>Lancer la partie</FirstActionBtn>
      </View>
    </View>
  )
}

export default TeamPlayersScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 8,
    backgroundColor: Colors.primary500
  },
  team: {
    backgroundColor: Colors.primary700,
    borderRadius: 8,
    padding: 16,
    margin: 8,
  },
  teamName: {
    fontSize: 28,
    color: 'white',
  },
  dicesType: {
    fontSize: 18,
    color: 'white',
    fontStyle: 'italic',
  }
})