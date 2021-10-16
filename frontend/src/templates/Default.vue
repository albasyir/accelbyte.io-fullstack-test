<template>
  <v-app>
    <v-app-bar src="https://picsum.photos/1920/1080?random" app dark>
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-title>
        Famous Recipe
      </v-app-bar-title>

      <v-spacer />

      <v-text-field height="100%" />

      <v-spacer />

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

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
export default {};
</script>
