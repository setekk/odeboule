import Colors from "../../constants/colors";
import {View, Text, StyleSheet, Alert} from "react-native";
import {useEffect, useState} from "react";
import {getPlayers, getPlayersByTeam} from "../../data/services/PlayerService";
import Fallback from "../common/Fallback";
import FirstActionBtn from "../ui/FirstActionBtn";
import DeleteButton from "../ui/DeleteButton";
import {useIsFocused} from "@react-navigation/native";
import {getTeamById, postTeamPlayerByTeam, removeTeam} from "../../data/services/TeamService";
import Loading from "../common/Loading";
import SelectionList from "../common/SelectionList";

function TeamPlayerView({navigation, route}) {
  const {id} = route.params;
  const isFocused = useIsFocused();
  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isFocused && id) {
      setIsLoading(true)
      getData(id)
        .catch(err => {
          setTeam(null)
          setPlayers([])
        })
        .finally(() => setIsLoading(false))
    }
  }, [id, isFocused]);

  const getData = async (id) => {
    const team = await getTeamById(id);
    setTeam(team)
    const allPlayers = await getPlayers();
    const teamPlayers = await getPlayersByTeam(id);
    teamPlayers.map((tp) => {
      allPlayers.find((player) => player.id === tp.id).selected = true
    })
    setPlayers(allPlayers)
  }

  function selectHandler(item) {
    setPlayers(oldPlayers => [...players])
  }

  const deleteTeamHandler = () => {
    Alert.alert(
      'Suppression',
      'Voulez vous supprimer l\'équipe?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            removeTeam(id)
              .then(() => {
                navigation.navigate('TeamsScreen')
              })
              .catch(err => console.log(err))
          },
        },
      ]
    );
  }

  function saveTeamPlayer() {
    const teamPlayerIdsToSave = players.filter((player) => player.selected).map((player) => player.id)
    postTeamPlayerByTeam(team.id, teamPlayerIdsToSave)
      .then(() => {
        navigation.navigate('TeamsScreen')
      })
  }

  if(isLoading) {
    return <Loading />
  }

  if(!team) {
    return <View style={{flex:1, paddingTop: 25}}>
      <Fallback>Aucune équipe</Fallback>
    </View>
  }

  return (
    <View style={styles.screen}>
      <View style={styles.team}>
        <Text style={styles.textItem}>Equipe : {team.name}</Text>
      </View>
      <View style={styles.selectPlayers}>
        <SelectionList
          items={players}
          iconName='pluscircleo'
          iconNameSelected='minuscircleo'
          onSelectedItem={selectHandler}
        />
        { (players.length === 0) && <Fallback>Ajouter des joueurs si vous voulez pouvoir les affecter à une équipe.</Fallback>}
      </View>
      <View style={styles.buttonContainer}>
        <DeleteButton onPress={deleteTeamHandler}>Supprimer l'équipe</DeleteButton>
        <FirstActionBtn onPress={saveTeamPlayer}>Enregistrer l'équipe</FirstActionBtn>
      </View>
    </View>
  )
}

export default TeamPlayerView;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 8,
    backgroundColor: Colors.primary500
  },
  team: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.primary700,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 16
  },
  textItem: {
    fontSize: 20,
    padding: 8,
    color: 'white'
  },
  selectPlayers: {
    flex: 0.70,
  },
  buttonContainer: {
    flex: 0.3,
    marginBottom: 8
  },
  playerItemText: {
    color: 'white'
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.accent500
  },
});