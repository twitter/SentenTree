const PATTERN = /http:\/\/t\.co\/\w+|http:\/\/vine\.co\/\w+|http:\/\/t\.co\w+|http:\/\/vine\.co\w+|http:\/\/t\.\w+|http:\/\/vine\.\w+|http:\/\/\w+|\@\w+|\#\w+|\d+(,\d+)+|\w+(-\w+)*|\$?\d+(\.\d+)?\%?|([A-Za-z]\.)+/g;

export function tokenize(text) {
  const tokens = [];
  PATTERN.lastIndex = 0;
  let tokenResult = PATTERN.exec(text);
  while (tokenResult != null) {
    tokens.push(tokenResult[0].trim());
    tokenResult = PATTERN.exec(text);
  }
  return tokens;
}

export function tokenizeBySpace(text) {
  return text
    .split(' ')
    .filter(x => x.length > 0);
}
