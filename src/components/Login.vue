<template>
  <v-dialog v-model="dialog" persistent max-width="600px" v-if="!getAuth">
    <template v-slot:activator="{ on }">
      <v-btn flat color="primary" v-on="on">ログイン</v-btn>
    </template>
    <v-card>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 v-if="errorState">
                <v-alert :value="true" type="error" outline>{{ errorState }}</v-alert>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="email" :rules="emailRules" label="メールアドレス" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="password" :append-icon="show ? 'visibility' : 'visibility_off'" :rules="passwordRules"
                :type="show ? 'text' : 'password'" name="input-10-1" label="パスワード" @click:append="show = !show"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="resetValidation">キャンセル</v-btn>
        <v-btn color="blue darken-1" flat :disabled="!valid" @click="onSubmit">ログイン</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data: () => {
    return {
      valid: true,
      dialog: false,
      show: false,
      password: 'yhtest8',
      passwordRules: [
        v => !!v || '必須項目です。',
        v => v.length >= 3 || '8字以上入力してください。'
      ],
      email: 'yhtest8@test.co.jp',
      emailRules: [
        v => !!v || '必須項目です。',
        v => /.+@.+/.test(v) || '有効なメールアドレスではありません。'
      ]
    }
  },
  methods: {
    ...mapActions(['login']),
    async onSubmit () {
      if(this.validate) {
        try {
          let loginResult = await this.login({ mail: this.email, password: this.password })
          if (loginResult)
            this.dialog = false
        } catch (err) {
          console.error(err)
        }
      }
    },
    validate () {
      if (this.$refs.form.validate())
        return true
      return false
    },
    resetValidation () {
      this.$refs.form.resetValidation()
      this.dialog = false
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
