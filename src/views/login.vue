<template>
  <div
    :style="`background:url('http://157.122.54.189:9095${picture}')`"
    style="height:75vh;width:100vw;background-position:center;"
    class="flex j-center a-center"
  >
    <div class="bj-f" style="width:400px;">
      <div class="flex j-around" style="font-size:16px;">
        <div
          :class="flag===1 ?'color1':'color2'"
          @click="login"
          style="width:100%;text-align:center;padding:1vh 0;"
          class="c-default"
        >登录</div>
        <div
          :class="flag===2 ?'color1':'color2'"
          @click="register"
          style="width:100%;text-align:center;padding:1vh 0;"
          class="c-default"
        >注册</div>
      </div>
      <!-- 登录 -->
      <div style="margin:50px 15px 0 15px;height:240px;" v-if="flag===1">
        <a-form ref="ruleForm" :model="form" :rules="rules">
          <a-form-item ref="name" name="username">
            <a-input v-model:value="form.username" size="large" placeholder="账号" />
          </a-form-item>
          <a-form-item name="password">
            <a-input-password
              v-model:value="form.password"
              type="password"
              size="large"
              placeholder="密码"
            />
          </a-form-item>
          <div style="text-align:right;color:skyblue;" @click="warning" class="c-pointer">忘记密码</div>
          <div>
            <a-button type="primary" html-type="submit" block>登录</a-button>
          </div>
        </a-form>
      </div>
      <!-- 注册 -->
      <div style="margin:20px 15px 0 15px;height:400px;" v-else>
        <a-form ref="ruleForms" :model="ruleForm111" :rules="Rules111">
          <a-form-item name="cellphonenumber">
            <a-input v-model:value="ruleForm111.cellphonenumber" size="large" placeholder="用户手机号" />
          </a-form-item>
          <a-form-item name="VerificationCode">
            <a-input v-model:value="ruleForm111.VerificationCode" size="large" placeholder="验证码">
              <template v-slot:addonAfter>
                <span class="c-pointer" @click="clickcode">发送验证码</span>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item name="Nickname">
            <a-input v-model:value="ruleForm111.Nickname" size="large" placeholder="昵称" />
          </a-form-item>
          <a-form-item name="passwords">
            <a-input-password
              v-model:value="ruleForm111.passwords"
              type="password"
              size="large"
              placeholder="密码"
            />
          </a-form-item>
          <a-form-item name="checkpassword">
            <a-input-password
              v-model:value="ruleForm111.checkpassword"
              type="password"
              size="large"
              placeholder="确认密码"
            />
          </a-form-item>
          <div>
            <a-button type="primary" html-type="submit" block @click="register111">注册</a-button>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  onMounted
} from "vue";
import {
  RuleForm,
  Rules,
  Forms,
  register,
  Rescaptchas,
  Code,
  Resregister
} from "@/types";
import { message } from "ant-design-vue";
import { Password } from "ant-design-vue/types/input/password";
import api from "../http/api";
interface Data {
  name: string;
  picture: string;
  flag: number;
  form: RuleForm;
  ruleForm111: Forms;
  Rules111: register;
  rules: Rules;
  Code: Code;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const data: Data = reactive<Data>({
      name: "jack",
      picture: "",
      flag: 1,
      form: { username: "", password: "" },
      ruleForm111: {
        cellphonenumber: "",
        VerificationCode: "",
        Nickname: "",
        passwords: "",
        checkpassword: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      },
      Rules111: {
        cellphonenumber: [
          {
            required: true,
            message: "请输入电话",
            trigger: "blur"
          }
        ],
        VerificationCode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ],
        Nickname: [
          {
            required: true,
            message: "请输入昵称",
            trigger: "blur"
          }
        ],
        passwords: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        checkpassword: [
          {
            required: true,
            message: "请确认密码",
            trigger: "blur"
          }
        ]
      },
      Code: {}
    });
    const login = (): void => {
      data.flag = 1;
    };
    const register = (): void => {
      data.flag = 2;
    };
    const warning = (): void => {
      message.warning("后续实现");
    };
    const clickcode = (): void => {
      api
        .postcaptchas({ tel: "11111111111" })
        .then((res: Rescaptchas) => {
          console.log(res);
          data.Code = res! as object;
          data.ruleForm111.VerificationCode = data.Code.code!;
        })
        .catch((err: any) => {
          console.log(err);
        });
    };
    const register111 = (): void => {
      api
        .postregister({})
        .then((res: Resregister) => {
          console.log(res);
        })
        .catch((err: any) => {
          console.log(err);
        });
    };
    onMounted(() => {
      data.picture = JSON.parse(localStorage.getItem("picture")! as string);
    });
    return {
      ...toRefs(data),
      login,
      register,
      warning,
      clickcode,
      register111
    };
  }
});
</script>

<style scoped lang='scss'>
.color1 {
  border-top: 2px solid orange;
  color: orange;
  font-weight: 600;
}
.color2 {
  background-color: #f0f0f0;
}
</style>