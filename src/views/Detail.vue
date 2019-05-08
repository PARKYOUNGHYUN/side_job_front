<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs8>
           <v-card color="grey lighten-2">
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{detail.title}}</div>
                  <p class="subheading">{{detail.content}}</p>
                </div>
              </v-card-title>
            </v-card>
      </v-flex>
      <v-flex xs4>
        <v-card color="grey lighten-2">
          <v-card-title primary-title>
            <div>
              <div class="headline">可能時間</div>
              <p class="subheading">{{detail.content}}</p>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat dark v-if="getAuth" @click="onSubmit">Listen now</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Top',
  data: () => {
    return {
      detail: ''
    }
  },
  methods: {
    onSubmit () {
      console.log(this.$store.getters.getUserNo)
      this.$http.post('progress', {
        "epId": {
          boardNo: this.detail.boardNo,
          entryUserNo: this.$store.getters.getUserNo
        },
        entryStatus: 0
      }).then((response) => {
        console.log(response)
      })
      .catch((e) => {
        console.error(e)
      })
    }
  },
  created() {
      console.log(this.$route.params.id)
      this.$http.get('board/'+ this.$route.params.id).then((response) => {
        this.detail = response.data
        console.log(this.detail)
      }).catch((e) => {
        console.error(e)
      })
  },
  computed: {
    ...mapGetters({
      getAuth: 'getIsAuth'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
