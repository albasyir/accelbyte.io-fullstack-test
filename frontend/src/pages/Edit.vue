<template>
  <recipe-form :cardAttrs="{ loading }" @submit="sendData">
    <template v-slot:header>
      Edit Recipe
    </template>
  </recipe-form>
</template>

<script>
import RecipeForm from "../components/RecipeForm.vue";

export default {
  data: () => ({
    loading: true,
  }),

  components: {
    RecipeForm,
  },

  computed: {
    target() {
      return this.$route.params.id;
    },
  },

  beforeMount() {
    // this.fetchRecipe();
  },

  methods: {
    fetchRecipe() {
      return this.$store.dispatch("recipe/fetch", this.target);
    },

    sendData(editedRecipeData) {
      console.log(editedRecipeData);
    },
  },
};
</script>
