import { describe, expect, test } from 'bun:test';

import { isContains } from './isContains';

describe('isContains', () => {
  test('基本的な文字列マッチング', () => {
    expect(isContains({ query: 'abc', target: 'abcdef' })).toBe(true);
    expect(isContains({ query: 'def', target: 'abcdef' })).toBe(true);
    expect(isContains({ query: 'xyz', target: 'abcdef' })).toBe(false);
  });

  test('ひらがな・カタカナの区別なし', () => {
    expect(isContains({ query: 'がっこう', target: '学校（ガッコウ）' })).toBe(true);
    expect(isContains({ query: 'ガッコウ', target: 'がっこう' })).toBe(true);
  });

  test('半角・全角の区別なし', () => {
    expect(isContains({ query: 'ﾃｽﾄ', target: 'テスト' })).toBe(true);
    expect(isContains({ query: 'テスト', target: 'ﾃｽﾄ' })).toBe(true);
  });

  test('濁点・半濁点の区別', () => {
    expect(isContains({ query: 'はた', target: 'ばた' })).toBe(false);
    expect(isContains({ query: 'ハタ', target: 'パタ' })).toBe(false);
  });

  test('空文字列', () => {
    expect(isContains({ query: '', target: 'abc' })).toBe(true);
    expect(isContains({ query: 'abc', target: '' })).toBe(false);
  });
});
