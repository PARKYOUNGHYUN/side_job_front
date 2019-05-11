<template>
  <v-container grid-list-md>
    <SearchBar @childs-event="parentsMethod"/>
    <v-tabs color="cyan" dark slider-color="yellow">
      <v-tab v-for="n in 2" :key="n" ripple @click="changePostType(n-1)">{{ tabTitle[n-1] }}</v-tab>
      <v-tab-item v-for="n in 2" :key="n">
        <Board :postType="postType"/>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import moment from 'moment'
import SearchBar from '@/components/SearchBar'
import Board from '@/components/Board'

export default {
  name: 'Top',
  components: {
    SearchBar,
    Board
  },
  data: () => {
    return {
      tabTitle: ["求人", "求職"],
      postType: 0
    }
  },
  methods: {
    changePostType (postType) {
      this.postType = postType
    },
    parentsMethod: function(message) {
      console.log('TEST')
      console.log(message) // 자식으로 부터받은 메시지를 사용
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
