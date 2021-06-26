// import "./null.css";
import "./App.css";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getDataFromDB, setCurrency } from "./reducer";

function App({ data, currency, getDataFromDB, setCurrency }) {
  const [summ, setSumm] = useState("");
  const result = currency.buy * summ || "";
  useEffect(() => {
    getDataFromDB();
  }, []);

  useEffect(() => {
    setCurrency(currency);
    setSumm(summ);
  }, [summ, currency]);

  return (
    <div className="app">
      {data && (
        <form className="form">
          <h1>Currency Exchange</h1>
          <div>
            
            <input
              type="text"
              placeholder="type summ"
              onChange={(e) => {
                Number.isInteger(+e.target.value)
                  ? setSumm(e.target.value)
                  : setSumm("");
              }}
              value={summ}
            />
            <select
              value={currency && currency.ccy}
              onChange={(e) => {
                let current = data.filter((item) => {
                  return item.ccy === e.target.value;
                });
                setCurrency(...current);
              }}
            >
              {data.map((item) => {
                return <option key={item.ccy}>{item.ccy}</option>;
              })}
            </select>
          </div>
          <div>
            <h3>TOTAL</h3>
            <span>{result && result.toFixed(2)}</span>
            <span>{currency?.base_ccy}</span>
          </div>
         
        </form>
      )}
    </div>
  );
}

const mstp = (state) => {
  return { data: state.data, currency: state.currency };
};

export default connect(mstp, { getDataFromDB, setCurrency })(App);
