import api from "../../api";
import * as types from "./mutation-types";

const state = () => ({
  loading: true,
  prev: null,
  next: null,
  page: 1,
  errors: [],
  artPiecesList: [],
  favorites: []
});

const getters = {};

const actions = {
  async loadPage({ commit, state }) {
    const data = await api.getArtPiecesPage(state.page);
    commit(types.APP_SET_PAGE_STATE, data);
    commit(types.APP_SET_ART_PIECES_LIST, data.artPiecesList);
  }
};

const mutations = {
  [types.APP_SET_ERRORS](state, errors) {
    state.errors = errors;
  },
  [types.APP_SET_LOADING](state, loading) {
    state.loading = loading;
  },
  [types.APP_SET_PAGE_STATE](state, { page, prev, next }) {
    state = { ...state, page, prev, next };
  },
  [types.APP_SET_ART_PIECES_LIST](state, artPiecesList) {
    state.artPiecesList = artPiecesList;
  },
  [types.APP_ADD_FAVORITE](state, id) {
    state.favorites.push(id);
  },
  [types.APP_REMOVE_FAVORITE](state, id) {
    state.favorites.filter(favorite => favorite !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
