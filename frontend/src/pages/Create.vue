<template>
  <v-container>
    <!-- RECIPE FORM -->
    <recipe-form :cardAttrs="{ loading }" @submit="sendData">
      <template v-slot:header> Create Recipe </template>
    </recipe-form>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import RecipeForm from "@/components/RecipeForm.vue";

export default {
  components: {
    RecipeForm,
  },
  computed: {
    ...mapGetters({
      loading: "recipe/storing",
    }),
  },

  methods: {
    ...mapActions({
      store: "recipe/store",
    }),

    sendData(editedRecipeData) {
      this.store(editedRecipeData).then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>
