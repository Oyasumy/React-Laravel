const MESSAGE_INFO = {
  // Create  Success
  MI001: (name: string) => `正常に${name}が作成しました。`,
  // Update  Success
  MI002: (name: string) => `正常に${name}が更新完了しました。`,
  // Delete Success
  MI003: (name: string) => `正常に${name}が削除完了しました。`,
  // Upload  Success
  MI004: (name: string) => `正常に${name}がアップロードしました。`,

  // Title delete
  MI005: '削除確認',
  // Content delete
  MI006: '選択したレコードを削除しますか？',
  // Title save
  MI007: '保存確認',
  // Content save
  MI008: '入力した内容を保存し画面遷移へ移動しますか？',
  // Title Error
  MI009: 'エラー',

  // Email has been sent
  MI010: 'Email has been sent',

  // Password has been reset
  MI011: 'Password has been reset',

  // Deleted Success
  MI012: 'Deleted Success',
  // Update Success
  MI013: 'Update Success',
  // Create Success
  MI014: 'Create Success',

  // Approve Store Success
  MI015: 'Approve Store Success',
};

const MESSAGE_ERROR = {
  // Password and Confirm Password mismatch error.
  ME001: 'パスワードと再入力パスワードが一致しません。',
  // Token expired error
  ME002: 'メールアドレスまたはパスワードが違います。',
  // Validation category custom
  ME003: (name: string) => `${name}は必ず指定してください。`,
  // 提携店で使用されているので削除できません
  ME004: '提携店で使用されているので削除できません',
  // image delete 使用されているので削除できません
  ME005: '使用されているので削除できません',
  // Duplication display order 表示順が重複しています。
  ME006: '表示順が重複しています。',
  // サービスカテゴリーで使用されているので削除できません
  ME007: 'サービスカテゴリーで使用されているので削除できません',
  // Validation url with param
  ME008: (name: string) => `${name}に正しい形式を指定してください。`,

  // Content error validation type upload
  ME009: (extension: string) => `アップロードできるファイルの拡張は${extension}です。 `,
  // The image should be a file no larger than 2048 kb.
  ME010: '画像には、2048 kb以下のファイルを指定してください。',
  // Validation all tab check
  ME011: '保存中にエラーがあります。全てのタブに必須入力を確認してください。',

  // File not exact type
  ME012: 'File not exact type',

  // File size too large
  ME013: 'File size too large',

  // Exception error
  M9999: '予期せぬエラーが発生しました。',
};

export const MESSAGE = {
  ...MESSAGE_INFO,
  ...MESSAGE_ERROR,
};
