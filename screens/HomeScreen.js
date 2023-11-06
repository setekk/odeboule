import {View, StyleSheet, ImageBackground, Image, TouchableOpacity, Text, Alert, Button} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {LinearGradient} from "expo-linear-gradient";
import Colors from "../constants/colors";
import React from "react";
import {reInit} from "../store/gameSlice";
import {removeGame} from "../data/services/GameService";
import {AntDesign} from "@expo/vector-icons";

function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentGame = useSelector((state) => state.game.game)

  function newRandomGameHandler() {
    navigation.navigate('RandomGame');
  }

  function newSelectGameHandler() {
    navigation.navigate('SelectGame');
  }

  function gameCreationModeHandler() {
    navigation.navigate('GameCreationMode');
  }

  function launchGameHandler() {
    navigation.navigate('Game');
  }

  function deleteGameHandler() {
    removeGame(currentGame.id)
      .then(() => {
        Alert.alert('Message','La partie a été supprimée')
        dispatch(reInit())
      })
  }

  return (
    <View style={styles.rootScreen}>
      <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
        <ImageBackground
          source={require('../assets/images/background.png')}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <View style={styles.logoContainer}>
            <View style={styles.imageContainer}>
              <Image source={require('../assets/images/logo.png')} style={styles.logo}/>
            </View>
          </View>
            {currentGame && (
              <>
                <View style={styles.buttonsContainer}>
                  <View style={styles.innerContainer}>
                    <TouchableOpacity style={styles.button} onPress={launchGameHandler}>
                      <AntDesign name="reload1" size={24} color="white" />
                      <Text style={styles.buttonText}>Reprendre la partie</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.innerContainer}>
                    <TouchableOpacity style={[styles.button, {backgroundColor: Colors.accent700}]} onPress={deleteGameHandler}>
                      <AntDesign name="delete" size={24} color="white" />
                      <Text style={styles.buttonText}>Supprimer la partie en cours</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
            {!currentGame && (
              <>
                <View style={styles.buttonsContainer}>
                  <View style={styles.innerContainer}>
                    <TouchableOpacity style={styles.button} onPress={newRandomGameHandler}>
                      <Text style={styles.buttonText}>JOUER</Text>
                      <Text style={styles.buttonText}>Equipes aléatoires</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.innerContainer}>
                    <TouchableOpacity style={styles.button} onPress={newSelectGameHandler}>
                      <Text style={styles.buttonText}>JOUER</Text>
                      <Text style={styles.buttonText}>Equipes existantes</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
        </ImageBackground>
      </LinearGradient>
    </View>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    justifyContent: 'center',
  },
  backgroundImage: {
    opacity: 0.15
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: Colors.primary500,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
    padding: 16
  },
  logo: {
    width: 300,
    height: 104,
    backgroundColor: Colors.primary500,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    flex: 1,
    backgroundColor: Colors.primary800,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: 'white',
  },
  buttonText: {
    color: '#fff',
    fontSize: 28,
    textAlign: 'center',
  },
  innerContainer: {
    flex: 1,
    width: '75%',
    margin: 20
  }
});