/* eslint-disable */
<template>
  <div>
    <v-app-bar app color="indigo" dark>
      <v-toolbar-title>DialogFlow Intents</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-radio-group v-on:change="changeLanguage">
          <v-radio
                  selected="true"
                  :label="'es'"
                  :value="'es'"
        ></v-radio>
          <v-radio
                  :label="'en'"
                  :value="'en'"
          ></v-radio>
        </v-radio-group>
        <v-btn v-on:click="fetchIntents" color="primary">Download Intents</v-btn>
        <v-btn v-if="correctLanguage" v-on:click="uploadIntents" color="#ef6c00">Upload Intents</v-btn>
        <v-btn v-else color="#808080" style="cursor: default">Upload Intents</v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Header",
  computed: {
    correctLanguage() {
      return (
        this.$store.getters.intentsLanguage ===
        this.$store.getters.selectedLanguage
      );
    }
  },
  methods: {
    fetchIntents() {
      this.$store.dispatch("fetchIntents");
    },
    uploadIntents() {
      this.$store.dispatch("uploadIntents");
    },
    changeLanguage(e) {
      this.$store.commit("changeLanguage", e);
    }
  }
};
</script>

<style scoped></style>
