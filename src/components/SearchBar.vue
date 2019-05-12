<template>
  <v-form>
    <v-layout row wrap>
      <v-flex md3>
        <v-text-field v-model="keyword" label="キーワード"></v-text-field>
      </v-flex>
      <v-flex md2>
        <v-select :items="area" v-model="selectedArea" label="エリア"></v-select>
      </v-flex>
      <v-flex md2>
        <v-menu v-model="menu1" :close-on-content-click="false" full-width max-width="290">
          <template v-slot:activator="{ on }">
            <v-text-field :value="startDateFormatted" clearable label="可能期間（開始）" readonly v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="startDate" @change="menu1 = false" no-title></v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex md2>
        <v-menu v-model="menu2" :close-on-content-click="false" full-width max-width="290">
          <template v-slot:activator="{ on }">
            <v-text-field :value="endDateFormatted" clearable label="可能期間（終了）" readonly v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="endDate" @change="menu2 = false" no-title></v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex md2 v-if="getAuth">
        <v-checkbox  v-model="favoriteTags" label="お気に入りタグ"></v-checkbox>
      </v-flex>
      <v-flex md1>
        <v-btn color="primary" @click="onSubmit">絞り込む</v-btn>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  data: () => {
    return {
      keyword: '',
      selectedArea: '',
      favoriteTags: false,
      area: ['北海道','青森県','青森県','岩手県','宮城県','秋田県','山形県','福島県','茨城県','栃木県',
        '群馬県','埼玉県','千葉県','東京都','神奈川県','新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県',
        '静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県','鳥取県','島根県','岡山県',
        '広島県','山口県','徳島県 ','香川県','愛媛県','高知県','福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県',
        '鹿児島県','沖縄県'],
      startDate: null,
      endDate: null,
      menu1: false,
      menu2: false
    }
  },
  methods: {
    onSubmit () {
      var json = {
        boardNo: this.keyword,
        title: this.selectedArea,
        content: this.favoriteTags,
        place: this.startDate,
        progressTimes: this.endDate
      }
      this.$emit('condition', json)
    }
  },
  computed: {
    ...mapGetters({
      getAuth: 'getIsAuth'
    }),
    startDateFormatted () {
      return this.startDate ? moment(this.startDate).format('YYYY/MM/DD') : ''
    },
    endDateFormatted () {
      return this.endDate ? moment(this.endDate).format('YYYY/MM/DD') : ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
