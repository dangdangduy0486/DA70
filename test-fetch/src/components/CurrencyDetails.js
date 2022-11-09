const CurrencyDetails = (  { currencies } ) => {
  // props.currencyFr('hello')
  const handleSelectCurrency = (value) => {
    console.log(value.symbol)
    // props.currencyFr('value.symbol')
  }

  return (
    <>
      {currencies &&
        currencies.map((currency) => (
          <li className="dropdown-item">
            <button onClick={() => handleSelectCurrency(currency)} value={currency}>
              {currency.symbol} - {currency.name}
            </button>
          </li>
      ))}
    </>
  );
};

export default CurrencyDetails;
