import {StyleSheet, View, Text, Alert} from "react-native";
import Colors from "../constants/colors";
import React, {useLayoutEffect, useState} from "react";
import {getTeamGameWithPlayers, getTeams} from "../data/services/TeamService";
import {useDispatch} from "react-redux";
import FirstActionBtn from "../components/ui/FirstActionBtn";
import {useIsFocused} from "@react-navigation/native";
import {addTeamPlayers, reInit} from "../store/gameSlice";
import Loading from "../components/common/Loading";
import SelectionList from "../components/common/SelectionList";
import Fallback from "../components/common/Fallback";

function SelectGameScreen({navigation}) {
  const [teams, setTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    if (isFocused) {
      setSelectedTeams([])
      setIsLoading(true)
      getData()
    }
  }, [isFocused]);

  function getData() {
    getTeams()
      .then(fetchedTeams => setTeams(fetchedTeams))
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }

  function goToAddTeamHandler() {
    navigation.navigate('Equipes')
  }

  function selectTeamHandler(item) {
    if(selectedTeams.findIndex((team) => team.id === item.id) === -1) {
      setSelectedTeams(oldSelectedTeams => [...oldSelectedTeams, item])
    } else {
      setSelectedTeams(oldSelectedTeams => oldSelectedTeams.filter((team) => team.id !== item.id))
    }
  }

  async function prepareGame() {
    if (!selectedTeams || selectedTeams.length !== 2) {
      Alert.alert('Erreur','Veuillez sélectionner deux équipes')
      return;
    }

    try {
      dispatch(reInit())

      const isOdd = random()
      const team1 = await getTeamGameWithPlayers(selectedTeams[0], isOdd, 0, 0)
      dispatch(addTeamPlayers(team1))
      const team2 = await getTeamGameWithPlayers(selectedTeams[1], (isOdd === 1) ? 0 : 1, 0,0)
      dispatch(addTeamPlayers(team2))
      navigation.navigate('TeamPlayers')

    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  const random = () => {
    return Math.floor(Math.random() * 2);
  }

  if(isLoading) {
    return <Loading/>
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.subtitle}>Choisir les équipes participantes</Text>
      <SelectionList
        items={teams}
        iconName='pluscircleo'
        iconNameSelected='minuscircleo'
        onSelectedItem={selectTeamHandler}
      />
      {teams.length=== 0 && <Fallback>Allez dans la section équipes pour en ajouter ;)</Fallback>}
      <FirstActionBtn onPress={prepareGame}>Valider la sélection</FirstActionBtn>
    </View>
  )
}

export default SelectGameScreen;

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
  }
})