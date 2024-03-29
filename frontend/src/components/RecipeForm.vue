<!-- RECIPE FORM -->
<template>
  <v-row>
    <!-- FORM SIDE -->
    <v-col lg="6" cols="12">
      <v-card v-bind="cardAttrs">
        <!-- FORM TITLE -->
        <v-card-title>
          <slot name="header" />
        </v-card-title>

        <!-- THE FORM -->
        <v-form :disabled="formDisabled" ref="form">
          <!-- STEPPER -->
          <v-stepper v-model="step">
            <!-- STEP NAV -->
            <v-stepper-header>
              <v-stepper-step :complete="stepOneCompleted" step="1">
                Summary
              </v-stepper-step>

              <v-stepper-step :complete="stepTwoCompleted" step="2">
                Ingredients
              </v-stepper-step>

              <v-stepper-step :complete="stepThreeCompleted" step="3">
                Steps
              </v-stepper-step>

              <v-stepper-step :complete="stepFourCompleted" step="4">
                Photos
              </v-stepper-step>
            </v-stepper-header>

            <!-- STEP CONTENT -->
            <v-stepper-items>
              <!-- SUMMARY STEP -->
              <v-stepper-content step="1">
                <v-text-field
                  class="pt-1"
                  outlined
                  dense
                  v-model="values.name"
                  label="Name"
                  required
                ></v-text-field>

                <v-select
                  :items="categories"
                  v-model="values.category"
                  label="Category"
                  outlined
                  required
                  dense
                ></v-select>

                <v-textarea
                  outlined
                  dense
                  v-model="values.description"
                  label="Description"
                  required
                />
              </v-stepper-content>

              <!-- INGREDIENTS STEP -->
              <v-stepper-content step="2">
                <v-row dense class="pt-1">
                  <v-col sm="8">
                    <v-text-field
                      outlined
                      dense
                      v-model="tempIngredient.name"
                      label="Name"
                    />
                  </v-col>
                  <v-col sm="2" cols="4">
                    <v-text-field
                      outlined
                      dense
                      v-model="tempIngredient.qty"
                      label="Qty"
                    />
                  </v-col>
                  <v-col>
                    <v-btn @click="pushTempIngredient" icon>
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
                <v-list dense>
                  <v-list-item
                    v-for="(ingredient, key) in values.ingredients"
                    :key="key"
                    two-line
                  >
                    <v-list-item-content>
                      <v-list-item-title>{{
                        ingredient.name
                      }}</v-list-item-title>
                      <v-list-item-subtitle>{{
                        ingredient.qty
                      }}</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-btn icon @click="deleteIngredient(key)">
                        <v-icon color="red lighten-1">mdi-close</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-stepper-content>

              <!-- STEPS STEP -->
              <v-stepper-content step="3">
                <v-textarea
                  class="pt-1"
                  outlined
                  dense
                  label="Step"
                  v-model="tempStep"
                  height="80px"
                />
                <v-btn @click="pushTempStep"> Add Step </v-btn>

                <v-list dense>
                  <v-list-item
                    v-for="(step, key) in values.steps"
                    :key="key"
                    two-line
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        Step {{ key + 1 }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ step }}
                      </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-btn icon @click="deleteStep(key)">
                        <v-icon color="red lighten-1">mdi-close</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-stepper-content>

              <!-- PHOTOS STEP -->
              <v-stepper-content step="4">
                <v-row dense class="mt-1">
                  <template v-for="(photo, key) in values.photos">
                    <v-col sm="10" :key="key + 'input'">
                      <v-file-input
                        accept="image/png, image/jpeg"
                        :rules="rules.photos"
                        prepend-icon="mdi-camera"
                        :label="'Upload Cover Picture ' + (key + 1)"
                        truncate-length="15"
                        dense
                        outlined
                        v-model="values.photos[key]"
                      />
                    </v-col>
                    <v-col :key="key + 'remove'">
                      <v-btn color="red" icon @click="removePicture(key)">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-col>
                  </template>
                </v-row>
                <v-btn class="ma-1" @click="appendPicture">
                  Add Other Photo
                </v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>

          <v-card-actions>
            <v-divider class="mx-4" />
            <!-- BACK BUTTON -->
            <v-btn text v-if="step > 1" dark color="blue" @click="step--">
              Back
            </v-btn>

            <!-- NEXT BUTTON -->
            <v-btn text v-if="step < 4" color="purple" @click="step++">
              Next
            </v-btn>

            <!-- SAVE BUTTON -->
            <v-btn
              :dark="valid"
              v-if="step >= 4"
              :disabled="!valid"
              color="purple"
              @click="submit"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>

    <!-- PREVEW SIDE -->
    <v-col lg="6" cols="12">
      <v-card>
        <v-card-title>
          Card Preview
          <v-divider class="mx-2" />
        </v-card-title>

        <!-- CARD PREVIEW -->
        <v-card-text>
          <preview-card @deleted="deleted" :tab="step - 1" v-bind="values" />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import PreviewCard from "./RecipeCard.vue";

