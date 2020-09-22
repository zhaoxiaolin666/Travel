import { createStore } from "vuex";

export default createStore({
  state: {
    loginhead: "", //登录头像
    loginname: "", //登录名字
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
