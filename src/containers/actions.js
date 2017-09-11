import { name as reducer } from './reducer';

export const hi = () => (
  (dispatch) => {
    dispatch({ type: `hi_${reducer}`, data: 2 });
  }
);
