import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import IconButton from "../ui/IconButton";
import Colors from "../../constants/colors";

function List({items, icon, onPress}) {
  function renderItem(item) {
    return (
      <TouchableOpacity
        onPress={() => onPress(item.id)}
      >
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.name}</Text>
        <IconButton iconName={icon} size={30} color='white'/>
      </View>
    </TouchableOpacity>
    )
  }
  return <FlatList
    style={styles.list}
    data={items}
    keyExtractor={(item) => item.id}
    renderItem={({item}) => (renderItem(item))}
  />
}

export default List;

const styles = StyleSheet.create({
  list: {
    margin: 8
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.primary700,
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    borderColor: 'gray',
  },
  textItem: {
    fontSize: 20,
    padding: 8,
    color: 'white'
  }
});