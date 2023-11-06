import {Pressable, StyleSheet, Text, View} from "react-native";
import Colors from "../../constants/colors";
import {AntDesign} from "@expo/vector-icons";

function DeleteButton({ children, onPress, }) {
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
        <View style={styles.buttonIcon}>
          <Text style={styles.buttonText}>{children}</Text>
          <AntDesign name="delete" size={24} color="white" />
        </View>
      </Pressable>
    </View>
  );
}

export default DeleteButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    margin: 4,
    overflow: 'hidden',
    borderColor: Colors.primary500,
    borderWidth: 1,
    borderRadius: 8
  },
  buttonInnerContainer: {
    backgroundColor: Colors.accent700,
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
  },
  buttonIcon: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'flex-start'
  }
});