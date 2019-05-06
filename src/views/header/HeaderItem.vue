<template>
  <v-toolbar>
    <v-toolbar-title>
      <v-btn class="font-weight-bold" flat to="/" exact>ホーム</v-btn>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
        <v-btn flat to="/mypage">マイページ</v-btn>
        <Login/>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import Login from '@/components/Login'

export default {
  components: {
    Login
  },
  data: () => ({
    ecosystem: [
      'ログイン',
      'ログアウト'
    ]
  })
}
</script>

<!-- style中身は省略 -->
<style scoped>
</style>