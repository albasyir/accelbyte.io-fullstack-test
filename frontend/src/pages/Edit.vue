<template>
  <recipe-form :value="recipe" :cardAttrs="{ loading }" @submit="sendData">
    <template v-slot:header>
      Edit Recipe
    </template>
  </recipe-form>
</template>

<script>
import RecipeForm from "../components/RecipeForm.vue";

import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    RecipeForm,
  },

  methods: {
    ...mapActions({
      fetch: "recipe/fetchOne",
      update: "recipe/update",
    }),

    sendData(editedRecipeData) {
      this.update(this.id, editedRecipeData).then(() => {
        this.$router.push("/");
      });
    },
  },

  computed: {
    ...mapGetters({
      recipe: "recipe/detail",
      loading: "recipe/detailIsFetching",
    }),

    id() {
      return this.$route.params.id;
    },
  },

  beforeMount() {
    this.fetch(this.id);
  },
};
</script>
