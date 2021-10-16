<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="attrs">
        <v-slot name="activator" v-bind="attrs" />
      </template>
      <v-card>
        <v-card-title class="text-h5">
          Are you sure you want to delete this recipe?
        </v-card-title>
        <v-card-text>
          You can't undo this action.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="dialog = false">
            Remove
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    idTarget: {
      type: String,
      required: true,
    },
  },
};
</script>
