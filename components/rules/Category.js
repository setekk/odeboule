import {FlatList, StyleSheet, View} from "react-native";
import AppText from "../ui/AppText";
import Colors from "../../constants/colors";
import {generate} from "../../utils/generateUniqId";

function Category({part}) {
  return (
    <View>
      <View style={styles.category}>
        <AppText style={styles.subtitle}>{part.category}</AppText>
      </View>
      <FlatList data={part.sentences} renderItem={
        (item) => (
          <AppText style={styles.sentencesContainer}>{item.item}</AppText>
      )}
       keyExtractor={item => generate()}
      />
    </View>
  )
}

export default Category;

const styles = StyleSheet.create({
  category: {
    justifyContent: 'center',
    marginTop: 8,
  },
  title2: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: Colors.accent500,
    fontSize: 24,
    marginTop: 0
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.accent500
  },
  sentencesContainer: {
    backgroundColor: Colors.primary550,
    padding:4,
    borderRadius: 8,
  }
})