<template>
  <div class="bj-f flex j-center">
    <div style="width:60vw;padding:20px 0;" class="flex j-between">
      <!-- 左边 -->
      <div style="width:70%;">
        <div style="font-size:24px;font-weight:500;">乘机人</div>
        <div style="padding:10px 0;">乘机人</div>
        <div>
          <a-input v-model:value="value1" placeholder="姓名" size="large" />
        </div>
        <div style="padding:10px 0;">证件类型</div>
        <div class="flex" style="width:100%">
          <div>
            <a-dropdown>
              <template v-slot:overlay>
                <a-menu @click="handleMenuClick">
                  <a-menu-item> <UserOutlined />身份证 </a-menu-item>
                  <a-menu-item> <UserOutlined />护照 </a-menu-item>
                </a-menu>
              </template>
              <a-button
                style="margin-left: 8px;left:-10px;"
                size="large"
                class="position-r"
              >
                身份证
                <DownOutlined />
              </a-button>
            </a-dropdown>
          </div>
          <div>
            <input
              placeholder="身份证号"
              size="large"
              style="width:572px;height:40px;left:-10px;border:1px solid #ccc;outline:#ccc;"
              class="position-r"
            />
          </div>
        </div>
        <div style="border-bottom:1px dashed #eee;margin:20px 0;"></div>
        <div style="margin:20px 0;">
          <a-button type="primary" size="large">添加乘机人</a-button>
        </div>
        <div style="font-size:24px;font-weight:500;">保险</div>
        <div class="border conts flex a-center">
          &nbsp;&nbsp;
          <a-checkbox v-model:checked="checked1" style="font-size:16px;"
            >航空意外险：￥30/份×1 最高赔付260万</a-checkbox
          >
        </div>
        <div class="border conts flex a-center">
          &nbsp;&nbsp;
          <a-checkbox v-model:checked="checked2" style="font-size:16px;"
            >航空意外险：￥30/份×1 最高赔付260万</a-checkbox
          >
        </div>
        <div style="border-bottom:1px dashed #eee;margin:20px 0;"></div>
        <div style="font-size:24px;font-weight:500;">联系人</div>
        <div style="margin:10px 0;width:330px;">
          <a-form ref="ruleForms">
            <a-form-item>
              <a-input size="large" placeholder="姓名" id="ruleFormsnumber" />
            </a-form-item>
            <a-form-item name="VerificationCode">
              <a-input-search size="large" placeholder="手机号">
                <template v-slot:enterButton>
                  <a-button size="large">发送验证码</a-button>
                </template>
              </a-input-search>
            </a-form-item>
            <a-form-item>
              <a-input size="large" placeholder="验证码" />
            </a-form-item>
          </a-form>
        </div>
        <div style="margin:20px 0;width:330px;text-align:center;">
          <a-button type="primary" size="large" style="padding:5px 50px;"
            >提交订单</a-button
          >
        </div>
      </div>
      <!-- 右边 -->
      <div style="width:40%;">
        <img src="../../assets/air.png" alt />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
interface Data {
  name: string;
  value1: string;
  checked1: boolean;
  checked2: boolean;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const data: Data = reactive<Data>({
      name: "",
      value1: "",
      checked1: false,
      checked2: false
    });
    return {
      ...toRefs(data)
    };
  }
});
</script>

<style scoped lang='scss'>
.conts {
  height: 50px;
  width: 330px;
  border-radius: 5px;
  margin: 10px 0;
}
</style>