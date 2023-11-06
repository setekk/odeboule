import {StyleSheet, View, Text, TouchableOpacity, FlatList} from "react-native";
import Colors from "../constants/colors";
import {useLayoutEffect, useState} from "react";
import {useIsFocused} from "@react-navigation/native";
import IconButton from "../components/ui/IconButton";
import {useDateFr} from "../utils/useDateFr";
import {getGames} from "../data/services/GameService";

function GamesScreen({navigation}) {
  const isFocused = useIsFocused();
  const [loadedGames, setLoadedGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    if (isFocused) {
      setIsLoading(true)
      getData()
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false))
    }
  }, [isFocused]);
  const getData = async () => {
    const games = await getGames()
    setLoadedGames(games)
  }

  const selectGameHandler = (id) => {
    navigation.navigate('GameView', {
      id: id
    })
  }

  if(isLoading || !loadedGames) {
    return (
      <View style={styles.screen}>
        <Text>Chargement...</Text>
      </View>
    )
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={loadedGames}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => selectGameHandler(item.id)}
            style={{
              padding: 8,
              borderRadius: 8,
              marginBottom: 8,
              borderColor: 'gray',
              backgroundColor: Colors.primary700,
            }}
          >
            <View style={styles.item}>
              <Text style={styles.itemText}>{useDateFr(item.createdAt)}</Text>
              <IconButton iconName='eye' size={30} color='white'/>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default GamesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 8,
    backgroundColor: Colors.primary500
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    color: 'white'
  }
});
