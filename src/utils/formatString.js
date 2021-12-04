function formatString(string, parameters = []) {
  let formattedString = string;
  parameters.forEach((value, index) => {
    formattedString = formattedString.replace(`{${index}}`, value);
  });

  return formattedString;
}

module.exports = formatString;
