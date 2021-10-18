import axios from "@/plugins/axios";
import serialize from "@/plugins/object-to-formdata";

export default {
  namespaced: true,
  getters: {
    // filter
    keyword: (state) => state.keyword,
    category: (state) => state.category,

    // data
    list: (state) => state.recipes || null,
    detail: (state) => state.detail || null,
    disableFilter: (state) => state.disableFilter,

    categories: (state) => state.categories || null,

    // loading
    listIsFetching: (state) => state.fetchingList,
    detailIsFetching: (state) => state.fetchingDetail,
    storing: (state) => state.storing,
    deleting: (state) => state.deleting,
    updating: (state) => state.updating,
  },
  state: {
    // filter
    keyword: "",
    category: "",
    categories: ["main course", "dessert", "appetizer", "drink"],
    disableFilter: false,

    // data
    detail: {},
    recipes: [],

    // loading
    fetchingDetail: false,
    fetchingList: false,
    storing: false,
    deleting: false,
    updating: false,
  },
  mutations: {
    // filter
    setKeyword(state, keyword) {
      state.keyword = keyword;
    },

    setCategory(state, category) {
      state.category = category;
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

    cleanDetail(state) {
      state.detail = {};
    },

    toggleFilter(state, newCondition) {
      state.disableFilter = newCondition;
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
    setUpdating(state, updating) {
      state.updating = updating;
    },
  },
  actions: {
    fetch({ commit, getters }) {
      commit("setLoadingList", true);

      return axios
        .get("/recipe", {
          params: {
            keyword: getters.keyword,
            category: getters.category,
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
      commit("cleanDetail");
      commit("setLoadingDetail", true);
      return axios
        .get("/recipe/" + id)
        .then((res) => {
          commit("setDetail", res.data);
          commit("setLoadingDetail", false);
          return res.data;
        })
        .catch((e) => {
          commit("setLoadingDetail", false);
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

    update({ commit }, { id, data }) {
      let formData = serialize(data);

      commit("setUpdating", true);
      return axios
        .put("/recipe/" + id, formData)
        .then((res) => {
          commit("setUpdating", false);
          return res.data;
        })
        .catch((e) => {
          commit("setUpdating", false);
          return Promise.reject(e);
        });
    },
  },
};