export default {
  components: {
    PreviewCard,
  },

  data: () => ({
    step: 1,
    values: {
      name: null,
      category: null,
      description: null,
      photos: [null],
      ingredients: [],
      steps: [],
    },
    tempIngredient: {
      name: null,
      qty: null,
    },
    rules: {
      photos: [
        (v) => !!v || "Please upload image or delete this row",
        (v) => (v && v.size < 10000000) || "Size less than 10 MB",
      ],
    },
    tempStep: null,
  }),

  props: {
    /**
     * For bind the card
     *
     */
    cardAttrs: Object,

    /**
     * This props will init the data when the component is mounted.
     * btw this prop will work with v-model
     *
     * for format please see :
     *
     * ```
     * {
     *  name: String,
     *  category: String,
     *  description: String,
     *  photos: File[],
     *  ingredients: { name: String, qty: String }[],
     *  steps: String[],
     * }
     * ```
     */
    value: {
      required: false,
    },
  },

  watch: {
    value: {
      handler() {
        this.values = this.value;
      },
      deep: true,
    },
  },

  computed: {
    formDisabled() {
      return !!this.cardAttrs?.loading;
    },

    categories() {
      return this.$store.getters["recipe/categories"];
    },

    stepOneCompleted() {
      return (
        !!this.values.name &&
        !!this.values.category &&
        !!this.values.description
      );
    },

    stepTwoCompleted() {
      return this.values.ingredients.length > 0;
    },

    stepThreeCompleted() {
      return this.values.steps.length > 0;
    },

    stepFourCompleted() {
      return this.values.photos.length > 0 && this.values.photos[0] != null;
    },

    valid() {
      return (
        this.stepOneCompleted &&
        this.stepTwoCompleted &&
        this.stepThreeCompleted &&
        this.stepFourCompleted
      );
    },
  },

  methods: {
    deleted(attrs) {
      this.$emit("deleted", attrs);
    },

    submit() {
      if (this.valid) this.$emit("submit", this.values);
    },

    pushTempIngredient() {
      let data = { ...this.tempIngredient };
      this.values.ingredients.push(data);

      this.tempIngredient.name = null;
      this.tempIngredient.qty = null;
    },

    deleteIngredient(key) {
      this.values.ingredients.splice(key, 1);
    },

    pushTempStep() {
      this.values.steps.push(this.tempStep);
      this.tempStep = null;
    },

    deleteStep(key) {
      this.values.steps.splice(key, 1);
    },

    removePicture(key) {
      if (this.values.photos.length > 1) {
        this.values.photos.splice(key, 1);
      } else {
        this.values.photos[0] = null;
      }
    },

    appendPicture() {
      this.values.photos.push(null);
    },
  },
};
</script>
