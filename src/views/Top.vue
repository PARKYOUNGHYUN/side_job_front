<template>
  <v-container grid-list-md>
    <SearchBar @condition="sendCondition"/>
    <v-tabs color="cyan" dark slider-color="yellow">
      <v-tab v-for="n in 2" :key="n" ripple @click="changePostType(n-1)">{{ tabTitle[n-1] }}</v-tab>
      <v-tab-item v-for="n in 2" :key="n">
        <Board :postType="postType" :condition="condition"/>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
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
      postType: 0,
      condition: []
    }
  },
  methods: {
    changePostType (postType) {
      this.postType = postType
    },
    sendCondition (condition) {
      this.condition = condition
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
