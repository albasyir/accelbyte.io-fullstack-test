import axios from "../../plugins/axios";
import serialize from "../../plugins/object-to-formdata";

export default {
  namespaced: true,
  getters: {
    // filter
    keyword: (state) => state.keyword,
    type: (state) => state.type,

    // data
    list: (state) => state.recipes,
    detail: (state) => state.detail,

    // loading
    listIsFetching: (state) => state.fetchingList,
    detailIsFetching: (state) => state.fetchingDetail,
    storing: (state) => state.storing,
    deleting: (state) => state.deleting,
  },
  state: {
    // filter
    keyword: "",
    type: "",

    // data
    detail: {},
    recipes: [],

    // loading
    fetchingDetail: false,
    fetchingList: false,
    storing: false,
    deleting: false,
  },
  mutations: {
    // filter
    setKeyword(state, keyword) {
      state.keyword = keyword;
    },

    setType(state, type) {
      state.type = type;
    },

    // data setters
    setList(state, list) {
      state.recipes = Array.from(list).map((recipe) => {
        recipe.id = recipe._id;
        delete recipe._id;

        recipe.photos = recipe.photos.map((photo) => {
          return process.env.RECIPE_API + photo.path;
        });

        return recipe;
      });
    },

    setDetail(state, detail) {
      detail.id = detail._id;
      delete detail._id;

      detail.photos = detail.photos.map((photo) => {
        return process.env.RECIPE_API + photo.path;
      });

      state.detail = detail;
    },

    // loading setters
    setLoadingList(state, condition) {
      state.fetchingList = condition;
    },
    setLoadingDetail(state, condition) {
      state.fetchingDetail = condition;
    },
    setStoring(state, storing) {
      state.storing = storing;
    },
    setDeleting(state, deleting) {
      state.deleting = deleting;
    },
  },
  actions: {
    fetch({ commit, getters }) {
      commit("setLoadingList", true);

      return axios
        .get("/recipe", {
          params: {
            keyword: getters.keyword,
            type: getters.type, // type means category
          },
        })
        .then((res) => {
          commit("setList", res.data);
          commit("setLoadingList", false);
          return res.data;
        })
        .catch((e) => {
          commit("setLoadingList", false);
          return Promise.reject(e);
        });
    },

    fetchOne({ commit }, id) {
      return axios
        .get("/recipe/" + id)
        .then((res) => {
          commit("setDetail", res.data);
          return res.data;
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },

    store({ commit }, freshData) {
      let formData = serialize(freshData);

      commit("setStoring", true);
      return axios
        .post("/recipe", formData)
        .then((res) => {
          commit("setStoring", false);
          return res.data;
        })
        .catch((e) => {
          commit("setStoring", false);
          return Promise.reject(e);
        });
    },

    delete({ commit }, id) {
      commit("setDeleting", true);
      return axios
        .delete("/recipe/" + id)
        .then((res) => {
          commit("setDeleting", false);
          return res.data;
        })
        .catch(() => {
          commit("setDeleting", false);
          return Promise.reject();
        });
    },

    update({ commit }, id, updatedData) {
      commit("setStoring", true);
      return axios
        .put("/recipe/" + id, updatedData)
        .then((res) => {
          commit("setStoring", false);
          return res.data;
        })
        .catch((e) => {
          commit("setStoring", false);
          return Promise.reject(e);
        });
    },
  },
};
