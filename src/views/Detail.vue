<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex md8>
        <v-layout row wrap>
          <v-flex md12>
            <v-card color="purple" class="white--text">
              <v-card-title class="title">{{detail.title}}</v-card-title>
              <v-card-text>{{detail.content}}</v-card-text>
              <v-divider light></v-divider>
              <v-card-title>
                <v-icon left>today</v-icon>{{this.moment(detail.updatedAt, 'YYYY/MM/DD HH:mm:ss')}}
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex md4>
        <v-layout row wrap>
          <v-flex>
            <v-layout row wrap>
              <v-flex xs6>
                <v-card color="red lighten-2" class="white--text">
                  <v-card-title>
                    <v-icon left>attach_money</v-icon>{{detail.price}}円/1時間
                  </v-card-title>
                </v-card>
              </v-flex>
              <v-flex xs6>
                <v-card color="red lighten-2" class="white--text">
                  <v-card-title>
                    <v-icon left>perm_identity</v-icon>{{applicants}}人 / {{detail.capacity}}人
                  </v-card-title>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex v-if="progressTimes">
            <v-card color="indigo" class="white--text">
              <v-card-title>
                <v-icon left>access_time</v-icon>可能期間
                  <ul class="ml-4 mt-1">
                    <li v-for="times in progressTimes" :key="times.timeNo">
                      {{times.startAt}} - {{times.endAt}}
                    </li>
                  </ul>
              </v-card-title>
            </v-card>
          </v-flex>
          <v-flex>
            <v-card color="indigo" class="white--text">
              <v-card-title>
                <v-icon left>place</v-icon>可能場所
                  <ul class="ml-5">
                    <li v-for="addr in detail.addressBook" :key="addr.addressNo">
                      {{addr.addr1}} {{addr.addr2}} {{addr.addr3}}
                    </li>
                  </ul>
              </v-card-title>
            </v-card>
          </v-flex>
          <v-flex>
            <v-card color="indigo" class="white--text">
              <v-card-title>
                <v-icon left>event_available</v-icon>応募期間
                <div class="ml-5">
                  {{this.moment(detail.entryStartAt, 'YYYY/MM/DD')}} - {{this.moment(detail.entryEndAt, 'YYYY/MM/DD')}}
                </div>
              </v-card-title>
              <v-divider light></v-divider>
              <v-card-actions>
                <v-btn color="red" flat dark class="font-weight-bold" 
                       v-if="checkNotEntryFlag" @click="onSubmit">応募する</v-btn>
                <div class="ml-3" v-if="checkEntryFlag">応募しました。</div>
                <div class="ml-3" v-if="!getAuth">ログイン後、応募可能です。</div>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  name: 'Top',
  data: () => {
    return {
      detail: '',
      entryFlag: false,
      progressTimes: null,
      applicants: 0
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
        console.log(response)
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
    },
    moment (date, format) {
      return moment(date).format(format);
    }
  },
  created() {
      this.$http.get('board/'+ this.$route.params.id).then((response) => {
        this.detail = response.data
        this.progressTimes = this.detail.user.progressTimes
        this.applicants = this.detail.entryProgress.length
        this.checkEntry()
      }).catch((e) => {
        console.error(e)
      })
  },
  computed: {
    ...mapGetters({
      getAuth: 'getIsAuth'
    }),
    checkEntryFlag () {
      return this.entryFlag && this.getAuth
    },
    checkNotEntryFlag () {
      return !this.entryFlag && this.getAuth
    }
  },
  watch: {
    getAuth () {
      this.checkEntry()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
