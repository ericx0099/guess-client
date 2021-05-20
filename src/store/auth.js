import axios from "axios";

export default {
  namespaced: true,
  state: {
    token: null,
    user: {
      email: null,
      username: null,
      isAdmin: null,
      _id: null,
    },
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      this._vm.$cookies.set("user-token", token, "1d");
    },
    SET_USER(state, data) {
      state.user = data;
    },
    UNSET_DATA(state) {
      state.token = null;
      state.user = null;
      this._vm.$cookies.remove("user-token");
    },
  },
  actions: {
    async logout({ commit }) {
      commit('UNSET_DATA');
    },
    async login({ dispatch }, credentials) {
      var dataToAttempt = {
        token: "",
      };
      const loginData = {
        query: `
          query{
            login(email: "${credentials.email}", password: "${credentials.password}"){
              userId
              token
              tokenExpiration
            }
          }
        `,
      };
      let response = null;
      await axios
        .post("http://localhost:3000/api", loginData)
        .then((resp) => {
          response = resp;
        })
        .catch((err) => {
          this._vm.$vToastify.error({
            title: "Error",
            body: err.response.data.errors[0].message,
            type: "error",
            defaultTitle: true,
            canPause: false,
          });
        });

      if (response !== null) {
        dataToAttempt = {
          token: response.data.data.login.token,
        };
      }
      dispatch("attempt", dataToAttempt);
    },
    async checkToken({ dispatch, commit }) {
      let cookieToken = this._vm.$cookies.get("user-token");
      if (cookieToken) {
        const dataToAttempt = {
          token: cookieToken,
        };
        dispatch("attempt", dataToAttempt);
      } else {
        commit("UNSET_DATA");
      }
    },
    async attempt({ commit }, dataToAttempt) {
      commit("SET_TOKEN", dataToAttempt.token);
      const me = {
        query: `
            query{
                me{
                    _id
                    username
                    email
                    isAdmin
                }
            }
          `,
      };
      let axiosConfig = {
        headers: {
          Authorization: "Bearer " + dataToAttempt.token,
        },
      };
      let response;
      try {
        await axios
          .post("http://localhost:3000/api", me, axiosConfig)
          .then((res) => {
            response = res;
            this._vm.$vToastify.success({
              title: "Success",
              body: "Logged In!",
              type: "success",
              defaultTitle: true,
              canPause: false,
            });
          });
        commit("SET_USER", response.data.data.me);
      } catch {
        commit("SET_USER", null);
        commit("SET_TOKEN", null);
      }
    },
  },
};
