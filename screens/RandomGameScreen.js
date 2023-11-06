import {View, Text, StyleSheet, Alert} from "react-native";
import {useLayoutEffect, useState} from "react";
import {fetchPlayers} from "../data/queryDatabase";
import {useIsFocused} from "@react-navigation/native";
import Colors from "../constants/colors";
import FirstActionBtn from "../components/ui/FirstActionBtn";
import Fallback from "../components/common/Fallback";
import SelectionList from "../components/common/SelectionList";
import {generateRandomTeams} from "../data/services/TeamService";
import {useDispatch} from "react-redux";
import {addTeamPlayers, reInit, setTeamsPlayers} from "../store/gameSlice";

function RandomGameScreen({navigation}) {
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (isFocused) {
      setIsLoading(true)
      setSelectedPlayers([])
      getData()
        .finally(() => setIsLoading(false))
    }
  }, [isFocused]);

  async function getData() {
    try {
      const players = await fetchPlayers();
      setPlayers(players)
    } catch (e) {
      console.log(e)
    }
  }

  function selectPlayerHandler(item) {
    //find if players is already selected
    if(selectedPlayers.findIndex((player) => player.id === item.id) === -1) {
      setSelectedPlayers(oldSelectedPlayers => [...oldSelectedPlayers, item])
    } else {
      setSelectedPlayers(oldSelectedPlayers => oldSelectedPlayers.filter((player) => player.id !== item.id))
    }
  }

  async function prepareGame() {
    if (!selectedPlayers || selectedPlayers.length < 2) {
      Alert.alert('Erreur','Veuillez sélectionner au moins deux joueurs')
      return;
    }
    try {
      dispatch(reInit())
      const teams = await generateRandomTeams(selectedPlayers)
      teams.map((team) => {
        dispatch(addTeamPlayers(team))
      })
      navigation.navigate('TeamPlayers')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <View style={styles.screen}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.subtitle}>Choisir les joueurs participants</Text>
        <Text style={styles.caption}>Ils seront répartis aléatoirement dans 2 équipes</Text>
      </View>
      <SelectionList
        items={players}
        iconName='pluscircleo'
        iconNameSelected='minuscircleo'
        onSelectedItem={selectPlayerHandler}
      />
      {players.length=== 0 && <Fallback>Allez dans la section joueurs pour en ajouter ;)</Fallback>}
      <FirstActionBtn onPress={prepareGame}>Tirage au sort</FirstActionBtn>
    </View>
  )
}

export default RandomGameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 8,
    backgroundColor: Colors.primary500
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.accent500
  },
  caption: {
    fontSize: 14,
    fontStyle: 'italic',
    color: Colors.accent500
  },
})