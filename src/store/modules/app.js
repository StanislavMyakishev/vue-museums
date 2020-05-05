import Vue from "vue";
import api from "../../api";
import * as types from "./mutation-types";

const state = () => ({
  loading: true,
  prev: null,
  next: null,
  page: 1,
  errors: [],
  artPiecesList: [],
  favorites: {}
});

const getters = {
  filteredArtPieces: state => {
    return state.artPiecesList.map(artPiece => {
      const isFavorite = !!state.favorites[artPiece.objectNumber];
      return { ...artPiece, isFavorite: isFavorite };
    });
  }
};

const actions = {
  async loadPage({ commit, state }) {
    const data = await api.getArtPiecesPage(state.page);
    commit(types.APP_SET_PAGE_STATE, data);
    commit(types.APP_SET_ART_PIECES_LIST, data.artPiecesList);
  },
  handleFavorite({ commit }, objectNumber) {
    commit(types.APP_HANDLE_FAVORITES, objectNumber);
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
  [types.APP_HANDLE_FAVORITES](state, objectNumber) {
    const favorites = { ...state.favorites };
    favorites[objectNumber] = !state.favorites[objectNumber];
    Vue.set(state, "favorites", favorites);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
