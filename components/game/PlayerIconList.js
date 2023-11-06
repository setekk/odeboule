import {FlatList, StyleSheet, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";

function PlayerIconList({players, size=36}) {

  function renderItem(item) {
    return (
      <View style={styles.player}>
        <Ionicons name="person" size={size} color="white" />
        <Text style={styles.name}>{item.name.toUpperCase()}</Text>
      </View>
    )
  }

  return <FlatList
    style={styles.list}
    data={players}
    keyExtractor={(item) => item.id}
    renderItem={({item}) => (renderItem(item))}
  />
}

export default PlayerIconList;

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
  },
  player: {
    alignItems: 'center',
    padding: 12
  },
  name: {
    fontSize: 12,
    color: 'white'
  }
})