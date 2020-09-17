<template>
  <div
    :style="`background:url('http://157.122.54.189:9095${picture}')`"
    style="height:600px;width:100vw;background-position:center;"
    class="flex j-center a-center"
  >
    <!-- 表头 -->
    <div class="bj-f" style="width:400px;">
      <div class="flex j-around" style="font-size:16px;">
        <div
          :class="flag===1 ?'color1':'color2'"
          @click="login"
          style="width:100%;text-align:center;padding:5px 0;"
          class="c-default"
        >登录</div>
        <div
          :class="flag===2 ?'color1':'color2'"
          @click="register"
          style="width:100%;text-align:center;padding:5px 0;"
          class="c-default"
        >注册</div>
      </div>
      <!-- 登录 -->
      <div style="margin:50px 15px 0 15px;height:240px;" v-if="flag===1">
        <a-form ref="ruleForm" :model="form" :rules="rules">
          <!-- 登录手机号 -->
          <a-form-item ref="name" name="username">
            <a-input v-model:value="form.username" size="large" placeholder="账号" />
          </a-form-item>
          <!-- 登录密码 -->
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
            <a-button type="primary" html-type="submit" block @click="login111">登录</a-button>
          </div>
        </a-form>
      </div>
      <!-- 注册 -->
      <div style="margin:20px 15px 0 15px;height:400px;" v-else>
        <a-form ref="ruleForms" :model="ruleForm111" :rules="Rules111">
          <!-- 注册手机号 -->
          <a-form-item name="cellphonenumber">
            <a-input
              v-model:value="ruleForm111.cellphonenumber"
              size="large"
              placeholder="用户手机号"
              id="ruleFormsnumber"
            />
          </a-form-item>
          <!-- 验证码 -->
          <a-form-item name="VerificationCode">
            <a-input-search
              v-model:value="ruleForm111.VerificationCode"
              size="large"
              placeholder="验证码"
              @search="clickcode"
            >
              <template v-slot:enterButton>
                <a-button>发送验证码</a-button>
              </template>
            </a-input-search>
          </a-form-item>
          <!-- 注册昵称 -->
          <a-form-item name="Nickname">
            <a-input v-model:value="ruleForm111.Nickname" size="large" placeholder="昵称" />
          </a-form-item>
          <!-- 注册密码 -->
          <a-form-item name="passwords">
            <a-input-password
              v-model:value="ruleForm111.passwords"
              type="password"
              size="large"
              placeholder="密码"
            />
          </a-form-item>
          <!-- 注册确认密码 -->
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
  onMounted,
  ref
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
import { useRouter, useRoute } from "vue-router";
import { Form } from "ant-design-vue/types/form/form.d";
interface Data {
  name: string;
  picture: string;
  flag: number;
  form: RuleForm;
  ruleForm111: Forms;
  Rules111: register;
  rules: Rules;
  Code: Code;
  Resregister: Resregister;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const router = useRouter();
    const route = useRoute();
    const ruleForm = ref<Form>();
    const ruleForms = ref<Form>();
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
      Code: {},
      Resregister: {}
    });
    // 登录
    const login111 = (): void => {
      ruleForm
        .value!.validate()
        .then(() => {
          api
            .postlogin({
              username: data.form.username! as string,
              password: data.form.password! as string
            })
            .then((res: Resregister) => {
              data.Resregister = res!;
              if (res!) {
                message.success("登录成功");
                localStorage.setItem(
                  "user",
                  JSON.stringify(data.Resregister.user)
                );
                router.push("/home");
              }
              console.log(res);
            })
            .catch((err: any) => {
              console.log(err);
            });
        })
        .catch((err: any) => {
          console.log(err, 333);
        });
    };
    const login = (): void => {
      data.flag = 1;
    };
    const register = (): void => {
      data.flag = 2;
    };
    const warning = (): void => {
      message.warning("后续实现");
    };
    // 验证码
    const clickcode = (): void => {
      api
        .postcaptchas({ tel: data.ruleForm111.cellphonenumber! as string })
        .then((res: Rescaptchas) => {
          console.log(res);
          data.Code = res! as object;
          if (data.Code) {
            message.success(`手机验证码:${data.Code.code}`);
          }
          data.ruleForm111.VerificationCode = data.Code.code!;
        })
        .catch((err: any) => {
          console.log(err);
        });
    };
    // 注册
    const register111 = (): void => {
      ruleForms
        .value!.validate()
        .then(() => {
          if (data.ruleForm111.passwords !== data.ruleForm111.checkpassword) {
            message.error("两次密码不一致,请检查后重新注册");
          } else {
            api
              .postregister({
                username: data.ruleForm111.cellphonenumber! as string,
                captcha: data.ruleForm111.VerificationCode! as string,
                nickname: data.ruleForm111.Nickname! as string,
                password: data.ruleForm111.passwords! as string
              })
              .then((res: Resregister) => {
                data.Resregister = res!;
                if (res!) {
                  message.success("注册成功");
                  localStorage.setItem(
                    "user",
                    JSON.stringify(data.Resregister.user)
                  );
                  router.push("/home");
                }
                console.log(res);
              })
              .catch((err: any) => {
                console.log(err);
              });
          }
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
      register111,
      ruleForm,
      ruleForms,
      login111
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