/**
 * Formats the string sequentially filling placeholders with values from the array of parameters
 *
 * @param string - String with placeholders
 * @param parameters - Array of parameters
 * @returns Formatted `string` with filled placeholders from array `parameters`
 */
function formatString(string: string, parameters: string[] = []) {
  let formattedString = string;
  parameters.forEach((value, index) => {
    formattedString = formattedString.replace(`{${index}}`, value);
  });

  return formattedString;
}

export { formatString };
