import Vue from "vue";
import Vuex from "vuex";
import app from "@/components/layout/store/modules/app";
import getters from "@/components/layout/store/getters";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    app
  },
  getters
});
