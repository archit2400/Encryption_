export const caesarEncrypt = (text: string, shift: number): string => {
  return text
    .split('')
    .map((char) => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const isUpperCase = char === char.toUpperCase();
        const base = isUpperCase ? 65 : 97;
        const shiftedCode = ((code - base + shift) % 26) + base;
        return String.fromCharCode(shiftedCode);
      }
      return char;
    })
    .join('');
};

export const caesarDecrypt = (text: string, shift: number): string => {
  return caesarEncrypt(text, 26 - shift);
};
