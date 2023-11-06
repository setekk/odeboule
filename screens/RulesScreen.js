import {StyleSheet, View, FlatList, SafeAreaView} from "react-native";
import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";
import {AntDesign} from "@expo/vector-icons";
import Category from "../components/rules/Category";
import * as jsonRules from '../data/json/rules.json';

function RulesScreen() {

  const rules = jsonRules.data

  return (
    <SafeAreaView style={styles.screen}>
      <PrimaryButton onPress={() => {
        this.flatListRef.scrollToIndex({
          animated: true,
          index: 4,
        });
      }}><AntDesign name="arrowright" size={24} /> Aller à Compter les points</PrimaryButton>
      <View>
        <FlatList
          style={styles.flatList}
          ref={ref => {
            this.flatListRef = ref;
          }}
          data={rules}
          renderItem={(item) => (
            <Category part={item.item} />
          )}
          keyExtractor={item => item.key}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  )
}

export default RulesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Colors.primary500,
    padding: 20,
    paddingBottom: 50
  },
  flatList: {
    flexGrow: 0
  }
})