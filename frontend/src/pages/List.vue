<template>
  <v-container>
    <v-row>
      <v-col v-for="(recipe, key) in list" :key="key" cols="12" sm="6" md="4">
        <recipe-card
          simple-view
          :cardAttrs="{ width: '100%', height: '100%' }"
          v-bind="recipe"
          @deleted="fetch"
        />
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <recipe-card
          :cardAttrs="{ width: '100%', height: '100%' }"
          simple-view
          v-bind="{
            name: 'Your Recipe',
            category: 'Your Category',
            description:
              'Your recipe founded by your hand and making your recipe can accessable by milions person in world',
          }"
        >
          <template v-slot:overlay>
            <v-btn x-large large :to="{ name: 'recipe-create' }">
              <v-icon>mdi-plus</v-icon> add your's
            </v-btn>
          </template>
        </recipe-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RecipeCard from "@/components/RecipeCard.vue";

import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    RecipeCard,
  },

  computed: {
    ...mapGetters({
      list: "recipe/list",
      loading: "recipe/fetchingList",
    }),
  },

  methods: {
    ...mapActions({
      fetch: "recipe/fetch",
    }),
  },

  beforeMount() {
    this.fetch();
  },

  created() {
    this.$store.commit("recipe/toggleFilter", true);
  },

  beforeDestroy() {
    this.$store.commit("recipe/toggleFilter", false);
  },
};
</script>
