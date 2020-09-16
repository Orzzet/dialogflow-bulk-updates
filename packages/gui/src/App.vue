<template>
  <v-app id="inspire">
    <Header></Header>
    <v-content>
      <v-container>
        Intents changed:
        <v-chip v-for="name in modifiedIntents" v-bind:key="name">{{
          intentDisplayName(name)
        }}</v-chip>
      </v-container>
      <v-container fluid>
        <v-layout row>
          <v-flex xs6 style="padding: 0 1em 0 1em">
            <IntentViewer id="0"></IntentViewer>
          </v-flex>
          <v-flex xs6 style="padding: 0 1em 0 1em">
            <IntentViewer id="1"></IntentViewer>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import Header from "./components/Header";
import IntentViewer from "./components/IntentViewer";
export default {
  name: "App",
  components: { IntentViewer, Header },
  computed: {
    modifiedIntents() {
      return this.$store.getters.modifiedIntents.keys();
    },
    intentDisplayName() {
      return name =>
        this.$store.getters.intentsName.find(intent => intent.name === name)
          .displayName;
    }
  },
  data: () => ({
    //
  })
};
</script>
