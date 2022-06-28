// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
import atm from ".";

expect.extend(matchers);

const noBills = {
  500: 0,
  200: 0,
  100: 0,
  50: 0,
  20: 0,
  10: 0,
};

test("That's 1 atm test!", () => {
  expect(atm(100)).toEqual({ ...noBills, 100: 1 });
});

test("That's 2 atm test!", () => {
  expect(atm(200)).toEqual({ ...noBills, 200: 1 });
});

test("That's 3 atm test!", () => {
  expect(atm(300)).toEqual({ ...noBills, 200: 1, 100: 1 });
});

test("That's 4 atm test!", () => {
  expect(atm(500)).toEqual({ ...noBills, 500: 1 });
});

test("That's 5 atm test!", () => {
  expect(atm(1500)).toEqual({ ...noBills, 500: 3 });
});

test("That's 6 atm test!", () => {
  expect(atm(600)).toEqual({ ...noBills, 500: 1, 100: 1 });
});

test("That's 7 atm test!", () => {
  expect(atm(880)).toEqual({
    ...noBills,
    500: 1,
    200: 1,
    100: 1,
    50: 1,
    20: 1,
    10: 1,
  });
});

test("That's 8 atm test!", () => {
  expect(atm(637)).toEqual({ error: "can_not_compute" });
});
