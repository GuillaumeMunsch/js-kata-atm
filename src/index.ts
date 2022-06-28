import computeEuclidianDivision from "./utils/computeEuclidianDivision";

type Bills = {
  500?: number;
  200?: number;
  100?: number;
  50?: number;
  20?: number;
  10?: number;
};

type ATMError = {
  error: "can_not_compute";
};

type AccumulatorBills = {
  bills: Bills;
  currentMoney: number;
};

const defaultAvailableBills = [500, 200, 100, 50, 20, 10];

const SMALLEST_BILL = 10;

// const atm = (money: number, availableBills = defaultAvailableBills): Bills | ATMError => {
//   if (money % SMALLEST_BILL !== 0) {
//     return {
//       error: "can_not_compute",
//     };
//   }
//   const [bill, ...remainingBills] = availableBills;
//   const { rest, quotient } = computeEuclidianDivision(money, bill);
//   if (availableBills.length === 1) {
//     // @ts-ignore
//     return { [bill]: money / bill };
//   }
//   return { [bill]: quotient, ...atm(rest, remainingBills) };
// };

const atm = (money: number, availableBills = defaultAvailableBills): Bills | ATMError => {
  if (money % SMALLEST_BILL !== 0) {
    return {
      error: "can_not_compute",
    };
  }
  const bills = availableBills.reduce<AccumulatorBills>(
    (acc: AccumulatorBills, currentBill) => {
      const { rest, quotient } = computeEuclidianDivision(acc.currentMoney, currentBill);

      const currentBillsValue = {
        [currentBill]: quotient,
      };
      return { bills: { ...acc.bills, ...currentBillsValue }, currentMoney: rest };
    },
    { bills: {}, currentMoney: money }
  );
  console.log("Bills", bills);
  return bills.bills;
};

export default atm;
