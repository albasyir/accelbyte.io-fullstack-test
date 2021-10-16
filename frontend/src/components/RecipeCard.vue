<template>
  <v-card v-bind="cardAtttrs">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="200"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title v-text="name || '-'" />

    <v-card-subtitle>
      {{ type || "-" }}
    </v-card-subtitle>

    <v-card-text>
      <div v-text="description || '-'" />
    </v-card-text>

    <v-card-actions v-if="id">
      <v-divider class="mx-4"></v-divider>

      <v-btn @click="showDeleteConfrim" color="deep-red lighten-2" text>
        Delete
      </v-btn>

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
    deleteConfrim: {
      id: null,
    },
  }),

  methods: {
    showDeleteConfrim() {},
  },

  props: {
    cardAtttrs: {
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

    type: {
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
