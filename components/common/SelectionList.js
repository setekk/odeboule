import {FlatList, StyleSheet, TouchableOpacity, View, Text} from "react-native";
import Colors from "../../constants/colors";
import IconButton from "../ui/IconButton";

function SelectionList({items, iconName, iconNameSelected, onSelectedItem}) {

  function selectHandler(item) {
    item.selected = !item.selected
    onSelectedItem({id: item.id, name: item.name})
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => selectHandler(item)}
            style={{
              backgroundColor: item.selected ? Colors.accent500 : Colors.primary700,
              padding: 8,
              borderRadius: 8,
              marginBottom: 8,
              borderColor: 'gray',
            }}
          >
            <View style={styles.item}>
              <Text style={styles.textItem}>{item.name}</Text>
              <IconButton iconName={item.selected ? iconNameSelected : iconName} size={30} color='white'/>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default SelectionList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    margin: 24
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    fontSize: 20,
    padding: 8,
    color: 'white'
  }
});