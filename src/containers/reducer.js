import { Map } from 'immutable';

const INIT_STATE = Map({ hi: 0 });
const NAME = 'general';

const funcs = {};

funcs[`hi_${NAME}`] = (state, data) => {
  return state.set('hi', state.get('hi') + data);
}

funcs[`updateWindowDime_${NAME}`] = (state, data) => (
  state.withMutations((t) => {
    t.set('width', data.width);
    t.set('height', data.height);
  })
);

export const reducer = (state = INIT_STATE, action) => {
  if (funcs[action.type]) {
    return funcs[action.type](state, action.data);
  }
  return state;
};

export const name = NAME;
