import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Input, Button, BottomSheet } from "react-native-elements";
import { RouteProp } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { hardWords, normalWords, easyWords } from "../data/words";
import { getGeneratedWord, getHiddenCharsWord, addPoints, getSubmittedWord, collectUsedWords, resetPoints, doShowEndGameModal } from "../store/actions/gameActions";
import Icon from "react-native-vector-icons/FontAwesome";
import Timer from "../components/Timer";
import MainGradient from "../components/MainGradient";
import { colors } from "../constants/colors";
import LinearGradient from "react-native-linear-gradient";

export type formData = {
  userGuess: string
}

interface IProps {
  navigation: StackNavigationProp<any, any>;
  route: RouteProp<any, any>;
  getGeneratedWord: (word: string) => void
  getHiddenCharsWord: (hiddenCharsWord: string[] | undefined) => void
  getSubmittedWord: (guess: formData) => void
  collectUsedWords: (word: string) => void
  doShowEndGameModal: (isShowing: boolean) => void
  addPoints: () => void
  resetPoints: () => void
  generatedWord: string
  hiddenCharsWord: string[]
  submittedWord: string
  difficultyLevel: string
  points: number
  usedWords: string[]
  showEndGameModal: boolean
}

const GameScreen: React.FC<IProps> = ({
                                        navigation,
                                        getGeneratedWord,
                                        generatedWord,
                                        getSubmittedWord,
                                        hiddenCharsWord,
                                        getHiddenCharsWord,
                                        difficultyLevel,
                                        addPoints,
                                        points,
                                        usedWords,
                                        collectUsedWords,
                                        showEndGameModal,
                                        doShowEndGameModal,
                                        resetPoints
                                      }) => {

  const { control, handleSubmit, formState: { errors } } = useForm<formData>();
  const [hearts, setHearts] = useState<number>(3);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [key, setKey] = useState<number>(0);

  useEffect(() => {
    const word = selectedWord();
    getGeneratedWord(word);
    getHiddenCharsWord(handleWordToGuess(word));
    setIsPlaying(true);

    return () => {
      setIsPlaying(false);
    };
  }, [points]);

  useEffect(() => {
  }, [hearts]);

  useEffect(() => {
    resetPoints();
  }, []);

  const selectedWord = () => {
    let word;

    switch (difficultyLevel) {
      case "easy":
        let easyWord = easyWords[Math.random() * easyWords.length | 0];
        //prevent using the same word
        while (usedWords.includes(easyWord)) {
          easyWord = easyWords[Math.floor(Math.random() * easyWords.length | 0)];
        }
        collectUsedWords(easyWord);
        word = easyWord;
        break;

      case "normal":
        let normalWord = normalWords[Math.floor(Math.random() * normalWords.length | 0)];
        //prevent using the same word
        while (usedWords.includes(normalWord)) {
          normalWord = normalWords[Math.floor(Math.random() * normalWords.length | 0)];
        }
        collectUsedWords(normalWord);
        word = normalWord;
        break;

      case "hard":
        let hardWord = hardWords[Math.floor(Math.random() * hardWords.length | 0)];
        //prevent using the same word
        while (usedWords.includes(hardWord)) {
          hardWord = hardWords[Math.floor(Math.random() * hardWords.length | 0)];
        }
        collectUsedWords(hardWord);
        word = hardWord;
        break;

      default:
        word = easyWords[Math.floor(Math.random() * easyWords.length | 0)];
    }

    return word;
  };

  const handleWordToGuess = (word: string) => {
    if (word) {
      switch (difficultyLevel) {
        case "easy":
          return hideRandomChars(word, 1);
        case "normal":
          return hideRandomChars(word, 2);
        case "hard":
          return hideRandomChars(word, 3);
      }
    }
    return;
  };

  const hideRandomChars = (word: string, numberOfHiddenChars: number) => {
    let splitChars = word.toUpperCase().split("");
    const usedIndex: string[] = []; //collect used index

    for (let j = 0; j < numberOfHiddenChars; j++) {
      let randomIndex = Math.floor(Math.random() * (splitChars.length - 1));

      //prevent the usage of used index and generates a new one instead
      while (usedIndex.includes(randomIndex.toString())) {
        randomIndex = Math.floor(Math.random() * (splitChars.length - 1));
      }

      //add the used index to the array
      usedIndex.push(randomIndex.toString());

      //hide chars at random index
      splitChars[randomIndex] = " _ ";
    }

    return splitChars;
  };

  const handleGuess = (userGuess: formData) => {
    getSubmittedWord(userGuess);
    const isGuessCorrect = userGuess.userGuess === generatedWord;

    if (isGuessCorrect) {
      setKey(prevKey => prevKey + 1);
      addPoints();
      points === 2 && doShowEndGameModal(true);
      console.log("correct");
    }
    else {
      setHearts(prevCount => prevCount - 1);
      hearts === 1 ? setIsPlaying(false) : null;
      hearts === 1 ? doShowEndGameModal(true) : null;
      console.log("wrong");
    }
  };

  const handleHearts = () => {
    return Array(hearts).fill(null).map((val, index) => <Icon key={index} size={23} name={"heart"} color={colors.accent} />);
  };

  const handleCloseModal = () => {
    doShowEndGameModal(false);
  };

  const handleTimesUp = () => {
    doShowEndGameModal(true);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={50}
      style={{ flex: 1 }}
    >
      <MainGradient>
        <View>
          <View style={styles.topContainer}>
            <Text style={styles.difficultyLevel}>{difficultyLevel.toUpperCase()}</Text>
            <Text style={styles.difficultyLevel}>Points: {points}</Text>

            <View style={styles.hearts}>
              {hearts > 0 && handleHearts()}
            </View>
          </View>

          <View style={styles.timerContainer}>
            <Timer timeInMsSeconds={30} handleTimerComplete={() => handleTimesUp()} isPlaying={isPlaying} resetKey={key} />
          </View>

          <LinearGradient
            style={{ borderRadius: 5, margin: 20, padding: 10 }}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            colors={[colors.primary, colors.accent]}>
            <View style={styles.wordContainer}>
              <Text style={styles.word}>{hiddenCharsWord}</Text>
            </View>
          </LinearGradient>

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                style={{ color: "#fff" }}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                placeholder="Type your guess..."
              />
            )}
            name="userGuess"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.userGuess && <View style={{ alignItems: "center" }}><Text style={{ color: "#fff" }}>You did not provide a guess </Text></View>}

          <View style={styles.btnContainer}>
            <Button
              ViewComponent={LinearGradient}
              linearGradientProps={{
                colors: [colors.orangePrimary, colors.orangeSecondary],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 }
              }}
              style={styles.btn}
              title={"CHECK THE GUESS"}
              onPress={handleSubmit((data) => handleGuess(data))} />
          </View>
        </View>

        {/*---------------------Bottom Modal--------------------------*/}
        <BottomSheet isVisible={showEndGameModal} modalProps={{}} containerStyle={{
          backgroundColor: colors.deepBlue,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 350
        }}>
          <View style={styles.BottomModal}>
            <Text style={styles.message}>You Scored: {points} points</Text>
            <Button
              ViewComponent={LinearGradient}
              linearGradientProps={{
                colors: [colors.orangePrimary, colors.orangeSecondary],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 }
              }}
              style={styles.btn}
              title={"SUBMIT SCORE"}
              onPress={() => {
                handleCloseModal();
                navigation.navigate({
                  name: "GameOverScreen",
                  params: {}
                });
              }} />
          </View>
        </BottomSheet>
      </MainGradient>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: any) => ({
  generatedWord: state.game.generatedWord,
  hiddenCharsWord: state.game.hiddenCharsWord,
  submittedWord: state.game.submittedWord,
  difficultyLevel: state.game.difficultyLevel,
  points: state.game.points,
  usedWords: state.game.usedWords,
  showEndGameModal: state.game.showEndGameModal
});

export default connect(mapStateToProps, { getGeneratedWord, getSubmittedWord, getHiddenCharsWord, addPoints, collectUsedWords, resetPoints, doShowEndGameModal })(GameScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10
  },
  hearts: {
    flexDirection: "row"
  },
  timerContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  difficultyLevel: {
    fontSize: 18,
    color: colors.green,
    fontWeight: "bold"
  },
  wordContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  word: {
    fontSize: 36,
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 4
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  btn: {
    marginTop: 10,
    width: 300
  },
  BottomModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  message: {
    color: "#fff"
  }
});
