<template>
  <v-app>
    <v-app-bar app color="indigo" dark  class="lighten-1 white--text">
      <div class="d-flex align-center pa-2" style="cursor: pointer">
        <span @click="$router.push('/');" >Countryz</span>
      </div>
      <v-spacer></v-spacer>
      <v-btn
          color="indigo"
          dark
          class="mx-2"
          @click="$router.push('/ranking')"
      >
        <v-icon>mdi-trophy</v-icon><span class=" mx-2 hidden-sm-and-down">Ranking</span>
      </v-btn>

      <v-btn
          color="indigo"
          dark
          v-if="$store.state.auth.user"
          class="mx-2"
          @click="newQuestion"
      >
        <v-icon>mdi-comment-plus-outline</v-icon><span class=" mx-2 hidden-sm-and-down">New Question</span>
      </v-btn>
      <div class="text-center mx-2" v-if="$store.state.auth.user && $store.state.auth.user.isAdmin">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="indigo"
                dark
                v-bind="attrs"
                v-on="on"
            >
              <v-icon>mdi-credit-card</v-icon><span class="hidden-sm-and-down">Administrate</span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
                @click="$router.push('/administrate')"
            >
              <v-list-item-title>
                <v-icon>mdi-key</v-icon>
                Panel</v-list-item-title>
            </v-list-item>
            <v-list-item
              @click="toCountryAdmin"
            >
              <v-list-item-title>
                <v-icon>mdi-flag-plus-outline</v-icon>
                Add Country</v-list-item-title>
            </v-list-item>
            <v-list-item
                @click="$router.push('/admin/questions')"
            >
              <v-list-item-title>
                <v-icon>mdi-comment-question-outline</v-icon>
                Review Questions</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div class="text-center" v-if="$store.state.auth.user">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="indigo"
                dark
                v-bind="attrs"
                v-on="on"
            >
              <v-icon>mdi-account-circle</v-icon>  <span class="hidden-xs-only">{{ $store.state.auth.user.username }}</span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
                @click="$router.push('/profile')"
            >
              <v-list-item-title>
                <v-icon>mdi-face</v-icon>
                Profile</v-list-item-title>
            </v-list-item>
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
              color="indigo"
              dark
              @click="toLogin"
          >
            <span class="mr-2" v-show="$vuetify.breakpoint.md">Login</span> <v-icon>mdi-account-key</v-icon>
          </v-btn>
      </div>

      <v-btn class="mx-2"
          @click="$vuetify.theme.dark = ! $vuetify.theme.dark"
             v-if="!$store.state.auth.user"
             color="primary"
             dark
      >
        <span class="hidden-sm-and-down">Switch Mode</span> <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>

      <v-btn
          text
          class="mx-2"
          @click="$router.push('/play');"
      >
        <span class="mr-2 hidden-sm-and-down" >Play</span>
        <v-icon>mdi-gamepad-variant-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main padless>
      <router-view />
    </v-main>

    <v-footer
        dark
        padless

    >
      <v-card
          flat
          tile
          class=" indigo lighten-1 white--text text-center"
      >
        <v-card-text>
          <v-btn
              v-for="icon in icons"
              :key="icon"
              class="mx-4 white--text"
              icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Countryz</strong>
        </v-card-text>
      </v-card>
    </v-footer>
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
    username: '',
    toggleMenu: false,
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],
  }),
  created() {
    this.checkCookie()
    console.log(this.$apiPath);
    console.log(this.$socketPath);
  },
  computed: {
    showMenu() {
      return this.toggleMenu || this.$vuetify.breakpoint.mdAndUp
    }
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
    },
    newQuestion(){
      this.$router.push('/submit-question');
    }

  }
};
</script>
