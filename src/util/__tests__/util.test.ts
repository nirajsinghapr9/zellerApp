import {capitalizeFirstChar} from '../util';

describe('capitalizeFirstChar', () => {
  it('capitalizes the first character and lowercases the rest', () => {
    expect(capitalizeFirstChar('hello')).toBe('Hello');
    expect(capitalizeFirstChar('HELLO')).toBe('Hello');
    expect(capitalizeFirstChar('hELLo')).toBe('Hello');
    expect(capitalizeFirstChar('')).toBe('');
  });

  it('handles single character strings', () => {
    expect(capitalizeFirstChar('a')).toBe('A');
    expect(capitalizeFirstChar('Z')).toBe('Z');
  });
});
