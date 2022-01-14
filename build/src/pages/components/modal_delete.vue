<template>
  <div>
    <div class="modal fade" id="modal-delete">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Delete</h4>
          </div>
          <div class="modal-body">
            <p>게시물을 삭제 하시겠습니까?</p>
          </div>
          <div class="modal-footer">
            <button type="reset" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-success" v-on:click="deleteSubmit">
              <i class="fa fa-trash" aria-hidden="true"></i>
              Delete
            </button>
          </div>
          <pre>{{list}}</pre>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {mapActions, mapState} from 'vuex'

  Vue.component('modal-delete', {
    template: 'modal-delete'
  });

  export default {
    props: {
      deleteData: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        list: {
          id: this.deleteData.id,
        },
        submitted: false
      }
    },
    computed: {
      ...mapState('account', ['status'])
    },
    methods: {
      ...mapActions('lists', ['delete']),
      deleteSubmit() {
        this.submitted = true;
        this.$validator.validate().then(valid => {
          if (valid) {
            this.delete(this.list.id);
            $('#modal-delete').modal('hide');
          }
        });
      }
    }
  }
</script>