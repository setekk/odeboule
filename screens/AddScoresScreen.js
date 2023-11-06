import {View, StyleSheet, Text} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import AddScore from "../components/game/AddScore";
import Colors from "../constants/colors";
import FirstActionBtn from "../components/ui/FirstActionBtn";
import ScoreSummary from "../components/game/ScoreSummary";
import {addRound, reInit, updateScore} from "../store/gameSlice";
import {patchFinishedAt, patchScore, postRound} from "../data/services/GameService";
import {CommonActions} from "@react-navigation/native";

function AddScoresScreen({navigation}) {
  const dispatch = useDispatch();
  const selectedTeam = useSelector((state) => state.game.selectedTeam)
  const game = useSelector((state) => state.game.game)
  const numRound = useSelector((state) => state.game.numRound)
  const [sumDicesClosestSameColor, setSumDicesClosestSameColor] = useState(0)
  const [sumDicesClosestDifferentColor, setSumDicesClosestDifferentColor] = useState(0)
  const [sumDicesDistantSameColor, setSumDicesDistantSameColor] = useState(0)
  const [step, setStep] = useState(1)
  const [scoreTotalRound, setScoreTotalRound] = useState(0)

  const instruction1 = `Somme des dés gagnants ${selectedTeam.isOdd ? 'impairs' : 'pairs'} et de même couleur que le déboulé`
  const instruction2 = `Somme des dés gagnants ${selectedTeam.isOdd ? 'impairs' : 'pairs'} et de couleur différente du déboulé`
  const instruction3 = `Somme des dés ${selectedTeam.isOdd ? 'impairs' : 'pairs'} restants de l\'équipe gagnante, de même couleur que le déboulé et à plus 2m de la zone de lancement`

  function parseEnteredScore(enteredScore) {
    const score = enteredScore.replace(/[^0-9]/g, '')
    return score === '' ? 0 : parseInt(score)
  }
  function sumDicesClosestSameColorHandler(enteredScore1) {
    const enteredScore = parseEnteredScore(enteredScore1)
    setSumDicesClosestSameColor(enteredScore)
    setScoreTotalRound(enteredScore * 2)
    setStep(2)
  }

  function sumDicesClosestDifferentColorHandler(enteredScore2) {
    const enteredScore = parseEnteredScore(enteredScore2)
    setSumDicesClosestDifferentColor(enteredScore)
    setScoreTotalRound(scoreTotalRound + enteredScore)
    setStep(3)
  }

  function sumDicesDistantSameColorHandler(enteredScore3) {
    const enteredScore = parseEnteredScore(enteredScore3)
    setSumDicesDistantSameColor(enteredScore)
    setScoreTotalRound(scoreTotalRound + enteredScore)
    setStep(4)
  }

  async function validScoresHandler() {
    try {
      //on met a jour les scores dans le store
      const scoreTotalGame = parseInt(selectedTeam.score) + scoreTotalRound
      const winner = (scoreTotalGame >= 26) ? 1 : 0
      await postRound(game.id, selectedTeam.id, scoreTotalRound, numRound)
      dispatch(addRound())
      await patchScore(scoreTotalGame, winner, game.id, selectedTeam.id)
      dispatch(updateScore({...selectedTeam, score: scoreTotalGame, winner: winner}))
      if (winner) {
        patchFinishedAt(game)
          .then(() => {
            const id = game.id;
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [
                  { name: 'HomeScreen' },
                  {
                    name: 'GameOver',
                    params: { id: id },
                  },
                ],
              })
            );
          })
          .catch(err => console.log(err))
      } else {
        navigation.navigate('Game')
      }

    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Etape {step}/4</Text>
      {step === 1 && (
        <AddScore
          instruction={instruction1}
          annotation={`(Le bonus est calculé automatiquement)`}
          onAddScore={sumDicesClosestSameColorHandler}
        />
      )}
      {step === 2 && (
        <AddScore
          instruction={instruction2}
          onAddScore={sumDicesClosestDifferentColorHandler}
        />
      )}
      {step === 3 && (
        <AddScore
          instruction={instruction3}
          onAddScore={sumDicesDistantSameColorHandler}
        />
      )}
      {step === 4 && (
        <View style={styles.container}>
          <ScoreSummary
            instruction={instruction1}
            score={`(${sumDicesClosestSameColor} * 2) = ${sumDicesClosestSameColor * 2 }`}
          />
          <ScoreSummary
            instruction={instruction2}
            score={`${sumDicesClosestDifferentColor}`}
          />
          <ScoreSummary
            instruction={instruction3}
            score={`${sumDicesDistantSameColor}`}
          />
          <View style={styles.scoreContainer}>
            <Text style={styles.total}>Total de la manche : {scoreTotalRound}</Text>
          </View>
          <View style={styles.btnContainer}>
            <FirstActionBtn onPress={validScoresHandler}>Valider le score</FirstActionBtn>
          </View>
        </View>
      )}
    </View>
  );
}

export default AddScoresScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary500,
    padding: 8,
  },
  scoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary800,
    minWidth: '100%',
    padding: 16,
    borderRadius: 8,
  },
  total: {
    fontSize: 28,
    color: 'white'
  },
  btnContainer: {
    minWidth: '100%',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.accent500
  },
});