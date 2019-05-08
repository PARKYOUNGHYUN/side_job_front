<template>
  <v-container grid-list-md>
    <SearchBar/>
    <v-tabs color="cyan" dark slider-color="yellow">
      <v-tab v-for="n in 2" :key="n" ripple @click="createBoard(n-1)">{{ tabTitle[n-1] }}</v-tab>
      <v-tab-item v-for="n in 2" :key="n">
        <v-data-table :headers="headers" :items="posts" item-key="name" class="elevation-1" hide-actions>
          <template v-slot:headers="props">
            <tr>
              <th v-for="header in props.headers" :key="header.text">
                {{ header.text }}
              </th>
            </tr>
          </template>
          <template v-slot:items="props">
            <tr @click="goToDetail(props.item.boardNo)">
              <td>{{ props.item.title }}</td>
              <td>{{ props.item.content }}</td>
              <td>{{ props.item.user.nickname }}</td>
              <td>{{ props.item.entryStartAt }}</td>
              <td>{{ props.item.entryEndAt }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-tab-item>
    </v-tabs>
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
      }).catch((e) => {
        console.error(e)
      })
    },
    goToDetail: function(id) {
      this.$router.push({
        path: '/job/Detail/' + id
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
