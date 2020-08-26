const sum = (a, b) => {
	return a + b;
};

test('checking', () => {
    expect(sum(5, 4)).toBe(9);
});

