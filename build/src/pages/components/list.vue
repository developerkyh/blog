<template id="list-view">
  <div class="list-el-wrap">
    <list :list-data="list" v-for="list in lists.items" :key="list.item"></list>
    <modal-modify :modal-data="this.list"></modal-modify>
    <!--<modal-delete :delete-data="lists.id"></modal-delete>-->
    <div v-if="!lists.items">
      <p>게시물이 없습니다.</p>
    </div>
  </div>
</template>

<script>
    import Vue from 'vue'
    import {mapState, mapActions} from 'vuex'
    import {bus} from '../../app.vue'
    import {alert} from "../../_store/alert.module";

    //import modalModify from './modal_modify.vue';
    //import modalDelete from './modal_delete.vue';

    Vue.component('list-view', {
        template: 'list-view'
    });

    // 리스트

    const list = {
        template:
        '    <div class="list-el">\n' +
        '      <dl>\n' +
        '        <dt>\n' +
        '          <a :href="\'http://\'+listData.links[0]" target="_blank"><img :src=listData.imageUrl class="" alt="portfolio images"></a>\n' +
        '        </dt>\n' +
        '        <dd class="list-title"><a :href="\'http://\'+listData.links[0]" target="_blank">{{listData.subject}}</a></dd>\n' +
        '        <dd>{{listData.contents}}</dd>\n' +
        '        <div>\n' +
        '          <a v-for="(link, index) in listData.links" :href="\'http://\'+listData.links[index]" target="_blank">{{index+1}}</a>\n' +
        '        </div>\n' +
        '      </dl>\n' +
        '      <div class="add" v-if="status.loggedIn">\n' +
        '        <a data-toggle="modal" data-target="#modal-modify" @click="openModal(listData)">\n' +
        '          <i class="fa fa-edit"></i>\n' +
        '        </a>\n' +
        '        <a data-toggle="modal" data-target="#modal-delete">\n' +
        '          <i class="fa fa-trash-o"></i>\n' +
        '        </a>\n' +
        '      </div>\n' +
        '      <div v-if="status.loggedIn">\n' +
        '        <pre>\n' +
        '          {{listData}}\n' +
        '        </pre>\n' +
        '      </div>' +
        '    </div>\n',
        props: {
            listData: {
                type: Object,
                required: true,
            }
        },
        computed: {
            ...mapState('account', ['status'])
        },
        methods: {
            openModal(getList) {
                bus.$emit('getList', getList)
            },
        },
        updated() {
            console.log('list component');
        },
    };

    // 수정
    const modalModify = {
        template:
        '  <div class="modal fade" id="modal-modify">\n' +
        '    <div class="modal-dialog">\n' +
        '      <div class="modal-content">\n' +
        '        <div class="modal-header">\n' +
        '          <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
        '            <span aria-hidden="true">&times;</span>\n' +
        '          </button>\n' +
        '          <h4 class="modal-title">Modify</h4>\n' +
        '        </div>\n' +
        '        <div class="modal-body">\n' +
        '          <form id="modify-file" class="form-horizontal" @submit.prevent="writeSubmit" enctype="multipart/form-data">\n' +
        '            <div class="form-group">\n' +
        '              <label class="col-sm-2 control-label">Category</label>\n' +
        '              <div class="col-sm-10">\n' +
        '                <select id="list.listCategory" @change="onChange($event)" v-model="modalData.category"\n' +
        '                        v-validate="\'required\'" name="category" class="form-control">\n' +
        '                  <option disabled value="">Please select one</option>\n' +
        '                  <optgroup label="PUBLISHING">\n' +
        '                    <option>pc</option>\n' +
        '                    <option>responsive</option>\n' +
        '                    <option>jquery</option>\n' +
        '                  </optgroup>\n' +
        '                  <optgroup label="FRAME WORK">\n' +
        '                    <option>vuejs</option>\n' +
        '                  </optgroup>\n' +
        '                  <optgroup label="DESIGN">\n' +
        '                    <option>web</option>\n' +
        '                  </optgroup>\n' +
        '                </select>\n' +
        '                <div v-show="submitted && !list.category" class="invalid-feedback text-danger">카테고리를 입력하세요</div>\n' +
        '              </div>\n' +
        '            </div>\n' +
        '            <div class="form-group">\n' +
        '              <label class="col-sm-2 control-label">Subject</label>\n' +
        '              <div class="col-sm-10">\n' +
        '                <input type="text" value="subject" v-model="modalData.subject" v-validate="\'required\'" name="subject"\n' +
        '                       class="form-control"\n' +
        '                       maxlength="24" placeholder="max number 24">\n' +
        '                <div v-show="submitted && !list.subject" class="invalid-feedback text-danger">제목을 입력하세요</div>\n' +
        '              </div>\n' +
        '            </div>\n' +
        '            <div class="form-group">\n' +
        '              <label class="col-sm-2 control-label">Content</label>\n' +
        '              <div class="col-sm-10">\n' +
        '                <textarea v-model="modalData.contents" v-validate="\'required\'" name="contents" class="form-control"\n' +
        '                          maxlength="48" placeholder="max number 48"></textarea>\n' +
        '                <div v-show="submitted && !list.contents" class="invalid-feedback text-danger">내용을 입력하세요</div>\n' +
        '              </div>\n' +
        '            </div>\n' +
        '            <div class="form-group">\n' +
        '              <label class="col-sm-2 control-label">File</label>\n' +
        '              <div class="form-group">\n' +
        '                <input type="file" id="file" name="file" ref="file2" accept=".jpg, .jpeg, .gif, .png"\n' +
        '                       class="custom-file-input" @change="previewFiles($event)">\n' +
        '              </div>\n' +
        '            </div>\n' +
        '            <div v-for="(link, index) in modalData.links" :key="index">\n' +
        '              <div class="form-group">\n' +
        '                <label class="col-sm-2 control-label">Link({{index + 1}})</label>\n' +
        '                <div class="col-sm-8">\n' +
        '                  <input type="text" v-model="modalData.links[index]" id="links" name="links[]" class="form-control">\n' +
        '                  <div v-show="submitted && !modalData.links[0]" class="invalid-feedback text-danger">대표 링크를 입력하세요</div>\n' +
        '                  <div v-show="index === 0 && !modalData.links[0]" class="invalid-feedback text-danger">최소 1개의 링크 입력은 하세요\n' +
        '                  </div>\n' +
        '                  <div v-show="index === 9" class="invalid-feedback text-danger">링크 입력은 10개 까지만 가능합니다.</div>\n' +
        '                </div>\n' +
        '                <div v-show="modalData.links.length-1 === index" class="col-sm-1">\n' +
        '                  <button type="button" v-on:click="addNewApartment(index)" class="btn btn-block btn-success">+</button>\n' +
        '                </div>\n' +
        '                <div v-show="modalData.links.length-1 > index && 1 <= index" class="col-sm-1">\n' +
        '                  <button type="button" v-on:click="removeApartment(index)" class="btn btn-block btn-danger">-\n' +
        '                  </button>\n' +
        '                </div>\n' +
        '              </div>\n' +
        '            </div>\n' +
        /*
          '            <div class="form-group hidden">\n' +
          '              <label class="col-sm-2 control-label">Image Url</label>\n' +
          '              <div class="col-sm-10">\n' +
          '                <input type="text" v-model="modalData.imageUrl" id="imageUrl" name="imageUrl" class="form-control">\n' +
          '              </div>\n' +
          '            </div>\n' +
          '            <div class="form-group hidden">\n' +
          '              <label class="col-sm-2 control-label">Date</label>\n' +
          '              <div class="col-sm-10">\n' +
          '                <input type="text" v-model="modalData.date" id="date" name="date" class="form-control">\n' +
          '              </div>\n' +
          '            </div>\n' +
        */
        '          </form>\n' +
        '        </div>\n' +
        '        <div class="modal-footer">\n' +
        '          <button type="reset" class="btn btn-default pull-left" data-dismiss="modal" v-on:click="clearReset()">Close</button>\n' +
        '          <button type="button" class="btn btn-success" v-on:click="writeSubmit">\n' +
        '            <i class="fa fa-arrow-up" aria-hidden="true"></i>\n' +
        '            Upload \n' +
        '          </button>\n' +
        '        </div>\n' +
        '        <pre>{{modalData}}</pre>\n' +
        '      </div>\n' +
        '      <!-- /.modal-content -->\n' +
        '    </div>\n' +
        '    <!-- /.modal-dialog -->\n' +
        '  </div>',
        props: {
            modalData: {
                type: Object,
                required: true,
            }
        },

        data() {
            return {
                list: {
                    id: '',
                    category: '',
                    subject: '',
                    contents: '',
                    file: [],
                    imageUrl: '',
                    links: [''],
                    date: ''
                },
                submitted: false,
                changed: false
            }
        },

        computed: {
            ...mapState('account', ['status']),

            /*
            links : function () {
                if (this.changed === true){
                    this.saveStorage(this.modalData.links);
                }
                console.log(this.changed);
                console.log(this.openStorage());
                console.log('computed update');
            }
            */
        },

        watch: {
            /*
            links : {
                immediate: true,
                handler() {
                    if (this.changed === false){
                        this.saveStorage(this.modalData.links);
                    }
                    // this.changed = true;
                    console.log(this.changed);
                    console.log('watch update');
                }
            },
            */
        },

        created() {
            console.log('자식 created');
        },

        mounted() {
            console.log('자식 mounted');
        },

        updated() {
            console.log('modify 모달 updated');
            /*            this.$nextTick(function () {
                            if (this.changed === false){
                                this.saveStorage(this.modalData.links);
                            }
                            console.log(this.changed);
                            console.log(this.openStorage());
                        });*/
        },

        methods: {

            ...mapActions('lists', ['update']),

            openStorage() {
                return JSON.parse(localStorage.getItem('links'))
            },

            saveStorage(form) {
                localStorage.setItem('links', JSON.stringify(form));
            },

            addNewApartment(index) {
                if (this.modalData.links.length < 10 && this.modalData.links[index] !== '') {
                    // this.modalData.links.push(Vue.util.extend('', this.links));
                    this.modalData.links.push(Vue.util.extend('', this.links));
                }
            },

            removeApartment(index) {
                if (this.modalData.links.length > 1) Vue.delete(this.modalData.links, index);
                console.log("삭제:" + index);
            },

            previewFiles($event) {
                this.list.file = $event.target.files[0];
            },

            onChange($event) {
                this.list.category = $event.target.value;
            },

            writeSubmit() {
                this.submitted = true;
                this.$validator.validate().then(valid => {
                    if (valid) {
                        this.update(this.list.id);
                        $('#modal-modify').modal('hide');
                    }
                });
            },

            clearReset() {

                localStorage.removeItem('links');       //로컬 스토리지 삭제 함.

                // Object.assign(this.$data, this.$options.data.call(this));       //원본

                /*let vm = new Vue({
                    data: {
                        link: ['']
                    }
                });*/

                //vm.link = Object.assign(this.modalData.links, vm.link);

                let linkData = this.modalData.links;
/*

                linkData.forEach((element, index) => {
                    if (linkData[index] === '') {
                        Vue.delete(linkData, index);
                    }
                });

*/
                // 화살표 함수 제거
                linkData.forEach(function(element, index) {
                  if(linkData[index] === '') {
                    Vue.delete(linkData, index);
                    //Object.assign(this.$data, this.$options.data.call(this));
                  }
                });
            }
        }
    };
    
    export default {
        data() {
            return {
                list: {
                    id: 0,
                    category: '',
                    subject: '',
                    contents: '',
                    file: [],
                    imageUrl: '',
                    links: [''],
                    date: ''
                },
                submitted: false
            }
        },

        components: {
            'list': list,
            'modal-modify': modalModify,
            //'modal-delete': modalDelete,
        },

        computed: {
            ...mapState('account', ['status']),
            ...mapState({
                account: state => state.account,
                lists: state => state.lists.all
            }),
        },

        created () {
            this.getAllList();
            bus.$on('getList', obj => {
                this.list.id = obj.id;
                this.list.category = obj.category;
                this.list.contents = obj.contents;
                this.list.subject = obj.contents;
                this.list.file = obj.file;
                this.list.imageUrl = obj.imageUrl;
                this.list.links = obj.links;
                this.list.date = obj.date;
            });
            console.log('부모 created');
        },

        updated () {
            console.log('부모 updated');
        },

        methods: {
            ...mapActions('lists', {
                getAllList: 'getAll'
            })
        }
    };
</script>

<style scoped>

</style>