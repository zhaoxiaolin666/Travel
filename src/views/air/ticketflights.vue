<template>
  <div class="flex j-center bj-f">
    <div style="width:70vw;margin:10px 0;" class="flex j-between">
      <div style="width:75%;margin-top:10px;">
        <div class="flex j-between a-center">
          <!-- 头部 -->
          <div>单程:{{info.departCity}} - {{info.destCity}} / {{info.departDate}}</div>
          <!-- 筛选条件 -->
          <div class="flex cont">
            <div>
              <a-select
                v-model:value="value111"
                style="width:120px"
                ref="select1"
                placeholder="起飞机场"
              >
                <a-select-option :value="item" v-for="(item,index) in options.airport" :key="index">
                  <div @click="clickairport(item)">{{item}}</div>
                </a-select-option>
              </a-select>
            </div>
            <div>
              <a-select
                v-model:value="value222"
                style="width:120px"
                ref="select2"
                placeholder="起飞时间"
              >
                <a-select-option
                  :value="`${item.from}:00 - ${item.to}:00`"
                  ref="select3"
                  v-for="(item,index) in options.flightTimes"
                  :key="index"
                >
                  <div @click="clicktime(item.from)">{{item.from}}:00 - {{item.to}}:00</div>
                </a-select-option>
              </a-select>
            </div>
            <div>
              <a-select
                v-model:value="value333"
                style="width:120px"
                ref="select3"
                placeholder="航空公司"
              >
                <a-select-option :value="item" v-for="(item,index) in options.company" :key="index">
                  <div @click="clickcompany(item)">{{item}}</div>
                </a-select-option>
              </a-select>
            </div>
            <div>
              <a-select v-model:value="value444" style="width:120px" ref="select4" placeholder="机型">
                <a-select-option :value="item.name" v-for="(item,index) in size" :key="index">
                  <div @click="clicksize(item.size)">{{item.name}}</div>
                </a-select-option>
              </a-select>
            </div>
          </div>
        </div>
        <div>
          <span style="margin:10px 15px 0 0;">筛选:</span>
          <span>
            <a-button type="primary" @click="cancel">撤销</a-button>
          </span>
        </div>
        <!-- 机票头部 -->
        <div
          style="width:100%;background:#f9f9f9;padding:15px;margin:15px 0;"
          class="flex j-around border headtop"
        >
          <div>航空信息</div>
          <div>起飞时间</div>
          <div>到达时间</div>
          <div>价格</div>
        </div>
        <!-- 实时机票 -->
        <div
          v-for="(item,index) in flights111.slice((current-1)*pageSize,pageSize*current)"
          :key="index"
        >
          <div style="margin:5px 0;" class="border">
            <div
              class="flex j-around a-center c-default"
              style="padding:10px 0;"
              @click="opens(index)"
            >
              <div
                style="font-weight:600;width:25%;text-align:center;"
              >{{item.airline_name}}{{item.flight_no}}</div>
              <div style="width:20%;text-align:center;">
                <div style="font-weight:600;font-size:24px;text-align:center;">{{item.dep_time}}</div>
                <div>{{item.org_airport_name}}{{item.org_airport_quay}}</div>
              </div>
              <div style="width:10%;">
                <div style="text-align:center;">{{item.time111}}</div>
                <div style="background:#ccc;width:100%;height:1px;"></div>
              </div>
              <div style="width:20%;text-align:center;">
                <div style="font-weight:600;font-size:24px;text-align:center;">{{item.arr_time}}</div>
                <div>{{item.dst_airport_name}}{{item.dst_airport_quay}}</div>
              </div>
              <div style="width:25%;text-align:center;">
                <span>￥</span>
                <span
                  style="color:#FFA500;font-size:24px;font-size:24px;"
                >{{item.seat_infos[0].org_settle_price_child}}</span>
                <span>起</span>
              </div>
            </div>
            <div v-if="flag===index" style="background:#f9f9f9;">
              <div class="flex" style="padding:20px 10px;">
                <div
                  class="flex a-center j-center"
                  style="font-weight:600;font-size:18px;width:25%;"
                >低价推荐</div>
                <div style="width:75%;">
                  <div v-for="(item1,index1) in item.seat_infos" :key="index1">
                    <div
                      class="flex j-between a-center"
                      style="border-bottom:1px solid #eee;padding-bottom:10px;margin-bottom:10px;"
                    >
                      <div>
                        <span style="color:green;">{{item1.group_name}}</span>
                        <span>|</span>
                        <span>{{item1.supplierName}}</span>
                      </div>
                      <div class="flex a-center j-between" style="width:30%;">
                        <div style="font-size:24px;color:#FFA500;">￥{{item1.par_price}}</div>
                        <div>
                          <div>
                            <a-button type="warning" @click="gotoairorder">选定</a-button>
                          </div>
                          <div class="t-center">剩余:{{item1.discount}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <div>
          <a-pagination
            :page-size-options="pageSizeOptions"
            @showSizeChange="onShowSizeChange"
            show-quick-jumper
            show-size-changer
            v-model:current="current"
            v-model:pageSize="pageSize"
            :total="flights111.length"
            :show-total="(total, range) => `${range[0]}-${range[1]} 共 ${total} 条`"
            @change="ChangepageNumber"
          >
            <template v-slot:buildOptionText="props">
              <span v-if="props.value !== '100'">{{ props.value }}条/页</span>
              <span v-else>全部</span>
            </template>
          </a-pagination>
        </div>
      </div>
      <!-- 右侧内容 -->
      <div style="width:21%;">
        <div>
          <img src="../../assets/planeticket.png" alt style="width:100%;" />
        </div>
        <div style="margin-top:10px;width:100%;" class="border">
          <div style="margin:10px;">
            <div style="border-bottom:1px solid #eee;margin-bottom:5px;">历史查询</div>
            <div style="text-align:center;">
              <img src="../../assets/lishi.png" alt />
            </div>
          </div>
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
import { infoitem, optionsItem, flightsItem } from "../../types/index";
import dayjs from "dayjs";
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
  flights?: flightsItem[];
  flights111?: flightsItem[];
  current: number;
  pageSize: number;
  flag: number;
  pageSizeOptions: [string, string, string, string, string];
  value111: string;
  value222: string;
  value333: string;
  value444: string;
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
          name: "大",
          size: "L"
        },
        {
          name: "中",
          size: "M"
        },
        {
          name: "小",
          size: "S"
        }
      ],
      flights: [],
      flights111: [],
      current: 1,
      pageSize: 5,
      flag: -1,
      pageSizeOptions: ["5", "10", "15", "20", "100"],
      value111: "",
      value222: "",
      value333: "",
      value444: ""
    });
    //分页
    const onShowSizeChange = (current: number, pageSize: number): void => {
      console.log(pageSize);
      data.pageSize = pageSize;
    };
    // 机票列表
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
          data.flights = res.flights! as flightsItem[];
          data.flights.map((item: any): void => {
            const time =
              new Date(item.arr_datetime).getTime() -
              new Date(item.dep_datetime).getTime();
            if (time > 0) {
              const c = time / 3600000;
              const a = parseInt(c.toString());
              const b = (time % 3600000) / 60000;
              item.time111 = `${a}时${b}分`;
            } else {
              const times = time + 3600000 * 24;
              const c = times / 3600000;
              const a = parseInt(c.toString());
              const b = (times % 3600000) / 60000;
              item.time111 = `${a}时${b}分`;
            }
          });
          data.flights111 = data.flights;
          console.log(data.flights111);
          console.log(data.flights);
        })
        .catch((err: any) => {
          console.log(err);
        });
    };
    // 页面大小
    const ChangepageNumber = (pageNumber: any): void => {
      console.log(pageNumber, "Page");
    };
    //打开机票
    const opens = (index: number): void => {
      if (data.flag === index) {
        data.flag = -1;
      } else {
        data.flag = index;
        console.log(index, data.flag, 111);
      }
    };
    //筛选机场
    const clickairport = (value: string): void => {
      data.flights111 = data.flights;
      const flights222 = []! as flightsItem[];
      const flights333 = data.flights111!;
      flights333.map(item => {
        if (item.org_airport_name === value) {
          flights222.push(item);
        }
      });
      data.flights111 = flights222!;
    };
    //筛选公司
    const clickcompany = (value: string): void => {
      data.flights111 = data.flights;
      const flights222 = []! as flightsItem[];
      const flights333 = data.flights111!;
      flights333.map(item => {
        if (item.airline_name === value) {
          flights222.push(item);
        }
      });
      data.flights111 = flights222!;
    };
    //筛选起飞时间
    const clicktime = (value: string): void => {
      data.flights111 = data.flights;
      const flights222 = []! as flightsItem[];
      const flights333 = data.flights111!;
      flights333.map(item => {
        const time111 = item.dep_time.substr(0, 2);
        const time222 = item.dep_time.substr(0, 1);
        console.log(time111, time222);
        if (time222 === "0") {
          const time333 = item.dep_time.substr(1, 2);
          if (time333 >= value) {
            flights222.push(item);
          }
        } else {
          console.log(222);
          if (time111 >= value) {
            flights222.push(item);
          }
        }
      });
      data.flights111 = flights222!;
    };
    //筛选机型
    const clicksize = (value: string): void => {
      data.flights111 = data.flights;
      const flights222 = []! as flightsItem[];
      const flights333 = data.flights111!;
      flights333.map(item => {
        if (item.plane_size === value) {
          flights222.push(item);
        }
      });
      data.flights111 = flights222!;
    };
    //撤销
    const cancel = (): void => {
      data.value111 = "";
      data.value222 = "";
      data.value333 = "";
      data.value444 = "";
      data.flights111 = data.flights;
    };
    const gotoairorder = (): void => {
      router.push("/ticket/order");
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
      ...toRefs(data),
      ChangepageNumber,
      opens,
      onShowSizeChange,
      clickairport,
      clickcompany,
      clicksize,
      cancel,
      clicktime,
      gotoairorder
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
.headtop {
  div {
    width: 25%;
    text-align: center;
  }
}
</style>