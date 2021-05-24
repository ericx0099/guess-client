<template>
  <div class="fill-height">
    <v-row class="d-flex justify-center">
      <v-col cols="7" class="mt-15">
        <div class="d-flex justify-center">
          <p
            class="
              display-3
              text--primary
              font-weight-black
              text-center
              mx-auto mx-3
              align-center
            "
          >
            Countryz!
          </p>
        </div>
        <div class="mt-15">
          <v-card class="mx-auto mt-15" max-width="344">
            <v-card-text>
              <v-text-field label="Enter Game PIN" v-model="pin"></v-text-field>
              <v-btn color="warning" dark large width="100%" @click="join">
                Enter!
              </v-btn>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <div class="mt-15 text-center subtitle-1 text--primary">
      <p>
        Create your own Countryz game for FREE
        <span
          class="subtitle-1 text-decoration-underline"
          style="cursor: pointer"
          @click="
            $parent.creating = true;
            $parent.joining = false;
          "
          >here</span
        >
      </p>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="#0099ff"
        fill-opacity="1"
        d="M0,224L40,202.7C80,181,160,139,240,128C320,117,400,139,480,165.3C560,192,640,224,720,197.3C800,171,880,85,960,80C1040,75,1120,149,1200,186.7C1280,224,1360,224,1400,224L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
      ></path>
    </svg>
  </div>
</template>

<script>
export default {
  name: "join",
  data() {
    return {
      pin: null,
    };
  },
  methods: {
    join() {
      this.$parent.game_token = this.pin;
      this.$parent.join_game();

    },
  },
};
</script>

<style scoped></style>
