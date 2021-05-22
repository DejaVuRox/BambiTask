import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { ButtonGroup, Button } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import { setDifficultyLevel } from "../store/actions/gameActions";
import MainGradient from "../components/MainGradient";
import { colors } from "../constants/colors";

interface IProps {
  navigation: StackNavigationProp<any, any>;
  route: RouteProp<any, any>;
  setDifficultyLevel: (difficultyLevel: string) => void
  highestScore: number
}

const IntroScreen: React.FC<IProps> = ({ navigation, setDifficultyLevel, highestScore }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
  }, [highestScore]);


  const easy = () => (
    <>
      <Text style={styles.title}>EASY</Text>
      <Text style={styles.desc}>1 missing characters</Text>
    </>
  );

  const normal = () => (
    <>
      <Text style={styles.title}>NORMAL</Text>
      <Text style={styles.desc}>2 missing characters</Text>
    </>
  );

  const hard = () => (
    <>
      <Text style={styles.title}>HARD</Text>
      <Text style={styles.desc}>3 missing characters</Text>
    </>
  );


  const buttons = [{ element: easy }, { element: normal }, { element: hard }];

  const handleSelectedDifficulty = (args: any) => {
    setSelectedIndex(args);
    let difficultyLvl: string;

    switch (args) {
      case 0:
        difficultyLvl = "easy";
        break;

      case 1:
        difficultyLvl = "normal";
        break;

      case 2:
        difficultyLvl = "hard";
        break;

      default:
        difficultyLvl = "easy";
    }

    setDifficultyLevel(difficultyLvl);
  };

  return (
    <MainGradient>
      <View style={styles.container}>
        <LinearGradient
          style={{ borderRadius: 5, marginBottom: 10, padding: 30 }}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          colors={[colors.orangePrimary, colors.orangeSecondary]}>

          <View style={styles.scoreContainer}>
            <Text style={styles.highScore}>Your Current Highest Score</Text>
            <Text style={styles.score}>{highestScore}</Text>
          </View>
        </LinearGradient>

        <Text style={styles.difficultyLvl}>Set level of difficulty</Text>

        <ButtonGroup
          onPress={(args) => handleSelectedDifficulty(args)}
          selectedIndex={selectedIndex}
          buttons={buttons as []}
          containerStyle={{ height: 100, backgroundColor: colors.accent, borderColor: colors.accent }}
        />

        <Button
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: [colors.primary, colors.accent],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 }
          }}
          buttonStyle={styles.btn}
          title={"START PLAYING"}
          onPress={() => navigation.navigate({
            name: "GameScreen",
            params: {}
          })} />
      </View>
    </MainGradient>
  );
};

const mapStateToProps = (state: any) => ({
  highestScore: state.game.highestScore
});


export default connect(mapStateToProps, { setDifficultyLevel })(IntroScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  btn: {
    marginTop: 10,
    width: 300
  },
  title: {
    color: "#fff",
    fontWeight: "bold"
  },
  desc: {
    color: "#ccc"
  },
  highScore: {
    color: "#fff",
    fontSize: 24
  },
  difficultyLvl: {
    color: "#fff",
    fontSize: 24,
    textTransform: "uppercase"
  },
  scoreContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  score: {
    fontSize: 42,
    color: "#fff",
    fontWeight: "bold"
  }
});
