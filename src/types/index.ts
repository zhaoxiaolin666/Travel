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

export interface Code {
  code?: string;
  created_at?: number;
  id?: number;
  isValid?: number;
  tel?: string;
  updated_at?: number;
}

//注册
export interface Resregister {
  token?: string;
  user?: Userregister;
}
export interface Userregister {
  id?: number;
  username?: string;
  email?: null;
  role?: number;
  nickname?: string;
  created_at?: number;
  updated_at?: number;
  defaultAvatar?: string;
  starPosts?: null;
}
// export interface Roleregister {
//   id: number;
//   name: string;
//   description: string;
//   type: string;
// }

//登录表单
export interface RuleForm {
  username: string | number;
  password: string | number;
}

//登录规则
export interface Rules {
  username: username[];
  password: username[];
}

export interface username {
  required: boolean;
  message: string;
  trigger: string;
}

//注册表单
export interface Forms {
  cellphonenumber: number | string;
  VerificationCode: string | number;
  Nickname: string | number;
  passwords: string | number;
  checkpassword: string | number;
}

//注册规则
export interface register {
  cellphonenumber: username[];
  VerificationCode: username[];
  Nickname: username[];
  passwords: username[];
  checkpassword: username[];
}
//推荐机票
export interface Resairssale {
  data?: ResairssaleItem;
  total?: number;
}
export interface ResairssaleItem {
  cover?: string;
  departCity?: string;
  departCode?: string;
  departDate?: string;
  destCity?: string;
  destCode?: string;
  price?: number;
}

//城市菜单列表
export interface Respostscities {
  data?: RespostscitiesItem[];
  total?: number;
}
export interface RespostscitiesItem {
  type?: string; // 主题类型
  children?: childrenItem[]; // 城市列表
}
export interface childrenItem {
  city?: string;
  desc?: string;
}
//文章详情
export interface Resposts {
  data?: RespostsItem;
  total?: number;
}
// data文章详情
export interface RespostsItem {
  account?: accountItem;
  banner?: [];
  city?: city111;
  cityName?: string;
  comments?: comments111[];
  content?: string;
  created_at?: number;
  id?: number;
  images?: images111[];
  like?: null;
  likeIds?: null;
  postkind?: null;
  scenic?: null;
  summary?: string;
  title?: string;
  updated_at?: number;
  watch?: number;
}
export interface accountItem {
  created_at?: number;
  defaultAvatar?: string;
  email?: null;
  id?: number;
  nickname?: string;
  password?: string;
  role?: number;
  starPosts?: null;
  updated_at?: number;
  username?: string;
}
export interface city111 {
  code?: string;
  created_at?: string;
  id?: number;
  level?: string;
  name?: string;
  parentCode?: string;
  sort?: string;
  updated_at?: number;
}
export interface comments111 {
  account?: number;
  content?: string;
  created_at?: number;
  follow?: null;
  hotel?: null;
  id?: number;
  level?: number;
  like?: null;
  likeIds?: null;
  post?: number;
  score?: null;
  type?: number;
  updated_at?: number;
}
export interface images111 {
  [key: string]: string;
}
//城市搜索
// export interface Rescities{
//     data?:RescitiesItem;
//     total?:number;
// }
// export interface RescitiesItem{

// }
