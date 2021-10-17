<template>
  <v-app>
    <v-app-bar src="https://picsum.photos/1920/1080?random" app dark>
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <router-link style="text-decoration: none; color: inherit" to="/" dark>
        <v-app-bar-title> Famous Recipe </v-app-bar-title>
      </router-link>

      <v-spacer />

      <v-text-field
        hide-details
        dense
        label="Keyword"
        prepend-icon="mdi-magnify"
        rounded
        outlined
        v-model="filter.keyword"
        @keyup="onFilter"
      />

      <v-spacer />

      <v-text-field
        hide-details
        dense
        label="Category"
        prepend-icon="mdi-magnify"
        rounded
        outlined
        v-model="filter.category"
        @keyup="onFilter"
      />

      <v-spacer />

      <v-btn icon :to="{ name: 'recipe-create' }">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer app>
      Abdul Aziz Al Basyir
      <v-spacer />
      Your best friend and teammate
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: function() {
    return {
      filter: {
        keyword: "",
        category: "",
      },
    };
  },

  methods: {
    onFilter: function() {
      this.$store.commit("recipe/setKeyword", this.filter.keyword);
      this.$store.commit("recipe/setType", this.filter.category);

      this.$store.dispatch("recipe/fetch");
    },
  },
};
</script>
