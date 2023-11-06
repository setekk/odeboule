import {AntDesign} from "@expo/vector-icons";
import {View, Text, StyleSheet} from "react-native";

function TeamIcon({name, size, color, textStyle, isOdd}) {

  return (
    <View style={styles.team}>
      <AntDesign name="team" size={size} color={color} />
      <Text style={[styles.name, textStyle]}>{name}</Text>
    </View>
  )

}

export default TeamIcon;

const styles = StyleSheet.create({
  team: {
    alignItems: 'center'
  },
  name: {
    fontSize: 24
  }
})