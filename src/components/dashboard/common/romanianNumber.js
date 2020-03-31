
export const convertToRomanian = num => {
    const decimalValue = [10, 9, 5, 4, 1];
    const romanNumeral = ["X", "IX", "V", "IV", "I"];
    let romanized = "";

    decimalValue.forEach((decimal, index) => {
        while (decimal <= num) {
            romanized += romanNumeral[index];
            num -= decimal;
        }
    });

    return romanized;
};