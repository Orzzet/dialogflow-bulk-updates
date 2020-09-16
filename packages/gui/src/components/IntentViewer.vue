<template>
  <div>
    <v-container
      style="background: aliceblue;position: sticky;
                  top: 5em;
                  z-index: 2;"
    >
      <v-row>
        <v-autocomplete
          label="Intents"
          :items="this.$store.getters.intentsName"
          item-text="displayName"
          item-value="name"
          v-on:change="setIntentName"
        ></v-autocomplete>
        <v-spacer></v-spacer>
        <v-text-field
          :label="numberOfTP"
          placeholder="Search"
          outlined
          v-model="search"
        ></v-text-field>
      </v-row>
    </v-container>
    <v-list dense>
      <v-list-item-group color="primary">
        <v-list-item
          v-for="(item, i) in trainingPhrases"
          :key="i"
          v-on:click="moveTrainingPhrase(item)"
        >
          <v-list-item-content>
            <v-list-item-title
              v-text="item.parts.map(p => p.text).join('')"
            ></v-list-item-title>
            <v-list-item-subtitle>
              <v-chip x-small v-for="part in tpEntities(item)" v-bind:key="part">
                {{part.text}}{{part.entityType}}
              </v-chip>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "IntentViewer",
  props: {
    id: String
  },
  data: function() {
    return {
      intentName: "",
      search: "",
      numberOfTP: "Num"
    };
  },
  computed: {
    trainingPhrases() {
      const self = this;
      const intent = this.$store.getters.intents.find(
        intent => intent.name === this.intentName
      );
      if (intent) {
        if (this.search) {
          const filteredTP = intent.trainingPhrases.filter(tp =>
            tp.parts
              .map(p => p.text)
              .join("")
              .includes(this.search)
          );
          self.numberOfTP = filteredTP.length;
          return filteredTP;
        } else {
          self.numberOfTP = intent.trainingPhrases.length;
          return intent.trainingPhrases;
        }
      } else {
        self.numberOfTP = "0";
        return [];
      }
    }
  },
  methods: {
    setIntentName(intentName) {
      const id = this.id;
      this.intentName = intentName;
      this.$store.commit("setIntentActive", { id, intentName });
    },
    moveTrainingPhrase(trainingPhrase) {
      const fromId = this.id;
      this.$store.commit("moveTrainingPhrase", {
        fromId,
        trainingPhrase: JSON.parse(JSON.stringify(trainingPhrase))
      });
    },
    tpEntities(trainingPhrase) {
      return trainingPhrase.parts.filter(part => part.entityType);
    }
  }
};
</script>

<style scoped></style>
