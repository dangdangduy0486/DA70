import React, { useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { loadMarketsAsync } from "../../redux/reducers/Markets/marketsThunk";

const Markets = (markets) => {
  // const dispatch = useDispatch();
  // const { isLoading, markets, errorMesage } = useSelector(
  //   (state) => state.markets
  // );

  // useEffect(() => {
  //   dispatch(loadMarketsAsync());
  // }, []);
  return (
    <>
      <div>
        <h1>Test</h1>
        {/* {isLoading && <h3>Loading...</h3>}
          {errorMesage && <h3>{errorMesage}</h3>} */}
        {markets}
      </div>
    </>
  );
};

const mapStateProps = (state) => ({
  markets: state,
});

export default connect(mapStateProps)(Markets);
