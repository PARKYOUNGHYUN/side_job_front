<template>
  <v-layout row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn flat color="primary" v-on="on">ログイン</v-btn>
      </template>
      <v-card>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-container grid-list-md>
              <v-layout wrap>
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
          <v-btn color="blue darken-1" flat @click="resetValidation">Close</v-btn>
          <v-btn color="blue darken-1" flat :disabled="!valid" @click="login">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    data: () => {
      return {
        valid: true,
        dialog: false,
        show: false,
        password: '',
        passwordRules: [
          v => !!v || '必須項目です。',
          v => v.length >= 8 || '8字以上入力してください。'
        ],
        email: '',
        emailRules: [
          v => !!v || '必須項目です。',
          v => /.+@.+/.test(v) || '有効なメールアドレスではありません。'
        ]
      }
    },
    methods: {
      login: function (event) {
        if(this.validate) {
          this.$http.post('http://localhost:8080/api/user', {
            mail: this.email,
            password: this.password,
          })
          .then(
            (response) => {  //로그인 성공
              alert('success login' + response)
            },
            (error) => { // error 를 보여줌
              alert(error.response.data.error)
            }
          )
          .catch(error => {
            alert(error)
          })
        }
        // 메소드 안에서 사용하는 `this` 는 Vue 인스턴스를 가리킵니다
        alert('Hello ' + this.name + '!')
        // `event` 는 네이티브 DOM 이벤트입니다
        if (event) {
          alert(event.target.tagName)
          this.dialog = false
        }
      },
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
          return true
        }
        return false
      },
      resetValidation () {
        this.$refs.form.resetValidation()
        this.dialog = false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
