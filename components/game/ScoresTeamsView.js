import {FlatList, Pressable, StyleSheet, View} from "react-native";
import ScoreTeam from "./ScoreTeam";
import {useSelector} from "react-redux";

function ScoresTeamsView({onSelect}) {
  const teams = useSelector((state) => state.game.teamsPlayers)
  return (
    <View style={styles.screen}>
      <FlatList
        data={teams}
        renderItem={(item) => (
          <Pressable
            style={({pressed}) => [styles.item, pressed && styles.pressed]}
            onPress={onSelect.bind(this, item.item)}
          >
            <ScoreTeam
              team={item.item}
            />
          </Pressable>
        )}
        />
    </View>
  )
}

export default ScoresTeamsView;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  pressed: {
    opacity: 0.7
  },
})