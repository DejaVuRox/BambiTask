import { Dispatch } from "redux";
import { formData } from "../../screens/GameScreen";

export const GENERATED_WORD = "GENERATED_WORD";
export const SUBMITTED_WORD = "SUBMITTED_WORD";
export const HIDDEN_CHARS_WORD = "HIDDEN_CHARS_WORD";
export const SET_DIFFICULTY_LEVEL = "SET_DIFFICULTY_LEVEL";
export const GET_POINTS = "GET_POINTS";
export const RESET_POINTS = "RESET_POINTS";
export const USED_WORDS = "USED_WORDS";
export const USER_RECORDS = "USER_RECORDS";
export const SHOW_END_GAME_MODAL = "SHOW_END_GAME_MODAL";
export const GET_HIGHEST_SCORE = "GET_HIGHEST_SCORE";

export const getGeneratedWord = (word: string) => (dispatch: Dispatch) => {
  dispatch({
    type: GENERATED_WORD,
    payload: word
  });
};

export const getHiddenCharsWord = (hiddenCharsWord: string[] | undefined) => (dispatch: Dispatch) => {
  dispatch({
    type: HIDDEN_CHARS_WORD,
    payload: hiddenCharsWord ? hiddenCharsWord : ""
  });
};

export const getSubmittedWord = (guess: formData) => (dispatch: Dispatch) => {
  dispatch({
    type: SUBMITTED_WORD,
    payload: guess.userGuess
  });
};

export const setDifficultyLevel = (difficultyLevel: string) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_DIFFICULTY_LEVEL,
    payload: difficultyLevel
  });
};

export const addPoints = () => (dispatch: Dispatch) => {
  dispatch({
    type: GET_POINTS,
    payload: 1
  });
};

export const collectUsedWords = (word: string) => (dispatch: Dispatch) => {
  dispatch({
    type: USED_WORDS,
    payload: word
  });
};

export const resetPoints = () => (dispatch: Dispatch) => {
  dispatch({
    type: RESET_POINTS
  });
};

export const userRecords = (data: any) => (dispatch: Dispatch) => {
  dispatch({
    type: USER_RECORDS,
    payload: data
  });
};

export const doShowEndGameModal = (isShowing: boolean) => (dispatch: Dispatch) => {
  dispatch({
    type: SHOW_END_GAME_MODAL,
    payload: isShowing
  });
};

export const getHighestScore = () => (dispatch: Dispatch) => {
  dispatch({
    type: GET_HIGHEST_SCORE
  });
};

