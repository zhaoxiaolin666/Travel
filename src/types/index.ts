//轮播图
export interface Res {
  total?: number;
  data: DataItem[];
}
export interface DataItem {
  url: string; // 图片链接
  desc: string; // 图片描述
}
//验证码
export interface Rescaptchas {
  status: number;
  message: string;
}
//注册
export interface Resregister {
  jwt: string;
  user: Userregister;
}
export interface Userregister {
  id: number;
  username: string;
  email: null;
  role: Roleregister;
  nickname: string;
  created_at: number;
  updated_at: number;
  comments: [];
}
export interface Roleregister {
  id: number;
  name: string;
  description: string;
  type: string;
}
export interface Code {
  code?: string;
  created_at?: number;
  id?: number;
  isValid?: number;
  tel?: string;
  updated_at?: number;
}

export interface RuleForm {
  username: string | number;
  password: string | number;
}

export interface Rules {
  username: username[];
  password: username[];
}

export interface username {
  required: boolean;
  message: string;
  trigger: string;
}

export interface Forms {
  cellphonenumber: number | string;
  VerificationCode: string | number;
  Nickname: string | number;
  passwords: string | number;
  checkpassword: string | number;
}

export interface register {
  cellphonenumber: username[];
  VerificationCode: username[];
  Nickname: username[];
  passwords: username[];
  checkpassword: username[];
}
