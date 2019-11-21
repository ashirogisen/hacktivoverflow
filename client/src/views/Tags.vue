<template>
  <div id="main-tags">
    <div id="cards-tag">
      <div v-for="(tag, index) in tagsData" :key="index" class="card text-white bg-dark mb-3" style="max-width: 16rem; margin-top: 30px; margin-right: 15px;">
        <Tag :tag="tag"/>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'
import Tag from '../components/Tag'
import { config } from '../config'

export default {
  name: 'tags',
  components: {
    Tag
  },
  methods: {
    getTags () {
      this.$store.dispatch('getTags')
    }
  },
  computed: {
    tagsData () {
      return this.$store.state.tags
    }
  },
  watch:{
    tagsData (val) {
      this.tagsData = val
    }
  },
  created () {
    this.$store.dispatch('getTags')
    this.getTags()
  }
}
</script>

<style>
#cards-tag {
  display: flex;
  flex-wrap: wrap;
}
</style>