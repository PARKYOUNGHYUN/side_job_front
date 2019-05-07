<template>
  <v-toolbar>
    <v-toolbar-title>
      <v-btn class="font-weight-bold" flat to="/" exact>ホーム</v-btn>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
        <v-btn flat to="/mypage" v-if="getAuth">マイページ</v-btn>
        <v-btn flat color="primary" v-if="getAuth" @click="onSubmit">ログアウト</v-btn>
        <Login/>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Login from '@/components/Login'

export default {
  components: {
    Login
  },
  methods: {
    ...mapActions(['logout']),
    onSubmit () {
      this.logout()
      if(this.$route.name == 'Mypage') {
        this.$router.push({
          name: 'Top'
        })
      }
    }
  },
  computed: {
    ...mapGetters({
      errorState: 'getErrorState',
      getAuth: 'getIsAuth'
    })
  }
}
</script>

<!-- style中身は省略 -->
<style scoped>
</style>