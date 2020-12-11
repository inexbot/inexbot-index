export default {
  namespace: 'index',
  state: {
    headerScroll: 1200,
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      // eslint-disable-line
      yield put({ type: 'save' });
    },
  },
  reducers: {
    setHeaderScroll(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.headerScroll = action.data;
      return _state;
    },
  },
};
