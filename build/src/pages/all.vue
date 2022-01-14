<template>
  <div>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        ALL
        <small>ALL PORTFOLIO</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-home"></i> Home</a></li>
        <li class="active">All</li>
      </ol>
    </section>
    <div class="row">
      <section class="content">
        <list-view></list-view>
      </section>
      <modal-write></modal-write>
      <!-- /.content -->
    </div>
  </div>
</template>
<script>

    import listView from './components/list.vue';
    import modalWrite from './components/modal_write.vue';


    export default {
        components: {
            listView,
            modalWrite,
        },
        methods: {
        },
        updated () {
        }
    }
</script>
