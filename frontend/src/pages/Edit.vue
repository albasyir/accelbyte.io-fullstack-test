<template>
  <v-container>
    <recipe-form
      :value="compitableRecipe"
      :cardAttrs="{ loading: loadingDetail || loadingUpdate }"
      @submit="sendData"
      @deleted="deleted"
    >
      <template v-slot:header> Edit Recipe </template>
    </recipe-form>
  </v-container>
</template>

<script>
import RecipeForm from "@/components/RecipeForm.vue";

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

    deleted() {
      this.$router.push("/");
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

    compitableRecipe() {
      if (!this.recipe) return;

      let value = this.recipe;

      if (value.photos && value.photos.length) {
        value.photos.forEach((url) => {
          if (typeof url == "string")
            this.$http.get(url, { responseType: "blob" }).then((res) => {
              let index = value.photos.indexOf(url);
              let name = url.split("/").pop();
              let format = name.split(".").pop();
              let file = new File([res.data], name, {
                type: `image/${format}`,
              });
              value.photos[index] = file;
            });
        });
      }

      return value;
    },
  },

  beforeMount() {
    this.fetch(this.id);
  },
};
</script>
