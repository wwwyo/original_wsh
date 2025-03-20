type Params = {
  query: string;
  target: string;
};

// カタカナをひらがなに変換する
function toHiragana(str: string): string {
  return str.replace(/[\u30A0-\u30FF]/g, (match) => {
    return String.fromCharCode(match.charCodeAt(0) - 0x60);
  });
}

// ひらがな・カタカナ・半角・全角を区別せずに文字列が含まれているかを調べる
export function isContains({ query, target }: Params): boolean {
  if (!target) return false;
  if (query === '') return true;

  // 文字列を正規化（NFKCで正規化することで、互換文字を正規の形式に変換）
  const normalizedQuery = toHiragana(query.normalize('NFKC').toLowerCase());
  const normalizedTarget = toHiragana(target.normalize('NFKC').toLowerCase());

  // 正規化した文字列で単純な含有チェック
  return normalizedTarget.includes(normalizedQuery);
}
