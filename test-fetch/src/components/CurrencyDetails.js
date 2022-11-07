const CurrencyDetails = ( {currency} ) => {
  //   currencies.forEach((currency) => {
  //     const category = [];
  //     category.push(currency.category);
  //     // console.log(category)
  //     category.map((ca) => console.log(ca));
  //   });
  // let cate = []
  // cate.push(currency)
  //   const categorizedData = cate.map((acc, curr) => {
  //     const { category, name, symbol } = curr;

  //     if (!acc[category]) {
  //       acc[category] = {
  //         items: [],
  //       };
  //     }
  //     acc[category].items.push(name, symbol);

  //     console.log('categorizedData', acc);
  //     return acc;
  //   }, {});
  //   if (!categorizedData) return null;

  return (
    <>
      <li className="dropdown-item"><p>{currency.symbol} - {currency.name}</p></li>
    </>
  );
};

export default CurrencyDetails;
