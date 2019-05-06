<template>
  <v-container grid-list-md>
    <SearchBar/>
    <div>
      <v-tabs color="cyan" dark slider-color="yellow">
        <v-tab v-for="n in 2" :key="n" ripple @click="createBoard(n-1)">{{ tabTitle[n-1] }}</v-tab>
        <v-tab-item v-for="n in 2" :key="n">
          <v-data-table :items="posts" class="elevation-1" hide-actions :headers="headers">
            <template v-slot:items="props">
              <td>{{ props.item.boardNo }}</td>
              <td>{{ props.item.title }}</td>
              <td>{{ props.item.content }}</td>
              <td>{{ props.item.user.nickname }}</td>
              <td>{{ props.item.entryStartAt }}</td>
              <td>{{ props.item.entryEndAt }}</td>
            </template>
          </v-data-table>
        </v-tab-item>
      </v-tabs>
    </div>
  </v-container>
</template>

<script>
import SearchBar from '@/components/SearchBar'

export default {
  name: 'Top',
  components: {
    SearchBar
  },
  data: () => {
    return {
      headers: [
        {
          align: 'left',
          sortable: false,
          value: 'boardNo'
        },
        { text: 'タイトル', sortable: false, value: 'title' },
        { text: '内容', sortable: false, value: 'content' },
        { text: '作成者', sortable: false, value: 'user' },
        { text: '応募開始時間', sortable: false, value: 'entry_start_at' },
        { text: '応募終了時間', sortable: false, value: 'entry_end_at' }
      ],
      tabTitle: ["求人", "求職"],
      posts: []
    }
  },
  created() {
    this.createBoard(0);
},
methods: {
  createBoard: function(postType) {
      this.$http.get('boards', {
        params: {
          postType: postType,
          limit: 5
        }
      }).then((response) => {
      this.posts = response.data
      console.log(response.data)
    })
    .catch((e) => {
      console.error(e)
    })
  }
  // createPost () {
  //   this.$http.post('posts', {
  //     title: this.postTitle,
  //     body: this.postBody
  //   }).then((response) => {})
  //   .catch((e) => {
  //     console.error(e)
  //   })
  // }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
