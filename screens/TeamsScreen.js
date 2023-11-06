import {View, StyleSheet} from "react-native";
import React, {useLayoutEffect, useState} from "react";
import {getPlayers} from "../data/services/PlayerService";
import {useIsFocused} from "@react-navigation/native";
import {getTeams, postTeam} from "../data/services/TeamService";
import Colors from "../constants/colors";
import List from "../components/common/List";
import Loading from "../components/common/Loading";
import CreateInput from "../components/common/CreateInput";

function TeamsScreen({navigation}) {
  const [loadedTeams, setLoadedTeams] = useState([]);
  const [loadedPlayers, setLoadedPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    if (isFocused) {
      setIsLoading(true)
      getData()
        .finally(() => setIsLoading(false))
    }
  } ,[isFocused]);

  const getData = async () => {
    try {
      const teams = await getTeams()
      setLoadedTeams(teams)
      const players = await getPlayers()
      setLoadedPlayers(players)
    } catch (e) {
      console.log(e)
    }
  }

  const createTeamHandler = (teamName) => {
    postTeam(teamName)
      .then(result => {
        setLoadedTeams(currentTeams => [result,...currentTeams]);
      })
      .catch(err => {
        alert('Erreur lors de la création de l\'équipe')
      });
  }

  const selectTeamHandler = (teamId) => {
    navigation.navigate('TeamPlayerView', {
      id: teamId
    })
  }

  if(isLoading || !loadedTeams) {
    return <Loading />
  }

  return (
    <View style={styles.screen}>
      <CreateInput placeholder="Saisir un nom d'équipe" onCreate={createTeamHandler} />
      <List items={loadedTeams} icon='eye' onPress={selectTeamHandler}/>
    </View>
  )
}

export default TeamsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 8,
    backgroundColor: Colors.primary500
  },
});