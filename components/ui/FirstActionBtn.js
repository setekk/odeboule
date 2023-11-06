import {Pressable, StyleSheet, Text, View} from "react-native";
import Colors from "../../constants/colors";

function FirstActionBtn({ children, onPress, }) {
  function pressHandler() {
    onPress();
  }
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({pressed}) => pressed
          ? [styles.buttonInnerContainer, styles.pressed]
          : styles.buttonInnerContainer}
        onPress={pressHandler}
        android_ripple={{color: Colors.primary600}}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default FirstActionBtn;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    minHeight: 80,
    margin: 4,
    overflow: 'hidden',
    borderColor: Colors.primary500,
    borderWidth: 1,
    borderRadius: 8
  },
  buttonInnerContainer: {
    flex:1,
    justifyContent: 'center',
    backgroundColor: Colors.accent500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24 ,
  },
  pressed: {
    opacity: 0.75
  }
});