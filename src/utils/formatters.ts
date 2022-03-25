/**
 * Formats the value into the appropriate format.
 * @param value - The value to be formated.
 * @param locale - The locale in which to format the value in.
 * @returns The formatted number.
 */
export function formatNumber(value: null | number | string, locale = navigator.language) {
  if (!value) return value;
  // get the number that will be used to format
  const number = typeof value === "string" ? parseFloat(value) : value;
  const minimumFractionDigits = decimalNumberCount(number);
  return number.toLocaleString(locale, { minimumFractionDigits });
}

/**
 * Counts the number of decimal numbers in the input.
 * @param number - The input number.
 * @returns The decimal count.
 */
export function decimalNumberCount(number: number) {
  const numberString = String(number);
  if (numberString.includes(".")) {
    return numberString.split(".")[1].length;
  }
  return 0;
}

/**
 * Formats the string as provided by the commands.
 * @param string - The string to be formatted.
 * @param commands - The commands used to format the string. Possible values:
 *     S[CC] - Split: CamelCase.
 *     S[US] - Split: UnderScore.
 *     T[CP] - Transform: CaPitalize the words.
 *     T[LC] - Transform: LowerCase the words.
 *     T[UC] - Transform: UpperCase the words.
 *     R[WS] - Remove: Multiple WhiteSpaces into one.
 * @returns The formatted string.
 */
export function formatString(string: string, commands = "S[CC]/S[US]/T[LC]/T[CP]/R[WS]") {
  let currentStr = string;
  for (const command of commands.split("/")) {
    switch (command) {
      case "S[CC]":
        // split the words by camelcase notations
        currentStr = currentStr.replace(/([a-z])([A-Z])/g, "$1 $2");
        break;
      case "S[US]":
        // split the words by camelcase notations
        currentStr = currentStr.replace(/(_+)/g, " ");
        break;
      case "T[LC]":
        // transform the string to lowercase
        currentStr = currentStr.toLowerCase();
        break;
      case "T[UC]":
        // transform the string to uppercase
        currentStr = currentStr.toUpperCase();
        break;
      case "T[CP]":
        currentStr = currentStr.replace(/(\b[a-z](?!\s))/g, (x) => x.toUpperCase());
        break;
      case "R[WS]":
        currentStr = currentStr.replace(/\s+/g, " ");
        break;
      default:
    }
  }
  return currentStr;
}

/**
 * Formats the value into the appropriate date format.
 * @param value - The string or number used to be formatted.
 * @param locale - The locale in which to format the value in.
 * @returns The formatted date.
 */
export function formatDate(value: string | number, locale = navigator.language) {
  const date = new Date(value);
  if (date instanceof Date && isNaN(date.valueOf())) return;
  return date.toLocaleString(locale, {
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
