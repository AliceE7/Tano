/**
 * @author Suryapratap Singh Suryavanshi
 * @date 31/05/2022
 * @summary This file contains all the test related to module
 */

const { soleToken } = require('../index');

// Test UUID-1
test("Test: UUID-1: test size params auto use token method", () => {
	expect(soleToken({ type: 'uuid1', size: 8 }).length).toBeCloseTo(8);
});

// Test UUID-4
test("Test: UUID-4: normal use case", () => {
	expect(soleToken({ type: 'uuid4' }).length).toBeCloseTo(36);
});

// Test Token
test("Test: Tokne: normal use case", () => {
	expect(soleToken({ type: 'token' }).length).toBeCloseTo(32);
});

test("Test: Tokne: with size params", () => {
	expect(soleToken({ type: 'token', size: 15 }).length).toBeCloseTo(15);
});

test("Test: Tokne: with size params without specified token explicitly", () => {
	expect(soleToken({ size: 15 }).length).toBeCloseTo(15);
});

test("Test: pass wrong size.", () => {
	expect(() => soleToken({ size: 33 })).toThrow("The size of the UUID or token are not supported!");
});
