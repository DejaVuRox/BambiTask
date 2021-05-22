import {
  GENERATED_WORD,
  GET_HIGHEST_SCORE,
  GET_POINTS,
  HIDDEN_CHARS_WORD,
  RESET_POINTS,
  SET_DIFFICULTY_LEVEL,
  SHOW_END_GAME_MODAL,
  SUBMITTED_WORD,
  USED_WORDS,
  USER_RECORDS
} from "../actions/gameActions";

type Actions =
  typeof SUBMITTED_WORD
  | typeof GENERATED_WORD
  | typeof HIDDEN_CHARS_WORD
  | typeof SET_DIFFICULTY_LEVEL
  | typeof GET_POINTS
  | typeof USED_WORDS
  | typeof RESET_POINTS
  | typeof USER_RECORDS
  | typeof SHOW_END_GAME_MODAL
  | typeof GET_HIGHEST_SCORE

interface IAction {
  type: Actions
  payload: any
}

interface IState {
  generatedWord: string,
  hiddenCharsWord: string,
  submittedWord: string
  difficultyLevel: string
  usedWords: string[]
  points: number,
  userPoints: number[]
  userRecords: any[],
  showEndGameModal: boolean,
  highestScore: number
}

const initialState: IState = {
  generatedWord: "",
  hiddenCharsWord: "",
  submittedWord: "",
  difficultyLevel: "easy",
  usedWords: [],
  points: 0,
  userPoints: [],
  userRecords: [],
  showEndGameModal: false,
  highestScore: 0
};

const gameReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case GENERATED_WORD:
      return {
        ...state,
        generatedWord: action.payload
      };

    case HIDDEN_CHARS_WORD:
      return {
        ...state,
        hiddenCharsWord: action.payload
      };

    case SUBMITTED_WORD:
      return {
        ...state,
        submittedWord: action.payload
      };

    case SET_DIFFICULTY_LEVEL:
      return {
        ...state,
        difficultyLevel: action.payload
      };

    case GET_POINTS:
      return {
        ...state,
        points: state.points + action.payload
      };

    case RESET_POINTS:
      return {
        ...state,
        points: 0
      };

    case USED_WORDS:
      return {
        ...state,
        usedWords: [...state.usedWords, action.payload]
      };

    case USER_RECORDS:
      return {
        ...state,
        userPoints: [...state.userPoints, state.points],
        userRecords: [...state.userRecords, { ...action.payload, ...{ points: state.points } }]
      };

    case SHOW_END_GAME_MODAL:
      return {
        ...state,
        showEndGameModal: action.payload
      };

    case GET_HIGHEST_SCORE:
      const recordOfPoints = state.userPoints;

      if (recordOfPoints.length > 0) {
        const highestPoint = recordOfPoints.reduce((a, b) => Math.max(a, b));
        return {
          ...state,
          highestScore: highestPoint
        };
      }
      
      return {
        ...state,
        highestScore: 0
      };


    default:
      return state;
  }
};


export default gameReducer;
