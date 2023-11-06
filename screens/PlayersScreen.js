import {View, StyleSheet} from "react-native";
import React, {useLayoutEffect, useState} from "react";
import Colors from "../constants/colors";
import {getPlayers, postPlayer, removePlayer} from "../data/services/PlayerService";
import Loading from "../components/common/Loading";
import List from "../components/common/List";
import CreateInput from "../components/common/CreateInput";
import {useIsFocused} from "@react-navigation/native";

function PlayersScreen() {
  const [loadedPlayers, setLoadedPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    if (isFocused) {
      setIsLoading(true)
      getData()
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false))
    }
  }, [isFocused]);

  const getData = async () => {
    const players = await getPlayers()
    setLoadedPlayers(players)
  }

  const createPlayerHandler = (playerName) => {
    postPlayer(playerName)
      .then(result => {
        setLoadedPlayers(currentPlayers => [result,...currentPlayers]);
      })
      .catch(err => {
        alert('Erreur lors de la création du joueur')
        console.log(err)
      });
  }

  const deletePlayerHandler = (id) => {
    removePlayer(id)
      .then(() => {
        const updatedItems = loadedPlayers.filter(item => item.id !== id)
        setLoadedPlayers(updatedItems)
      })
  }

  if(isLoading || !loadedPlayers) {
    return <Loading />
  }

  return (
    <View style={styles.screen}>
      <CreateInput placeholder="Saisir un nom de joueur" onCreate={createPlayerHandler} />
      <List items={loadedPlayers} icon='delete' onPress={deletePlayerHandler}/>
    </View>
  )
}

export default PlayersScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 8,
    backgroundColor: Colors.primary500
  },
});