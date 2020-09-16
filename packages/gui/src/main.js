import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.config.productionTip = false;
Vue.use(Vuex, VueAxios, axios);

const api = axios.create({
  baseURL: "http://localhost:3030/"
});

const store = new Vuex.Store({
  state: {
    auth: {},
    intents: [],
    intentsName: [],
    modifiedIntents: new Set(),
    intentsLanguage: "",
    intentsActive: { 0: "", 1: "" },
    fetching: false,
    uploading: false,
    error: false,
    selectedLanguage: "es",
    errorMsg: ""
  },
  mutations: {
    updateAuth(state, file) {
      state.auth = file;
    },
    updateIntents(state, { intents, languageCode }) {
      state.fetching = false;
      state.intents = intents;
      state.intentsName = intents
        .map(intent => ({
          name: intent.name,
          displayName: intent.displayName
        }))
        .sort((a, b) => (a.displayName > b.displayName ? 1 : -1));
      state.intentsLanguage = languageCode;
    },
    uploadFinished(state) {
      state.uploading = false;
      state.modifiedIntents = [];
    },
    errorUploading(state, reason) {
      state.errorMsg = reason;
      state.error = true;
      state.uploading = false;
    },
    errorFetching(state, reason) {
      state.errorMsg = reason;
      state.error = true;
      state.fetching = false;
    },
    fetching(state) {
      state.fetching = true;
    },
    uploadStarted(state) {
      state.uploading = true;
    },
    changeLanguage(state, e) {
      state.selectedLanguage = e;
    },
    setIntentActive(state, { id, intentName }) {
      state.intentsActive = { ...state.intentsActive, ...{ [id]: intentName } };
    },
    moveTrainingPhrase(state, { fromId, trainingPhrase }) {
      const intentActive0 = this.state.intentsActive["0"];
      const intentActive1 = this.state.intentsActive["1"];
      state.modifiedIntents = new Set([
        intentActive0,
        intentActive1,
        ...state.modifiedIntents
      ]);
      state.intents = state.intents.map(intent => {
        if (intent.name === intentActive0) {
          if (fromId === "0") {
            intent.trainingPhrases = intent.trainingPhrases.filter(
              phrase => phrase.name !== trainingPhrase.name
            );
          } else {
            intent.trainingPhrases.unshift(trainingPhrase);
          }
        } else if (intent.name === intentActive1) {
          if (fromId === "1") {
            intent.trainingPhrases = intent.trainingPhrases.filter(
              phrase => phrase.name !== trainingPhrase.name
            );
          } else {
            intent.trainingPhrases.unshift(trainingPhrase);
          }
        }
        return intent;
      });
    }
  },
  getters: {
    auth: state => state.auth,
    intents: state => state.intents,
    intentsLanguage: state => state.intentsLanguage,
    selectedLanguage: state => state.selectedLanguage,
    intentsName: state => state.intentsName,
    intentsActive: state => state.intentsActive,
    modifiedIntents: state => state.modifiedIntents
  },
  actions: {
    fetchIntents({ commit }) {
      commit("fetching");
      api
        .get("intents", {
          params: {
            languageCode: this.state.selectedLanguage
          }
        })
        .then(response =>
          commit("updateIntents", {
            intents: response.data.intents,
            languageCode: response.data.languageCode
          })
        )
        .catch(reason => commit("errorFetching", reason));
    },
    uploadIntents({ commit }) {
      commit("uploadStarted");
      api
        .put("intents", {
          languageCode: this.state.selectedLanguage,
          intents: this.state.intents.filter(intent =>
            this.state.modifiedIntents.has(intent.name)
          )
        })
        .then(() => commit("uploadFinished"))
        .catch(reason => commit("errorUploading", reason));
    }
  }
});

new Vue({
  router,
  render: h => h(App),
  vuetify,
  store
}).$mount("#app");
