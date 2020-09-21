<template>
  <div class="flex j-center bj-f">
    <div style="width:70vw;margin:10px 0;" class="flex j-between">
      <div style="width:80%;margin-top:10px;">
        <div class="flex j-between a-center">
          <div>单程:{{info.departCity}} - {{info.destCity}} / {{info.departDate}}</div>
          <div class="flex cont">
            <div>
              <a-select v-model:value="value" style="width:120px" ref="select" placeholder="起飞机场">
                <a-select-option
                  :value="item"
                  v-for="(item,index) in options.airport"
                  :key="index"
                >{{item}}</a-select-option>
              </a-select>
            </div>
            <div>
              <a-select v-model:value="value" style="width:120px" ref="select" placeholder="起飞时间">
                <a-select-option
                  :value="item"
                  v-for="(item,index) in options.flightTimes"
                  :key="index"
                >{{item.from}}:00 - {{item.to}}:00</a-select-option>
              </a-select>
            </div>
            <div>
              <a-select v-model:value="value" style="width:120px" ref="select" placeholder="航空公司">
                <a-select-option
                  :value="item"
                  v-for="(item,index) in options.company"
                  :key="index"
                >{{item}}</a-select-option>
              </a-select>
            </div>
            <div>
              <a-select v-model:value="value" style="width:120px" ref="select" placeholder="机型">
                <a-select-option
                  :value="item.name"
                  v-for="(item,index) in size"
                  :key="index"
                >{{item.name}}</a-select-option>
              </a-select>
            </div>
          </div>
        </div>
        <div>
          <span style="margin:10px 15px 0 0;">筛选:</span>
          <span>
            <a-button type="primary">撤销</a-button>
          </span>
        </div>
        <div
          style="width:100%;background:#f9f9f9;padding:10px 0;margin:15px 0;"
          class="flex j-around border"
        >
          <div>航空信息</div>
          <div>起飞时间</div>
          <div>到达时间</div>
          <div>价格</div>
        </div>
      </div>
      <div style="width:18%;">
        <div>
          <img src="../../assets/top.png" alt />
        </div>
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
import { useRouter, useRoute } from "vue-router";
import api from "../../http/api";
import { infoitem, optionsItem } from "../../types/index";
interface sizeItem {
  [key: string]: string;
}
interface Data {
  name: string;
  departCity: string;
  departCode: string;
  destCity: string;
  destCode: string;
  departDate: string;
  info: infoitem;
  value: string;
  options: optionsItem;
  size?: sizeItem[];
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
      departCity: "",
      departCode: "",
      destCity: "",
      destCode: "",
      departDate: "",
      info: {},
      value: "",
      options: {},
      size: [
        {
          name: "大"
        },
        {
          name: "中"
        },
        {
          name: "小"
        }
      ]
    });
    const getairslist = (): void => {
      api
        .getairslist({
          departCity: data.departCity,
          departCode: data.departCode,
          destCity: data.destCity,
          destCode: data.destCode,
          departDate: data.departDate
        })
        .then((res: any) => {
          console.log(res);
          data.info = res.info! as infoitem;
          data.options = res.options! as optionsItem;
        })
        .catch((err: any) => {
          console.log(err);
        });
    };
    onMounted(() => {
      data.departCity = route.query.departCity! as string;
      data.departCode = route.query.departCode! as string;
      data.destCity = route.query.destCity! as string;
      data.destCode = route.query.destCode! as string;
      data.departDate = route.query.departDate! as string;
      getairslist();
    });
    return {
      ...toRefs(data)
    };
  }
});
</script>

<style scoped lang='scss'>
.cont {
  div {
    margin-left: 10px;
  }
}
</style>