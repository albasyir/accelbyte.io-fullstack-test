import axios from "../../plugins/axios";

export default {
  namespaced: true,
  state: {
    list: [],
    fetching: false,
    storing: false,
    deleting: false,
  },
  mutations: {
    setList(state, list) {
      state.list = list;
    },
    setFetching(state, fetching) {
      state.fetching = fetching;
    },
    setStoring(state, storing) {
      state.storing = storing;
    },
    setDeleting(state, deleting) {
      state.deleting = deleting;
    },
  },
  actions: {
    fetch({ commit }, params) {
      commit("setFetching", true);
      return axios
        .get("/recipe", {
          params,
        })
        .then((res) => {
          commit("setList", res.data);
          commit("setFetching", false);
          return res.data;
        })
        .catch((e) => {
          commit("setFetching", false);
          return Promise.reject(e);
        });
    },

    store({ commit }, freshData) {
      commit("setStoring", true);
      return axios
        .post("/recipe", freshData)
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
