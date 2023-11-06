import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  teamsPlayers: [],
  game: null,
  numRound: 1,
  selectedTeam: null
};

export const gameSlice = createSlice({
  name: 'game',
  initialState: initialState,
  reducers: {
    addTeamPlayers: (state, action) => {
      state.teamsPlayers = [...state.teamsPlayers, action.payload]
    },
    setGame: (state, action) => {
      state.game = action.payload
    },
    setSelectedTeam: (state, action) => {
      state.selectedTeam = action.payload
    },
    updateScore: (state, action) => {
      //maj du score de la team
      const updatableTeamIndex = state.teamsPlayers.findIndex(
        (team) => team.id === action.payload.id
      );
      state.teamsPlayers[updatableTeamIndex] = { ...action.payload};
    },
    addRound: (state, action) => {
      state.numRound ++
    },
    reInit: state => {
      state.teamsPlayers = []
      state.game = null
      state.numRound = 1
      state.selectedTeam = null
    }
  },
});

export const {
  addTeamPlayers,
  setGame,
  setSelectedTeam,
  updateScore,
  addRound,
  reInit
} = gameSlice.actions;


export default gameSlice.reducer;