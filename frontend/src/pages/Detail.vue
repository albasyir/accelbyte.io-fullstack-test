<template>
  <v-container>
    <!-- RECIPE CARD -->
    <RecipeCard @deleted="home" :cardAttrs="{ loading }" v-bind="recipe" />
  </v-container>
</template>

<script>
import RecipeCard from "@/components/RecipeCard.vue";

import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    RecipeCard,
  },

  methods: {
    ...mapActions({
      fetch: "recipe/fetchOne",
    }),

    back() {
      this.$router.go(-1);
    },

    home() {
      this.$router.push("/");
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
    this.fetch(this.id).catch(this.back);
  },
};
</script>
