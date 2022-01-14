<template>
  <div id="app" class="wrapper">
    <top-view></top-view>
    <left-view></left-view>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <template v-if="$route.matched.length">
        <router-view></router-view>
      </template>
    </div>
    <!-- /.content-wrapper -->
    <foo-view></foo-view>
    <!--
      <right-view></right-view>
    -->
    <div class="control-sidebar-bg"></div>
  </div>
  <!-- ./wrapper -->
</template>

<script>
  
  import Vue from 'vue';
  import foo from './layouts/foo.vue';
  import top from './layouts/top.vue';
  import left from './layouts/left.vue';

  //import right from './layouts/right.vue'

  export const bus = new Vue();    //$on $emit

  export default {
    name: 'app',
    components: {
      'top-view': top,
      'foo-view': foo,
      'left-view': left
      // 'right-view': right
    }
  }
</script>


