import RecipeModule from "./recipe";

export default {
  namespaced: true,

  getters: {
    snackbar: (state) => state.snackbar,
  },

  state: {
    snackbar: {
      content: "",
      attrs: {
        value: false,
      },
    },
  },

  mutations: {
    /**
     * this should be show a snackbar
     */
    setErrors(state, htmlMsg) {
      state.snackbar = {
        content: htmlMsg,
        attrs: {
          color: "red",
          dark: true,
          timeout: 4000,
        },
      };
    },
  },

  modules: {
    recipe: RecipeModule,
  },
};
