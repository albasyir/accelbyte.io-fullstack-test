<template>
  <v-app>
    <v-app-bar src="https://picsum.photos/1920/1080?random" app dark>
      <!-- APP BAR BACKROUD -->
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <!-- TITLE -->
      <router-link style="text-decoration: none; color: inherit" to="/" dark>
        <v-app-bar-title> Famous Recipe </v-app-bar-title>
      </router-link>

      <v-spacer />

      <template v-if="disableFilter">
        <!-- KEYWORD FILTER -->
        <v-text-field
          :loading="searchLoading"
          hide-details
          dense
          label="Keyword"
          prepend-icon="mdi-magnify"
          rounded
          outlined
          v-model="filter.keyword"
          @keyup="onFilter"
          @click:clear="clearKeyword"
          clearable
        />

        <v-spacer />

        <!-- CATEGORY FILTER -->
        <v-select
          :loading="searchLoading"
          hide-details
          dense
          label="Category"
          prepend-icon="mdi-magnify"
          outlined
          :items="$store.getters['recipe/categories']"
          clearable
          v-model="filter.category"
          @change="onFilter"
        />
      </template>

      <v-spacer />

      <!-- ADD BUTTON -->
      <v-btn icon :to="{ name: 'recipe-create' }">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- MAIN APPLICATION WARPER -->
    <v-main>
      <router-view />
    </v-main>

    <!-- SNACKBAR -->
    <v-snackbar v-model="snackbarShow" v-bind="snackbar.attrs">
      <div v-html="snackbar.content" />
      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          dark
          text
          v-bind="attrs"
          @click="snackbarShow = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <!-- FOOTER -->
    <v-footer app>
      Abdul Aziz Al Basyir
      <v-spacer />
      Your best friend and teammate
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: function () {
    return {
      filter: {
        keyword: "",
        category: "",
      },
      snackbarShow: false,
    };
  },

  computed: {
    snackbar: function () {
      this.snackbarShow = false;
      this.snackbarShow = true;
      return this.$store.getters.snackbar;
    },

    searchLoading() {
      return this.$store.getters["recipe/fetchingList"];
    },

    disableFilter() {
      return this.$store.getters["recipe/disableFilter"];
    },
  },

  methods: {
    clearKeyword() {
      this.filter.keyword = "";
      this.onFilter();
    },
    onFilter: function () {
      if (this.$route.path != "/") this.$router.push("/");

      this.$store.commit("recipe/setKeyword", this.filter.keyword);
      this.$store.commit("recipe/setCategory", this.filter.category);

      this.$store.dispatch("recipe/fetch");
    },
  },

  mounted() {
    this.snackbarShow = false;
  },
};
</script>
