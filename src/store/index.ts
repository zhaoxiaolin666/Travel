import { createStore } from "vuex";

export default createStore({
  state: {
    loginhead: "",
    loginname: "",
  },
  mutations: {
    setname(state, data) {
      state.loginhead = data.head;
      state.loginname = data.name;
    },
  },
  actions: {},
  modules: {},
});
