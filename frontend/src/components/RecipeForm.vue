<template>
  <v-container>
    <v-row>
      <v-col lg="6" cols="12">
        <v-card v-bind="cardAttrs">
          <v-card-title>
            <slot name="header" />
          </v-card-title>

          <v-form :disabled="cardAttrs.loading" ref="form">
            <v-stepper v-model="step">
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
              <v-stepper-items>
                <v-stepper-content step="1">
                  <v-text-field
                    v-model="values.name"
                    label="Name"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="values.type"
                    label="Type"
                    required
                  ></v-text-field>

                  <v-textarea
                    v-model="values.description"
                    label="Description"
                    required
                  />
                </v-stepper-content>

                <v-stepper-content step="2">
                  <v-row>
                    <v-col sm="8">
                      <v-text-field
                        v-model="tempIngredient.name"
                        label="Name"
                      />
                    </v-col>
                    <v-col sm="2" cols="4">
                      <v-text-field v-model="tempIngredient.qty" label="Qty" />
                    </v-col>
                    <v-col>
                      <v-btn @click="pushTempIngredient" x-large icon>
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-list>
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

                <v-stepper-content step="3">
                  <v-btn>
                    Add
                  </v-btn>
                </v-stepper-content>

                <v-stepper-content step="4">
                  <v-btn>
                    Add
                  </v-btn>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>

            <v-card-actions>
              <v-divider class="mx-4" />
              <v-btn text v-if="step > 1" dark color="blue" @click="step--">
                Back
              </v-btn>
              <v-btn text v-if="step < 4" color="purple" @click="step++">
                Next
              </v-btn>
              <v-btn
                :dark="valid"
                v-if="step >= 4"
                :disabled="!valid"
                color="purple"
                @click="step++"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>Preview</v-card-title>
          <v-card-text>
            <preview-card v-bind="values" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PreviewCard from "../components/RecipeCard.vue";

export default {
  components: {
    PreviewCard,
  },

  data: () => ({
    step: 1,
    valid: true,
    values: {
      name: null,
      type: null,
      description: null,
      photos: [],
      ingredients: [],
      steps: [],
    },
    tempIngredient: {
      name: null,
      qty: null,
    },
  }),

  props: {
    cardAttrs: Object,
  },

  computed: {
    stepOneCompleted() {
      return this.values.name && this.values.type && this.values.description;
    },

    stepTwoCompleted() {
      return this.values.ingredients.length > 0;
    },

    stepThreeCompleted() {
      return this.values.steps.length > 0;
    },

    stepFourCompleted() {
      return this.values.photos.length > 0;
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
  },
};
</script>
