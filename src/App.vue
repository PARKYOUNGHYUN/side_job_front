<template>
  <v-app>
    <Header/>
    <v-content>
      <router-view/>
    </v-content>
    <Footer/>
  </v-app>
</template>

<script>
import Header from './views/header/HeaderItem'
import Footer from './views/footer/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      //
    }
  }
}
</script>

<style>
#app {
  font-family: "MS PGothic", "Osaka", Arial, sans-serif
}
</style>