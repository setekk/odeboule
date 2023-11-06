import GameView from "../components/games/GameView";

function GameViewScreen({route, navigation}) {
  const {id} = route.params;

  function deleteHandler() {
    navigation.navigate('Games')
  }

  return (
    <GameView id={id} onDelete={deleteHandler}/>
  )
}

export default GameViewScreen;