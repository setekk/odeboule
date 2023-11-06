import {Button, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";

function IconButton({iconName, size, color, onPress}) {
  return (
    <View>
      <AntDesign
        name={iconName}
        size={size}
        color={color}
        onPress={onPress}
      />
    </View>
  );
}

export default IconButton;