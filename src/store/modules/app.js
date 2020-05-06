import Vue from "vue";
import api from "../../api";
import * as types from "./mutation-types";
import {
  LOCALSTORAGE_FAVORITE_ART_PIECES,
  LOCALSTORAGE_FAVORITES
} from "../../common/localStorage";

//NOTE:
// artPiecesList - list of art pieces from the current page - used by Home
// favoriteArtPiecesList - list of favorite art pieces - used by Favorites
// favorites - object with keys of favorite art pieces
// We keep it to not run through favoriteArtPiecesList every time we want to show artPiecesList
const state = () => ({
  loading: true,
  prev: null,
  next: null,
  page: 1,
  errors: [],
  artPiecesList: [],
  favorites: {},
  favoriteArtPiecesList: []
});

const getters = {
  getArtPiecesList: state => {
    return state.artPiecesList.map(artPiece => {
      const isFavorite = !!state.favorites[artPiece.objectNumber];
      return { ...artPiece, isFavorite };
    });
  },
  getFavoriteArtPieces: state => {
    return state.favoriteArtPieces;
  }
};

const actions = {
  async loadPage({ commit, state }) {
    const data = await api.getArtPiecesPage(state.page);
    commit(types.APP_SET_PAGE_STATE, data);
    const filteredArtPiecesList = data.artPiecesList.map(artPiece => {
      const isFavorite = !!state.favorites[artPiece.objectNumber];
      return { ...artPiece, isFavorite: isFavorite };
    });
    commit(types.APP_SET_ART_PIECES_LIST, filteredArtPiecesList);
  },
  handleFavorite({ commit }, objectNumber) {
    commit(types.APP_HANDLE_FAVORITES, objectNumber);
  },
  handleInitialData({ commit }, { favorites, favoriteArtPieces }) {
    commit(types.APP_SET_FAVORITES, favorites);
    commit(types.APP_SET_FAVORITE_ART_PIECES, favoriteArtPieces);
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
  [types.APP_SET_FAVORITE_ART_PIECES](state, favoriteArtPieces) {
    Vue.set(state, "favoriteArtPieces", favoriteArtPieces);
  },
  [types.APP_SET_FAVORITES](state, favorites) {
    Vue.set(state, "favorites", favorites);
  },
  [types.APP_HANDLE_FAVORITES](state, objectNumber) {
    const favorites = JSON.parse(localStorage.getItem(LOCALSTORAGE_FAVORITES));
    const favoriteArtPieces = JSON.parse(
      localStorage.getItem(LOCALSTORAGE_FAVORITE_ART_PIECES)
    );
    let updatedFavorites = { ...favorites };
    let updatedFavoriteArtPieces = [...favoriteArtPieces];
    updatedFavorites[objectNumber] = !favorites[objectNumber];
    if (favorites[objectNumber]) {
      updatedFavoriteArtPieces = updatedFavoriteArtPieces.filter(
        artPiece => artPiece.objectNumber !== objectNumber
      );
    } else {
      updatedFavoriteArtPieces.push({
        ...state.artPiecesList.find(
          artPiece => artPiece.objectNumber === objectNumber
        ),
        isFavorite: true
      });
    }
    const parsedFavorites = JSON.stringify(updatedFavorites);
    const parsedFavoriteArtPieces = JSON.stringify(updatedFavoriteArtPieces);
    localStorage.setItem(LOCALSTORAGE_FAVORITES, parsedFavorites);
    localStorage.setItem(
      LOCALSTORAGE_FAVORITE_ART_PIECES,
      parsedFavoriteArtPieces
    );
    Vue.set(state, "favorites", updatedFavorites);
    Vue.set(state, "favoriteArtPieces", updatedFavoriteArtPieces);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
