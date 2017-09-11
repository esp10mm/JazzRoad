import { name as reducer } from './reducer';
import { debug } from '../../utils';
export const hi = () => (
  (dispatch) => {
    dispatch({ type: `hi_${reducer}`, data: 1 });
  }
);
