<template>
  <div>
    <v-row class="d-flex justify-center">
      <v-col
        md="4"
        sm="0"
        xs="0"
        v-if="rightCountries.length"
        class="hidden-md-and-down"
      >
        <div
          v-for="country in number"
          :key="country"
          class="justify-center d-flex my-15"
        >
          <v-btn
            @click="openLink(rightCountries[country].country)"
            :color="colors[country]"
          >
            {{ rightCountries[country].country }}
          </v-btn>
        </div>
      </v-col>
      <v-col md="4" sm="12" xs="12" class="text-center">
        <div>
          <v-img
            src="https://images.vexels.com/media/users/3/142592/isolated/preview/f89fe182edcec773c324c73f6f8c352f-isotipo-origami-letra-c-by-vexels.png"
            class="my-3"
            contain
            height="200"
          />

          <div class="mb-4">
            <h1 class="display-2 font-weight-bold mb-3">COUNTRYZ!</h1>

            <p class="subheading font-weight-regular">
              For those who like to play and learn!
            </p>
          </div>
          <div>
            <v-btn
              color="warning"
              dark
              large
              width="100%"
              @click="$router.push(getRoute())"
            >
              <span>{{ getText() }}</span>
            </v-btn>
          </div>
          <div class="mt-10">
            <v-row>
              <v-col md="12" sm="12" xs="12">
                <v-card tile elevation="11">
                  <v-row>
                    <v-col md="6" sm="6" xs="6" background-color="purple">
                      <h4 class="font-weight-black display-1 text-center">
                        Make learning awesome!
                      </h4>

                      <p class="mt-5">
                        Countryz delivers engaging learning to billions.
                      </p>
                      <v-btn @click="$router.push('/register')" color="purple"
                        >Sign Up and Learn!</v-btn
                      >
                    </v-col>
                    <v-col md="6" sm="6" xs="6">
                      <v-img
                        src="https://kahoot.com/files/2020/05/main-image-cropped.jpg"
                      >
                      </v-img>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </div>
          <v-spacer></v-spacer>
          <div class="text-center mt-15">
            <h1 class="display-2 font-weight-black">¿How it works?</h1>
          </div>
          <v-row class="mt-5">
            <v-col md="4" class="my-2" >
              <v-card>
                <v-row>
                  <v-col cols="12" >
                    <div style="background-color: #3469E4">
                      <video
                          src="https://kahoot.com/files/2019/07/kc_1.webm"
                          autoplay
                          loop
                          playsinline="true"
                          style="width:200px; height: 120px"
                      ></video>
                    </div>
                    <div class="text-center" >
                      <h1>Create</h1>
                      <p>
                        It only takes minutes to create a learning game or
                        trivia quiz on any topic, in any language.
                      </p>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col md="4" class="my-2" >
              <v-card>
                <v-row>
                  <v-col cols="12">
                    <div style="background-color: #B934E4">
                      <video
                          src="https://kahoot.com/files/2019/07/kc2_2b.webm"
                          autoplay
                          loop
                          style="width:200px; height: 120px"

                      ></video>
                    </div>
                    <div class="text-center">
                      <h1 >Share Pin</h1>
                      <p>
                        Host a live game with questions on a big screen or share
                        a game with remote players.
                      </p>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col md="4" class="my-2" >
              <v-card>
                <v-row >
                  <v-col cols="12">
                    <div style="background-color: #34E447">
                      <video
                          autoplay
                          style="width:200px; height: 120px"
                          src="https://kahoot.com/files/2019/07/kc_3.webm"
                          loop
                          preload
                      >
                      </video>
                    </div>
                    <div class="text-center">
                      <h1>Play!</h1>
                      <p>
                        Game on! Join a Countryz with a PIN provided by the host
                        and answer questions on your device.
                      </p>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-col>

      <v-col
        md="4"
        sm="0"
        xs="0"
        v-if="leftCountries.length"
        class="hidden-md-and-down"
      >
        <div
          v-for="country in number"
          :key="country"
          class="justify-center d-flex my-15"
        >
          <v-btn
            :color="colors[country]"
            @click="
              openLink(leftCountries[leftCountries.length - country].country)
            "
          >
            {{ leftCountries[leftCountries.length - country].country }}
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",

  data: () => ({
    rightCountries: [],
    leftCountries: [],
    colors: [
      "red",
      "orange",
      "green",
      "blue",
      "red",
      "orange",
      "green",
      "blue",
      "red",
      "orange",
      "green",
      "blue",
      "red",
      "orange",
      "green",
      "blue",
    ],
    number: 12,
  }),
  created() {
    const query = {
      query: `
        query{
          countries{
            name
          }
        }
      `,
    };
    axios.post(this.$apiPath, query).then((res) => {
      let countries = res.data.data.countries.map(function (country) {
        return { country: country.name };
      });
      this.rightCountries = this.shuffle(countries);
      this.leftCountries = this.rightCountries.reverse();
    });
  },
  methods: {
    shuffle(array) {
      return array.sort(() => Math.random() - 0.5);
    },
    openLink(t) {
      window.open(`https://www.google.com/search?q=${t}`);
    },
    getText() {
      if (this.$store.state.auth.user) {
        return "Play!";
      } else {
        return "Login to Play!";
      }
    },
    getRoute() {
      if (this.$store.state.auth.user) {
        return "/play";
      } else {
        return "/login";
      }
    },
  },
};
</script>

<style></style>
