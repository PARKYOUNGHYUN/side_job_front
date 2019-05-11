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
            <v-btn dark color="info" v-if="checkNotEntryFlag" @click="onSubmit">応募する</v-btn>
            <p v-if="checkEntryFlag" >応募しました。</p>
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
      detail: '',
      entryFlag: false
    }
  },
  methods: {
    onSubmit () {
      this.$http.put('progress', {
        "epId": {
          boardNo: this.detail.boardNo,
          entryUserNo: this.$store.getters.getUserNo
        },
        entryStatus: 0
      }).then((response) => {
        this.entryFlag = true
      })
      .catch((e) => {
        console.error(e)
      })
    },
    checkEntry () {
      if(!this.getAuth)
        return
      this.$http.get('progress', {
        params: {
          boardNo: this.detail.boardNo,
          entryUserNo: this.$store.getters.getUserNo
        }
      }).then((response) => {
        if(response.data)
          this.entryFlag = true
      }).catch((e) => {
        console.error(e)
      })
    }
  },
  created() {
      this.$http.get('board/'+ this.$route.params.id).then((response) => {
        this.detail = response.data
        console.log(this.detail)
        this.checkEntry()
      }).catch((e) => {
        console.error(e)
      })
  },
  computed: {
    ...mapGetters({
      getAuth: 'getIsAuth'
    }),
    checkEntryFlag: function () {
      return this.entryFlag && this.getAuth
    },
    checkNotEntryFlag: function () {
      return !this.entryFlag && this.getAuth
    }
  },
  watch: {
    getAuth: function () {
      this.checkEntry()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
