export const addLeadingZero = (number, length = 2) => {
    const result = number.toString();

    if (result.length >= length) {
        return result;
    }

    const zeros = Array(length - result.length)
        .fill(0)
        .join();

    return `${zeros}${result}`;
};