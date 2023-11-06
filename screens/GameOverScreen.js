import GameView from "../components/games/GameView";
import {useDispatch} from "react-redux";
import {reInit} from "../store/gameSlice";
import {useLayoutEffect} from "react";
import PrimaryButton from "../components/ui/PrimaryButton";
import {View} from "react-native";
import Colors from "../constants/colors";

function GameOverScreen({route, navigation}) {
  const {id} = route.params;
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(reInit())

  }, [navigation, id]);

  function deleteHandler() {
    navigation.navigate('HomeScreen')
  }

  return (
    <View style={{flex: 1, backgroundColor: Colors.primary500}}>
      <GameView id={id} onDelete={deleteHandler}/>
      <View style={{paddingHorizontal: 8}}>
        <PrimaryButton onPress={() => navigation.navigate('HomeScreen')}>Retour à l'accueil</PrimaryButton>
      </View>
    </View>
  )
}

export default GameOverScreen;