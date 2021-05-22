import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//screens
import IntroScreen from "../screens/IntroScreen";
import GameScreen from "../screens/GameScreen";
import GameOverScreen from "../screens/GameOverScreen";
import ScoreScreen from "../screens/ScoreScreen";
import { colors } from "../constants/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { getHighestScore } from "../store/actions/gameActions";

const Stack = createStackNavigator();

interface IProps {
  getHighestScore: () => void
}

const AppNavigator: React.FC<IProps> = ({ getHighestScore }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: { backgroundColor: colors.deepBlue },
        headerTintColor: colors.green
      }}>

        <Stack.Screen
          name={"IntroScreen"}
          component={IntroScreen}
          options={{ headerShown: false }} />

        <Stack.Screen
          name={"GameScreen"}
          component={GameScreen}
          options={{ headerTitle: "" }} />

        <Stack.Screen
          name={"GameOverScreen"}
          component={GameOverScreen}
          options={({ route, navigation }) => ({
            headerTitle: "",
            headerLeft: () => (
              <Icon
                name={"home"}
                size={32}
                color={colors.green}
                style={{ marginLeft: 20 }}
                onPress={() => {
                  getHighestScore();
                  navigation.navigate({
                    name: "IntroScreen",
                    params: {}
                  });
                }} />
            )
          })} />

        <Stack.Screen
          name={"ScoreScreen"}
          component={ScoreScreen}
          options={({ route, navigation }) => ({
            headerTitle: "",
            headerLeft: () => (
              <Icon
                name={"home"}
                size={32}
                color={colors.green}
                style={{ marginLeft: 20 }}
                onPress={() => {
                  getHighestScore();
                  navigation.navigate({
                    name: "IntroScreen",
                    params: {}
                  });
                }} />
            )
          })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default connect(null, { getHighestScore })(AppNavigator);

const styles = StyleSheet.create({}
);
