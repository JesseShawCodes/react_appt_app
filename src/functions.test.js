import {timesTwo} from "./functions"

test("Multiplies by two", () => {
    expect(timesTwo(4)).toBe(8);
    expect(timesTwo(20)).toBe(40);
})