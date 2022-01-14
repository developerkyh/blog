import {listService} from '../_listServices';

const state = {
  all: {}
};

const actions = {
  getAll({commit}) {
    commit('getAllRequest');

    listService.getAll()
      .then(
        lists => commit('getAllSuccess', lists),
        error => commit('getAllFailure', error)
      );
  },
  listRegister({dispatch, commit}, list) {
    listService.listRegister(list)
      .then(
        list => {
          commit('listRegisterSuccess', list);
          // router.push('/all');
          setTimeout(() => {
            // display success message after route change completes
            dispatch('alert/success', 'Registration successful', {root: true});
          })
        },
        error => {
          commit('listRegisterFailure', error);
          dispatch('alert/error', error, {root: true});
        }
      );
  },
  update({dispatch, commit}, list) {
    listService.update(list)
      .then(
        list => {
          commit('listUpdateSuccess', list);
          // router.push('/all');
          setTimeout(() => {
            // display success message after route change completes
            dispatch('alert/success', 'Registration successful', {root: true});
          })
        },
        error => {
          commit('listUpdateSuccess', error);
          dispatch('alert/error', error, {root: true});
        }
      );
  },
  delete({commit}, id) {
    commit('listDeleteSuccess', id);
    listService._delete(id)
      .then(
        id => commit('listDeleteSuccess', id),
        error => commit('listDeleteSuccess', {id, error: error.toString()})
      );
  }
};

const mutations = {
  getAllRequest(state) {
    state.all = {loading: true};
  },
  getAllSuccess(state, lists) {
    state.all = {items: lists};
  },
  getAllFailure(state, error) {
    state.all = {error};
  },
  listRegisterSuccess(state) {
    state.all = {upload: true};
  },
  listRegisterFailure(state, error) {
    state.all = {error};
  },
  listUpdateSuccess(state, list) {
    state.status = {loggedIn: true};
  },
  listDeleteSuccess(state, list) {
    state.status = {loggedIn: true};
  }
};

export const lists = {
  namespaced: true,
  state,
  actions,
  mutations
};
