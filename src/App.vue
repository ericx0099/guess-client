<template>
  <v-app>
    <v-app-bar app color="primary" dark >
      <div class="d-flex align-center">
        Home
      </div>
      <v-spacer></v-spacer>
      <v-btn
          color="primary"
          dark
          v-if="$store.state.auth.user"
          class="mx-2"
      >
         <span class="mx-2">New Question</span> <v-icon>mdi-comment-plus-outline</v-icon>
      </v-btn>
      <div class="text-center mx-2" v-if="$store.state.auth.user && $store.state.auth.user.isAdmin">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
            >
              Administrate
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              @click="toCountryAdmin"
            >
              <v-list-item-title>
                <v-icon>mdi-flag-plus-outline</v-icon>
                Add Country</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div class="text-center" v-if="$store.state.auth.user">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
            >
              {{ $store.state.auth.user.username }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
                @click="$vuetify.theme.dark = ! $vuetify.theme.dark"
            >
              <v-list-item-title>
                <v-icon>mdi-theme-light-dark</v-icon>
                Switch Mode</v-list-item-title>
            </v-list-item>
            <v-list-item
            @click="doLogout"
            >
              <v-list-item-title>
                <v-icon>mdi-logout</v-icon>
                Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div v-else class="mx-2">
          <v-btn
              color="primary"
              dark
              @click="toLogin"
          >
            <span class="mr-2">Login</span> <v-icon>mdi-account-key</v-icon>
          </v-btn>
      </div>

      <v-btn class="mx-2"
          @click="$vuetify.theme.dark = ! $vuetify.theme.dark"
             v-if="!$store.state.auth.user"
             color="primary"
             dark
      >
        <span>Switch Mode</span>  <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>

      <v-btn
          text
          class="mx-2"
      >
        <span class="mr-2" >Play</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <footer>
      <footer>
        <cookie-law theme="dark-lime"></cookie-law>
      </footer>
    </footer>
  </v-app>
</template>

<script>
import {mapActions} from 'vuex';
import CookieLaw from 'vue-cookie-law';
export default {
  name: "App",
  components: {CookieLaw},

  data: () => ({
    username: ''
  }),
  created() {
    this.checkCookie()
  },
  methods: {
    ...mapActions({
      checkToken: 'auth/checkToken',
      logout: 'auth/logout'
    }),
    checkCookie () {
      this.checkToken();
    },
    doLogout() {
      this.logout();
    },
    toLogin(){
      this.$router.push('/login');
    },
    toCountryAdmin() {
      this.$router.push('/admin/countries');
    }
  }
};
</script>
