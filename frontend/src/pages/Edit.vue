<template>
  <v-container>
    <recipe-form
      :value="recipe"
      :cardAttrs="{ loading: loadingDetail || loadingUpdate }"
      @submit="sendData"
    >
      <template v-slot:header>
        Edit Recipe
      </template>
    </recipe-form>
  </v-container>
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
      this.update({ id: this.id, data: editedRecipeData }).then(() => {
        this.$router.push("/");
      });
    },
  },

  computed: {
    ...mapGetters({
      recipe: "recipe/detail",
      loadingDetail: "recipe/detailIsFetching",
      loadingUpdate: "recipe/updating",
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
