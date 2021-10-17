<template>
  <v-container>
    <RecipeCard :cardAttrs="{ loading }" v-bind="recipe" />
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
