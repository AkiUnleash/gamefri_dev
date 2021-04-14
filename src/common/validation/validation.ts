const email = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
const password = /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{7,100}$/i

// パスワードのバリデーション
export const isPassword = (props: string) => {
  // 半角英数字混合の７文字以上j
  if (!password.test(props)) {
    return "パスワードは英数字７文字以上で入力してください。"
  } else {
    return ""
  }
}

export const isEmail = (props: string) => {
  // 半角英数字混合の７文字以上j
  if (!email.test(props)) {
    return "ログインIDは、  Eメール形式で入力してください。"
  } else {
    return ""
  }
}