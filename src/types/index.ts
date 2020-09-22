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
  like?: number;
  likeIds?: null;
  postkind?: null;
  scenic?: null;
  summary?: string;
  title?: string;
  updated_at?: number;
  watch?: number;
  timer?: string;
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

//实时机票城市
export interface Resaircity {
  data?: airscityItem[];
  total?: number;
}
export interface airscityItem {
  code?: string;
  created_at?: string;
  id?: number;
  level?: string;
  name?: string;
  parentCode?: string;
  sort?: string;
  updated_at?: number;
}
//机票列表
export interface Resairslist {
  flights?: flightsItem;
  info?: infoitem;
  options?: optionsItem;
  total?: number;
}
export interface flightsItem {
  airline_name: string;
  airorders: null;
  airport_tax_audlet: number;
  airport_tax_child: number;
  arr_date: string;
  arr_datetime: string;
  arr_time: string;
  base_price: number;
  created_at: number;
  dep_date: string;
  dep_datetime: string;
  dep_time: string;
  dst_airport: string;
  dst_airport_name: string;
  dst_airport_quay: string;
  dst_city_name: string;
  flight_no: string;
  flights: null;
  id: number;
  org_airport: string;
  org_airport_name: string;
  org_airport_quay: string;
  org_city_name: string;
  plane_name: string;
  plane_size: string;
  seat_infos: seat_infositem[];
  updated_at: number;
  time111?: string;
}
export interface seat_infositem {
  updated_at: number;
  airline_name: string;
  airorders: null;
  airport_tax_audlet: number;
  airport_tax_child: number;
  arr_date: string;
  arr_datetime: string;
  arr_time: string;
  base_price: number;
  created_at: number;
  dep_date: string;
  dep_datetime: string;
  dep_time: string;
  dst_airport: string;
  dst_airport_name: string;
  dst_airport_quay: string;
  dst_city_name: string;
  flight_no?: string;
  flights: null;
  id: number;
  org_airport: string;
  org_airport_name: string;
  org_airport_quay: string;
  org_city_name: string;
  plane_name: string;
  plane_size: string;
  seat_infos: seat_infosItem[];
  type: number;
}
export interface seat_infosItem {
  class: string;
  code: string;
  code_child: string;
  discount: number;
  fareitem_id: string;
  flight_no: string;
  group_name: string;
  index: number;
  insurance_info: [];
  name: string;
  nums: string;
  org_settle_price: number;
  org_settle_price_child: number;
  org_settle_price_coupon: number;
  ota_id: number;
  package_name: string;
  par_price: number;
  policy_info: policy_infoItem;
  provision_info: provision_infoItem;
  seat_xid: string;
  settle_price: number;
  settle_price_child: number;
  settle_price_coupon: number;
  supplierIATANumber: string;
  supplierName: string;
  tag_name: string;
}
export interface policy_infoItem {
  id: string;
  invoice_type: number;
  seat_type: number;
  type: string;
}
export interface provision_infoItem {
  endorse_text: string;
  luggage_text: string;
  rebook_text: string;
  refund_text: string;
  seat_xid: string;
  settle_price: number;
  settle_price_child: number;
  settle_price_coupon: number;
  supplierIATANumber: string;
  supplierName: string;
  tag_name: string;
  type: number;
}
export interface infoitem {
  departCity?: string;
  departDate?: string;
  destCity?: string;
}
export interface optionsItem {
  airport?: airportItem[];
  company?: airportItem[];
  flightTimes?: airportItem[];
}
export interface airportItem {
  [key: string]: string;
}
//城市搜索
// export interface Rescities{
//     data?:RescitiesItem;
//     total?:number;
// }
// export interface RescitiesItem{

// }
