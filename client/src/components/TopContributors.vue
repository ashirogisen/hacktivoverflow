<template>
  <div id="top-contributors">
    <button @click="getAllContributors()" id="con-top" data-toggle="modal" data-target="#topContributors" type="button" style="display:flex; justify-content:center; align-items:center;" class="btn navbar-btns"><i style="margin-right: 7px" class="far fa-star"></i>Contributors</button>
    <!-- Modal -->
    <div class="modal fade" id="topContributors" tabindex="-1" role="dialog" aria-labelledby="topContributorsTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="topContributorsTitle">Top Contributors</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="overflow-auto">
              <b-table
                id="my-table"
                :items="items"
                :per-page="perPage"
                :current-page="currentPage"      
              ></b-table> <br>
              <b-pagination
                align="center"
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="my-table"
              ></b-pagination>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" style="font-weight: bold;" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { config } from '../config'

export default {
  name: 'topcontributors',
  data () {
    return {
      perPage: 3,
      currentPage: 1,
      items: null,
      rows: null
    }
  },
  methods: {
    getAllContributors () {
      axios({
        method: 'get',
        url: `${config.host}/allusers`
      })

        .then(({data}) => {
          let filteredData = []
          this.rows = data.length
          for (let i = 0; i < data.length; i++) {
            filteredData.push({
              Point: data[i].point,
              Name: data[i].name,
              Email: data[i].email
            })
          }
          this.items = filteredData.reverse()
        })
        .catch(console.log)
    }
  },
  created() {
    
  }
}
</script>

<style>
#con-top {
  width: 150px;
  color: white;
  font-weight: bold;
  background-color: #3c6382;
  /* transition: all 0.2s ease-in-out; */
  margin-bottom: 15px;
}

#con-top:hover {
  /* margin-left: 50px; */
  background-color:#b71540;
}

th {
  color: white;
  font-weight: bold;
  background-color: #3c6382;
}

.page-item.active .page-link {
  background-color: #0a3d62;
  border-color: white;
}
</style>