<template>
  <div style="width:100vw;" class="flex bj-f j-center">
    <div style="width:70vw;">
      <!-- 国内机票 -->
      <div style="padding:10px 0;" class="flex a-center">
        <img src="../assets/feiji.png" alt style="width:22=4px;height:24px;" />
        <span style="font-size:24px;color:#FFA500;font-weight:400">国内机票</span>
      </div>
      <div class="flex j-between">
        <div
          style="width:450px;height:350px;border-bottom:1px solid #ccc;border-left:1px solid #ccc;border-right:1px solid #ccc;"
        >
          <div class="flex j-around" style="font-size:20px;">
            <!-- 表单头部 -->
            <div style="border-top:3px solid orange;width:100%;text-align:center;padding:5px 0;">
              <span>
                <SwapRightOutlined />
              </span>
              <span>单程</span>
            </div>
            <div
              style="width:100%;text-align:center;padding:5px 0;background-color: #eee;"
              @click="warning111"
              class="c-pointer"
            >
              <span>
                <SwapOutlined />
              </span>
              <span>往返</span>
            </div>
          </div>
          <div class="flex" style="margin:5px;">
            <!-- 表单 -->
            <div style="width:350px;margin:30px 0;">
              <a-form :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-item label="出发城市">
                  <a-input v-model:value="form.Startingcity" placeholder="请搜索出发城市" />
                </a-form-item>
                <a-form-item label="到达城市">
                  <a-input v-model:value="form.Arrivingcity" placeholder="请搜索到达城市" />
                </a-form-item>
                <a-form-item label="出发时间">
                  <a-date-picker
                    v-model:value="form.day"
                    show-time
                    type="date"
                    placeholder="请选择日期"
                    style="width:100%;"
                  />
                </a-form-item>
                <div style="margin-left:56px;">
                  <a-button type="primary" block>
                    <SearchOutlined />搜索
                  </a-button>
                </div>
              </a-form>
            </div>
            <div style="width:100px">
              <div style="width:70px;height:2px;background-color:#ccc;margin-top:50px;"></div>
              <div style="width:2px;height:20px;background-color:#ccc;margin-left:68px;"></div>
              <div
                style="background-color:#ccc;color:#fff;text-align:center;width:30px;margin-left:54px;"
                class="c-pointer"
                @click="clickchange"
              >换</div>
              <div style="width:2px;height:20px;background-color:#ccc;margin-left:68px;"></div>
              <div style="width:70px;height:2px;background-color:#ccc;"></div>
            </div>
          </div>
        </div>
        <div>
          <img src="../assets/特卖汇.jpeg" alt style="width:650px;height:350px;" />
        </div>
      </div>
      <div style="padding:20px 0;">
        <img src="../assets/import.png" alt style="width:100%;height:60px;" />
      </div>
      <!-- 特价机票 -->
      <div style="padding:10px 0;" class="flex a-center">
        <img src="../assets/blue.png" alt style="width:24px;height:24px;" />
        <span style="color:#409EFF;font-size:24px;">特价机票</span>
      </div>
      <div class="flex j-between border position-r" style="padding:15px 0;">
        <div v-for="(item,index) in ressale" :key="index" style="flex:1;" class="t-center">
          <img :src="ressale[0].cover" alt style="width:90%;height:200px;" />
          <div class="flex j-center">
            <div
              class="position-a flex j-around border bj-b"
              style="bottom:15px;width:22.5%;color:#fff;flex:1;opacity: 0.5;"
            >
              <div>{{item.departCity}}-{{item.destCity}}</div>
              <div>￥{{item.price}}</div>
            </div>
          </div>
        </div>
      </div>
      <div style="height:20px;"></div>
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
import api from "../http/api";
import { Resairssale, ResairssaleItem } from "../types/index";
import { Modal } from "ant-design-vue";
import { Form } from "ant-design-vue/types/form/form.d";
interface LabelColItem {
  span: number;
}
interface FormItem {
  Startingcity?: string;
  Arrivingcity?: string;
  day?: string;
}
interface Data {
  name: string;
  ressale: ResairssaleItem;
  title: string;
  content: string;
  labelCol: LabelColItem;
  wrapperCol: LabelColItem;
  form: FormItem;
  changeflag: string;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const data: Data = reactive<Data>({
      name: "jack",
      ressale: {},
      title: "提示",
      content: "目前暂不支持往返,请选择单程选票",
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      form: {},
      changeflag: ""
    });
    const warning111 = (): void => {
      Modal.warning({
        title: data.title,
        content: data.content,
        okText: "确定"
      });
    };
    //切换城市
    const clickchange = (): void => {
      data.changeflag = data.form.Startingcity!;
      data.form.Startingcity = data.form.Arrivingcity!;
      data.form.Arrivingcity = data.changeflag!;
      console.log(data.form.day);
    };
    onMounted(() => {
      api
        .getairssale()
        .then((res: Resairssale) => {
          data.ressale = res.data!;
          console.log(data.ressale);
        })
        .catch((err: any) => {
          console.log(err);
        });
    });
    return {
      ...toRefs(data),
      warning111,
      clickchange
    };
  }
});
</script>

<style scoped lang='scss'>
</style>