import { axios } from "./axiosConfig";
import * as types from "../common/apiConstants";

export default {
  getArtPiecesPage(page) {
    const { VUE_APP_REQUEST_SIZE, VUE_APP_REQUEST_API_KEY } = process.env;
    return axios({
      method: "GET",
      params: {
        page,
        size: VUE_APP_REQUEST_SIZE,
        apikey: VUE_APP_REQUEST_API_KEY
      }
    })
      .then(response => {
        const { info, records } = response.data;
        const filteredResponse = {
          prev: info.prev ? info.prev : null,
          next: info.next,
          page: info.page,
          artPiecesList: records.map(record => {
            const {
              title,
              primaryimageurl,
              people,
              objectnumber,
              dated,
              url,
              century
            } = record;
            const namesOfPeople = people
              ? people.map(artist => artist.displayname).join(", ")
              : types.UNKNOWN_AUTHOR;
            return {
              title,
              date: dated || types.UNKNOWN_DATE,
              url,
              century: century || types.UNKNOWN_CENTURY,
              namesOfPeople,
              objectNumber: objectnumber,
              primaryImageUrl: primaryimageurl
            };
          })
        };
        return Promise.resolve(filteredResponse);
      })
      .catch(error => Promise.reject(error));
  }
};
