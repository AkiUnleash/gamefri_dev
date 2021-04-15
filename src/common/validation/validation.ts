const email = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
const password = /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{7,100}$/i
const profileid = /^[a-z\d]{1,100}$/i

// パスワードのバリデーション
export const isPassword = (props: string) => {
  // 半角英数字混合の７文字以上j
  if (!password.test(props)) {
    return "パスワードは英数字７文字以上で入力してください。"
  }
  return ""
}

// ログインIDのバリデーション
export const isEmail = (props: string) => {
  // 半角英数字混合の７文字以上j
  if (!email.test(props)) {
    return "ログインIDは、  Eメール形式で入力してください。"
  }
  return ""
}

// プロフィールIDのバリデーション
export const isProfileid = (props: string) => {
  if (!props) {
    return "プロフィールIDは、必ず入力してください。"
  }

  if (!profileid.test(props)) {
    return "プロフィールIDは、半角英数字で入力してください。"
  }
  return ""
}

// ニックネームのバリデーション
export const isNickname = (props: string) => {
  if (!props.trim()) {
    return "ニックネームは、必ず入力してください。"
  }
  return ""
}