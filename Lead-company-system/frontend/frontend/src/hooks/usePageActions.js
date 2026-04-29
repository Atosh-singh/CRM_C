import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageActions } from "../redux/slices/pageActionSlice";

const usePageActions = (config = {}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageActions(config));

    return () => {
      dispatch(setPageActions({}));
    };
  }, [dispatch, config]);
};

export default usePageActions;