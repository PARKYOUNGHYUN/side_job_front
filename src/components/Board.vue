<template>
  <div class="grey lighten-3">
    <v-card>
      <v-container grid-list-lg>
        <v-layout row wrap>
          <v-flex xs4 v-for="post in posts" :key="post.boardNo" @click="goToDetail(post.boardNo)">
            <v-card color="cyan darken-2" class="white--text">
              <v-layout row>
                <v-flex xs12>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">{{ post.title }}</div>
                      <div>{{ post.content.slice(0, 200) }}</div>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <v-layout>
                <v-flex xs5>
                  <v-card-title primary-title>
                    <v-icon left>access_time</v-icon>可能期間
                  </v-card-title>
                </v-flex>
                <v-flex xs7>
                  <ul>
                    <li v-for="time in post.progressTimes" :key="time.timeNo">
                      {{ time.startAt | moment }} - {{ time.endAt | moment }}
                    </li>
                  </ul>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <v-card-title class="pa-3" v-if="post.place">
                <v-icon left>place</v-icon>
                <div v-for="place in post.place" :key="place" class="pr-2">{{ place }}</div>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: ['postType', 'condition'],
  data: () => {
    return {
      posts: []
    }
  },
  created() {
    this.createBoard();
  },
  methods: {
    createBoard () {
      this.$http.get('boards', {
        params: {
          postType: this.postType,
          limit: 0
        }
      }).then((response) => {
        this.makePosts(response.data)
      }).catch((e) => {
        console.error(e)
      })
    },
    goToDetail (id) {
      this.$router.push({
        path: '/job/Detail/' + id
      })
    },
    makePosts (response) {
      var list = []
      response.map(function(value) {
        var addrList = value.addressBook.reduce(function(a,b){
          if (a.indexOf(b.addr1) < 0 ) a.push(b.addr1)
          if (a.length > 2) {
            a.push("...")
            return a
          } 
          return a
        },[])

        var json = {
          boardNo: value.boardNo,
          title: value.title,
          content: value.content,
          place: addrList,
          progressTimes: value.user.progressTimes
        }
        list.push(json)
      })
      this.posts = list
    }
  },
  filters: {
    moment (date) {
      return moment(date).format('YYYY/MM/DD');
    }
  },
  watch: {
    postType () {
      this.createBoard()
    },
    condition () {
      console.log(this.condition)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flex {cursor: pointer;}
</style>
