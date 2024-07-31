import { store } from "../store";
import { Provider } from "react-redux";
const StoreWrap = ({ element }) => {
  return <Provider store={store}>{element}</Provider>;
};

export default StoreWrap;
