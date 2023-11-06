import {Alert, View, StyleSheet} from "react-native";
import Loading from "../components/common/Loading";
import PrimaryButton from "../components/ui/PrimaryButton";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {reInit} from "../store/gameSlice";
import {initDatabase} from "../data/initDatabase";
import Colors from "../constants/colors";

function SettingsScreen({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  async function reInitBddAnStore() {
    setIsLoading(true)
    try {
      await initDatabase()
      Alert.alert('Succès', 'Les données ont été réinitialisées')
      dispatch(reInit())
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }
  const reInitHandler = () => {
    Alert.alert(
      'Réinitialisation',
      'Attention vous allez supprimer toutes les données, (équipes, joueurs, parties) voulez vous continuer?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            reInitBddAnStore()
          },
        },
      ]
    );
  }

  if(isLoading) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <PrimaryButton onPress={reInitHandler}>Reinitialisation des données</PrimaryButton>
    </View>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Colors.primary500
  },
});