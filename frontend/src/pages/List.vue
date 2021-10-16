<template>
  <v-container>
    <v-row>
      <v-col v-for="(recipe, key) in list" :key="key" cols="12" sm="12" md="4">
        <recipe-card :cardAtttrs="{ width: '100%' }" v-bind="recipe" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RecipeCard from "../components/RecipeCard.vue";

export default {
  name: "List",
  components: {
    RecipeCard,
  },

  computed: {
    list() {
      return [
        {
          id: "1",
          name: "Spaghetti Carbonara",
          type: "main course",
          photos: ["https://cdn.vuetifyjs.com/images/cards/cooking.png"],
          description:
            "Discover how to make superb spaghetti carbonara. This cheesy pasta dish is an Italian favourite and with the right technique, you can make it perfect every time",
        },
        {
          id: "2",
          name: "Spaghetti Carbonara 2",
          type: "main course",
          photos: ["https://cdn.vuetifyjs.com/images/cards/cooking.png"],
          description:
            "Discover how to make superb spaghetti carbonara. This cheesy pasta dish is an Italian favourite and with the right technique, you can make it perfect every time",
        },
      ];
    },
  },
};
</script>
