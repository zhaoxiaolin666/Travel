<template>
  <div style="width:100vw;" class="flex bj-f j-center">
    <div style="width:70vw;">
      <!-- 国内机票 -->
      <div style="padding:10px 0;" class="flex a-center">
        <img src="../assets/feiji.png" alt style="width:22=4px;height:24px;" />
        <span style="font-size:24px;color:#FFA500;font-weight:400"
          >国内机票</span
        >
      </div>
      <div class="flex j-between">
        <div
          style="width:450px;height:350px;border-bottom:1px solid #ccc;border-left:1px solid #ccc;border-right:1px solid #ccc;"
        >
          <div class="flex j-around" style="font-size:20px;">
            <!-- 表单头部 -->
            <div
              style="border-top:3px solid orange;width:100%;text-align:center;padding:5px 0;"
            >
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
            <div style="width:400px;margin:30px 0;">
              <a-form
                :model="form"
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
              >
                <a-form-item label="出发城市">
                  <a-input
                    v-model:value="form.Startingcity"
                    placeholder="请搜索出发城市"
                    @change="Starting"
                  />
                </a-form-item>
                <a-form-item label="到达城市">
                  <a-input
                    v-model:value="form.Arrivingcity"
                    placeholder="请搜索到达城市"
                    @change="Arriving"
                  />
                </a-form-item>
                <a-form-item label="出发时间">
                  <a-date-picker
                    v-model:value="form.day"
                    show-time
                    type="date"
                    placeholder="请选择日期"
                    style="width:100%;"
                    format="YYYY-MM-DD"
                    :disabled-date="disabledDate"
                    @change="Onchange"
                  />
                </a-form-item>
                <div style="margin-left:56px;">
                  <a-button type="primary" block @click="searchticket">
                    <SearchOutlined />搜索
                  </a-button>
                </div>
              </a-form>
            </div>
            <div style="width:100px">
              <div
                style="width:70px;height:2px;background-color:#ccc;margin-top:50px;"
              ></div>
              <div
                style="width:2px;height:20px;background-color:#ccc;margin-left:68px;"
              ></div>
              <div
                style="background-color:#ccc;color:#fff;text-align:center;width:30px;margin-left:54px;"
                class="c-pointer"
                @click="clickchange"
              >
                换
              </div>
              <div
                style="width:2px;height:20px;background-color:#ccc;margin-left:68px;"
              ></div>
              <div style="width:70px;height:2px;background-color:#ccc;"></div>
            </div>
          </div>
        </div>
        <div>
          <img
            src="../assets/特卖汇.jpeg"
            alt
            style="width:650px;height:350px;"
          />
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
        <div
          v-for="(item, index) in ressale"
          :key="index"
          style="flex:1;"
          class="t-center"
        >
          <img
            :src="ressale[0].cover"
            alt
            style="width:90%;height:200px;"
            @click="goto(item)"
          />
          <div class="flex j-center">
            <div
              class="position-a flex j-around border bj-b"
              style="bottom:15px;width:22.5%;color:#fff;flex:1;opacity: 0.5;"
            >
              <div>{{ item.departCity }}-{{ item.destCity }}</div>
              <div>￥{{ item.price }}</div>
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
import { Resairssale, ResairssaleItem, Resaircity } from "../types/index";
import { Modal } from "ant-design-vue";
import { Form } from "ant-design-vue/types/form/form.d";
import moment from "moment";
import "moment/locale/zh-cn";
import { useRouter, useRoute } from "vue-router";
import dayjs from "dayjs";
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
  sort?: string;
  departCode: string;
  destCode: string;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const router = useRouter();
    const route = useRoute();
    const data: Data = reactive<Data>({
      name: "",
      ressale: {},
      title: "提示",
      content: "目前暂不支持往返,请选择单程选票",
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      form: {},
      changeflag: "",
      sort: "",
      departCode: "",
      destCode: ""
    });
    //消息提示
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
      getairscity111();
      getairscity222();
    };
    //出发城市代码
    const getairscity111 = (): void => {
      const a = data.form.Startingcity!;
      api
        .getairscity({ name: a })
        .then((res: any) => {
          if (res.total !== 0) {
            data.departCode = res.data[0].sort!;
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    };
    // 到达城市代码
    const getairscity222 = (): void => {
      const a = data.form.Arrivingcity!;
      api
        .getairscity({ name: a })
        .then((res: any) => {
          if (res.total !== 0) {
            data.destCode = res.data[0].sort!;
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    };
    //出发城市
    const Starting = (): void => {
      //   data.name = data.form.Startingcity!;
      getairscity111();
      console.log(data.form.Startingcity);
      console.log(data.form.day);
    };
    //到达城市
    const Arriving = (value: any): void => {
      //   data.name = data.form.Startingcity!;
      getairscity222();
      console.log(data.form.Arrivingcity);
    };
    //禁用时间
    const disabledDate = (current: any) => {
      //   console.log(current, "current");
      // Can not select days before today and today
      //   return current && current < Date.now() - 24 * 60 * 60 * 1000;
      return current && current < dayjs().subtract(3, "day");
    };
    //时间
    const Onchange = (date: any, dateString: any): void => {
      data.form.day = dateString;
      //   console.log(dateString, "123456");
      //   console.log(date, "123456");
    };
    const searchticket = (): void => {
      console.log(data.departCode, "出发");
      console.log(data.destCode, "到达");
      console.log(data.form.Startingcity, "出发城市");
      console.log(data.form.Arrivingcity, "到达城市");
      console.log(data.form.day, "时间");
      api
        .getairslist({
          departCity: data.form.Startingcity!,
          departCode: data.departCode!,
          destCity: data.form.Arrivingcity!,
          destCode: data.destCode!,
          departDate: data.form.day!
        })
        .then((res: any) => {
          if (res.flights.length > 0) {
            router.push({
              path: "/ticket/flights",
              query: {
                departCity: data.form.Startingcity!,
                departCode: data.departCode!,
                destCity: data.form.Arrivingcity!,
                destCode: data.destCode!,
                departDate: data.form.day!
              }
            });
          } else {
            Modal.warning({
              title: data.title,
              content: "暂无机票,敬请期待",
              okText: "确定"
            });
          }
          console.log(res);
        })
        .catch((err: any) => {
          console.log(err);
        });
    };
    //图片跳转
    const goto = (item: any): void => {
      console.log(item, "跳转参数");
      router.push({
        path: "/ticket/flights",
        query: {
          departCity: item.departCity!,
          departCode: item.departCode!,
          destCity: item.destCity!,
          destCode: item.destCode!,
          departDate: item.departDate!
        }
      });
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
      clickchange,
      Starting,
      Arriving,
      getairscity111,
      getairscity222,
      disabledDate,
      Onchange,
      searchticket,
      goto
    };
  }
});
</script>

<style scoped lang='scss'>
</style>