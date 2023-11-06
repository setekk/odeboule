import {TouchableOpacity, Text, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

function BackButton() {

  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
    >
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <AntDesign name="arrowleft" size={20} color="grey"/>
        <Text style={{color: 'grey', paddingLeft: 4, fontSize: 12}}>Retour</Text>
      </View>

    </TouchableOpacity>
  )

}

export default BackButton;