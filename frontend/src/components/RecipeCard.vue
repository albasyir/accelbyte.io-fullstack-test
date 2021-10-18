<template>
  <v-card class="d-flex flex-column" :loading="loading" v-bind="cardAttrs">
    <v-overlay absolute v-if="hasOverlaySlot">
      <slot name="overlay" />
    </v-overlay>

    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-card-title v-text="name || '-'" />

    <v-card-subtitle>
      {{ category || "-" }}
    </v-card-subtitle>

    <v-carousel
      cycle
      height="200"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-sheet
        v-if="!compatiblePhotos || compatiblePhotos.length < 1"
        color="green"
        height="100%"
      >
        <v-row class="fill-height" align="center" justify="center">
          <div class="text-h5">
            Your Amazing Recipe
          </div>
        </v-row>
      </v-sheet>

      <v-carousel-item
        v-for="(photo, key) in compatiblePhotos"
        :key="key"
        :src="photo"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>

    <v-tabs v-model="activeTab" v-if="!simpleView">
      <v-tab>
        Description
      </v-tab>
      <v-tab>
        Ingredients
      </v-tab>
      <v-tab>
        Steps
      </v-tab>
    </v-tabs>

    <v-card-text>
      <div v-if="simpleView" v-text="description || '-'" />
      <v-tabs-items v-else v-model="activeTab">
        <v-tab-item>
          <div v-text="description || '-'" />
        </v-tab-item>

        <v-tab-item>
          <v-chip-group>
            <v-chip v-for="(ingredient, key) in ingredients" :key="key">
              {{ ingredient.qty }} {{ ingredient.name }}
            </v-chip>
          </v-chip-group>
        </v-tab-item>

        <v-tab-item>
          <v-list>
            <v-list-item v-for="(step, key) in steps" :key="key">
              <v-list-item-content>
                <v-list-item-title>Step {{ key + 1 }}</v-list-item-title>
                <v-list-item-subtitle>{{ step }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>

    <v-spacer></v-spacer>

    <v-card-actions v-if="id">
      <v-divider class="mx-4"></v-divider>

      <v-menu bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" color="deep-red lighten-2" text>
            Delete
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            Are you sure?
          </v-card-title>

          <v-card-text>
            This action cannot be undone.
          </v-card-text>

          <v-card-actions>
            <v-divider class="mx-2" />
            <v-btn @click="deleteRecipe(id)" dark color="red">
              <v-icon left>
                mdi-delete
              </v-icon>
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>

      <v-btn
        :to="{ name: 'recipe-edit', params: { id } }"
        color="blue lighten-2"
        text
      >
        Edit
      </v-btn>

      <v-btn
        :to="{ name: 'recipe-detail', params: { id } }"
        color="deep-purple lighten-2"
        dark
      >
        View
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    showDeleteConfrim: false,
    activeTab: 0,
  }),

  computed: {
    hasOverlaySlot() {
      return !!this.$slots["overlay"];
    },

    compatiblePhotos() {
      return this.photos?.reduce((photos, photo, key) => {
        if (!photo) return photos;

        if (typeof photo == "string") {
          photos[key] = photo;
        } else {
          photos[key] = URL.createObjectURL(photo);
        }

        return photos;
      }, []);
    },

    loading() {
      return this.$store.getters["recipe/deleting"];
    },
  },

  methods: {
    deleteRecipe(id) {
      this.$store.dispatch("recipe/delete", id).then(() => {
        this.$emit("deleted", this.$attrs);
      });
    },
  },

  watch: {
    tab(newVal) {
      this.activeTab = newVal;
    },
  },

  props: {
    tab: {
      type: [Number, String],
      default: "0",
    },

    simpleView: {
      type: Boolean,
      default: false,
    },

    cardAttrs: {
      type: Object,
      default: () => ({}),
    },

    id: {
      type: [Number, String],
      default: undefined,
    },

    name: {
      type: String,
      default: undefined,
    },

    category: {
      type: String,
      default: undefined,
    },

    photos: {
      type: Array,
      default: undefined,
    },

    description: {
      type: String,
      default: undefined,
    },

    steps: {
      type: Array,
      default: () => undefined,
    },

    ingredients: {
      type: Array,
      default: () => undefined,
    },
  },
};
</script>
