<template id="list-view">
  <div>
    <div class="list-el-wrap" v-if="lists.items" v-for="(list, index) in lists.items" :key="list.id">
      <div class="list-el">
        <dl>
          <dt>
            <a :href="'http://'+list.links[0]" target="_blank"><img :src=list.imageUrl class="" alt="portfolio images"></a>
          </dt>
          <dd class="list-title"><a :href="'http://'+list.links[0]" target="_blank">{{list.subject}}</a></dd>
          <dd>{{list.contents}}</dd>
          <div>
            <a v-for="(link, index) in list.links" :href="'http://'+list.links[index]" target="_blank">{{index+1}}</a>
          </div>
        </dl>
        <div v-if="status.loggedIn">
          <a data-toggle="modal" data-target="#modal-modify" @click="openModal(list)">
            <i class="fa fa-edit"></i>
          </a>
          <a data-toggle="modal" data-target="#modal-delete" @click="openModal(list)">
            <i class="fa fa-trash-o"></i>
          </a>
        </div>
        <div v-if="status.loggedIn">
          <pre>
            {{list}}
          </pre>
        </div>
      </div>
      <modal-write></modal-write>
      <modal-modify></modal-modify>
      <modal-delete></modal-delete>
    </div>
    <div class="list-el-wrap" v-if="!lists.items">
      <p>게시물이 없습니다</p>
      <modal-write></modal-write>
    </div>
    <div class="list-el-wrap" v-if="lists.items">
      <modal-write></modal-write>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {mapState, mapActions} from 'vuex'
  import {bus} from '../../app.vue'

  import modalWrite from './modal_write.vue';
  import modalModify from './modal_modify.vue';
  import modalDelete from './modal_delete.vue';


  Vue.component('list-view', {
    template: 'list-view'
  });
  export default {
    // props: ['listSubject'],
    components: {
      'modal-write': modalWrite,
      'modal-modify': modalModify,
      'modal-delete': modalDelete,
    },
    computed: {
      ...mapState('account', ['status']),
      ...mapState({
        account: state => state.account,
        lists: state => state.lists.all
      }),
    },
    mounted: function () {
      this.getAllList();
    },
    methods: {
      ...mapActions('lists', {
        getAllList: 'getAll'
      }),
      openModal(getList) {
        bus.$emit('list', getList)
      }
    }
  };
</script>

<style scoped>

</style>