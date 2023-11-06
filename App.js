import { StatusBar } from 'expo-status-bar';
import { StyleSheet,} from 'react-native';
import {useCallback, useEffect, useState} from "react";
import {initDatabase} from "./data/initDatabase";
import {isTheVersionInstalled} from "./data/queryDatabase";
import HomeScreen from "./screens/HomeScreen";
import {NavigationContainer} from "@react-navigation/native";
import Colors from "./constants/colors";
import {Provider} from "react-redux";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import BackButton from "./components/header/BackButton";
import { store } from './store/store'
import RandomGameScreen from "./screens/RandomGameScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import PlayersScreen from "./screens/PlayersScreen";
import TeamsScreen from "./screens/TeamsScreen";
import GamesScreen from "./screens/GamesScreen";
import SettingsScreen from "./screens/SettingsScreen";
import {AntDesign} from "@expo/vector-icons";
import RulesScreen from "./screens/RulesScreen";
import TeamPlayerView from "./components/teams/TeamPlayerView";
import TeamPlayersScreen from "./screens/TeamPlayersScreen";
import GameScreen from "./screens/GameScreen";
import AddScoresScreen from "./screens/AddScoresScreen";
import GameOverScreen from "./screens/GameOverScreen";
import GameViewScreen from "./screens/GameViewScreen";
import SelectGameScreen from "./screens/SelectGameScreen";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  useEffect(() => {
    async function prepare() {
      try {
        // const dbInstance = DbInstance.getInstance();
        // dbInstance.deleteDatabase()

        // Pre-load fonts, make any API calls you need to do here
        //await Font.loadAsync(Entypo.font);
        const isBddOk = await isTheVersionInstalled()
        if (!isBddOk) {
          await initDatabase();
        }
      } catch (e) {
        await initDatabase();
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      //await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  function HomeStack() {
    return (
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: Colors.accent200,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          horizontalAlign: 'center'
        },
        headerTitleAlign: 'center',
        headerLeft: (props) => (
          props.canGoBack ? <BackButton /> : null
        ),
      }}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: "HomeScreen",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="RandomGame"
          component={RandomGameScreen}
          options={{
            title: "Tirage au sort",
          }}
        />
        <Stack.Screen
          name="SelectGame"
          component={SelectGameScreen}
          options={{
            title: "Sélection des équipes",
          }}
        />
        <Stack.Screen
          name="TeamPlayers"
          component={TeamPlayersScreen}
          options={{
            title: "Equipes",
          }}
          />
        <Stack.Screen
          name="Game"
          component={GameScreen}
          options={{
            title: "Jeu",
          }}
        />
        <Stack.Screen
          name="AddScores"
          component={AddScoresScreen}
          options={{
            title: "Ajout de score",
          }}
        />
        <Stack.Screen
          name="GameOver"
          component={GameOverScreen}
          options={{
            title: "Fin de partie",
            headerBackVisible: false,
            headerLeft: null
          }}
        />
      </Stack.Navigator>
    );
  }

  function TeamStack() {
    return (
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: Colors.accent100,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          horizontalAlign: 'center'
        },
        headerTitleAlign: 'center',
        headerLeft: (props) => (
          props.canGoBack ? <BackButton /> : null
        ),
      }}>
        <Stack.Screen
          name="TeamsScreen"
          component={TeamsScreen}
          options={{
            title: "TeamsScreen",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="TeamPlayerView"
          component={TeamPlayerView}
          options={{
            title: "Détail de l'équipe",
          }}
        />
      </Stack.Navigator>
    );
  }

  function GameStack() {
    return (
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: Colors.accent100,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          horizontalAlign: 'center'
        },
        headerTitleAlign: 'center',
        headerLeft: (props) => (
          props.canGoBack ? <BackButton /> : null
        ),
      }}>
        <Stack.Screen
          name="Games"
          component={GamesScreen}
          options={{
            title: "Parties",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="GameView"
          component={GameViewScreen}
          options={{
            title: "Détail de la partie",
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <>
      <StatusBar style="light"/>
      <Provider store={store}>
        <NavigationContainer>
          <Tab.Navigator screenOptions={{
            headerStyle: {
              backgroundColor: Colors.accent200,
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            tabBarActiveTintColor: Colors.accent200,
          }}>
            <Tab.Screen
              name="Home"
              component={HomeStack}
              options={{
                title: 'Home',
                tabBarLabel: 'Jouer',
                tabBarIcon: ({color, size}) => (
                  <AntDesign name='CodeSandbox' color={color} size={size} />
                ),
                headerShown: false
              }}
            />
            <Tab.Screen
              name="Rules"
              component={RulesScreen}
              options={{
                title: 'Règles',
                tabBarLabel: 'Règles',
                tabBarIcon: ({color, size}) => (
                  <AntDesign name='filetext1' color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Joueurs"
              component={PlayersScreen}
              options={{
                title: 'Joueurs',
                tabBarLabel: 'Joueurs',
                tabBarIcon: ({color, size}) => (
                  <AntDesign name='user' color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Equipes"
              component={TeamStack}
              options={{
                title: 'Equipes',
                tabBarLabel: 'Equipes',
                tabBarIcon: ({color, size}) => (
                  <AntDesign name='team' color={color} size={size} />
                ),
              }}

            />
            <Tab.Screen
              name="Parties"
              component={GameStack}
              options={{
                title: 'Parties',
                tabBarLabel: 'Parties',
                tabBarIcon: ({color, size}) => (
                  <AntDesign name='Trophy' color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Paramètres"
              component={SettingsScreen}
              options={{
                title: 'Paramètres',
                tabBarLabel: 'Paramètres',
                tabBarIcon: ({color, size}) => (
                  <AntDesign name='setting' color={color} size={size} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
