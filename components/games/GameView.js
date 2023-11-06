import {FlatList, View, Text, StyleSheet, Alert} from "react-native";
import {CommonActions, useIsFocused, useNavigation} from "@react-navigation/native";
import {getGameDTOById, removeGame} from "../../data/services/GameService";
import {useDispatch} from "react-redux";
import {addTeamPlayers, reInit, setGame} from "../../store/gameSlice";
import {useDateFr} from "../../utils/useDateFr";
import TeamItem from "./TeamItem";
import RoundItem from "./RoundItem";
import DeleteButton from "../ui/DeleteButton";
import FirstActionBtn from "../ui/FirstActionBtn";
import Colors from "../../constants/colors";
import {useLayoutEffect, useState} from "react";
import Loading from "../common/Loading";
import {getTeamGameWithPlayers} from "../../data/services/TeamService";
import {Game} from "../../data/models/game";
import Fallback from "../common/Fallback";

function GameView({id, onDelete}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [loadedGame, setLoadedGame] = useState(null);
  const isFocused = useIsFocused()

  useLayoutEffect(() => {
    if (isFocused) {
      getData(id)
        .catch(err => {
          console.log(err)
          setLoadedGame(null)
        })
        .finally(() => setIsLoading(false))
    }
  }, [id, isFocused]);

  const getData = async (id) => {
    const game = await getGameDTOById(id)
    setLoadedGame(game)
  }

  async function replayGameHandler() {
    dispatch(reInit())
    loadedGame.teams.map((team) => {
      team.score = 0;
      team.winner = 0;
      dispatch(addTeamPlayers({...team}))
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'HomeScreen' },
            {
              name: 'TeamPlayers',
            },
          ],
        })
      );
      navigation.navigate('TeamPlayers')
    })
  }

  async function playGameHandler() {
    dispatch(reInit())
    const team1 = await getTeamGameWithPlayers(
      loadedGame.teams[0],
      loadedGame.teams[0].isOdd,
      loadedGame.teams[0].score,
      loadedGame.teams[0].winner
    )
    dispatch(addTeamPlayers(team1))
    const team2 = await getTeamGameWithPlayers(
      loadedGame.teams[1],
      loadedGame.teams[1].isOdd,
      loadedGame.teams[1].score,
      loadedGame.teams[1].winner
    )
    dispatch(addTeamPlayers(team2))
    const game= new Game(loadedGame.createdAt, null, loadedGame.id)
    dispatch(setGame({...game}))
    navigation.navigate('Game')
  }

  const deleteGameHandler = () => {
    Alert.alert(
      'Suppression',
      'Voulez vous supprimer la partie ?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            removeGame(loadedGame.id)
              .then(() => {
                onDelete()
              })
          },
        },
      ]
    );
  }

  if (isLoading) {
    return <Loading/>
  }

  if(!loadedGame) {
    return <View style={{flex:1, paddingTop: 25}}>
      <Fallback>Aucune partie</Fallback>
    </View>
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.subtitle}>Partie du {useDateFr(loadedGame.createdAt)}</Text>
      <View>
        <FlatList data={loadedGame.teams} renderItem={(itemData) => {
          return <TeamItem team={itemData.item}/>
        }}
        />
      </View>
      <FlatList data={loadedGame.rounds} renderItem={(itemData) => {
        return <RoundItem {...itemData.item} />
      }}
      />
      <View style={styles.buttonContainer}>
        <DeleteButton onPress={deleteGameHandler}>Supprimer la partie</DeleteButton>
        {loadedGame.finishedAt
          ? <FirstActionBtn onPress={replayGameHandler}>Rejouer</FirstActionBtn>
          : <FirstActionBtn onPress={playGameHandler}>Reprendre la partie</FirstActionBtn>
        }
      </View>
    </View>
  )
}

export default GameView;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Colors.primary500,
    padding: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.accent500
  },
})