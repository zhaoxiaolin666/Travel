<template>
  <div style="width:100vw;" class="bj-f flex j-center">
    <div style="width:70vw;margin-bottom:20px;">
      <div style="padding:15px 0 ;">
        <a-breadcrumb separator=">">
          <a-breadcrumb-item>酒店</a-breadcrumb-item>
          <a-breadcrumb-item>酒店预订</a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <div style="padding:15px 0 ;">
        <a-form layout="inline" :model="formInline">
          <a-form-item>
            <a-input v-model:value="formInline.user" placeholder="切换城市" size="large"></a-input>
          </a-form-item>
          <a-range-picker
            format="YYYY-MM-DD HH:mm:ss"
            size="large"
            style="margin-right:15px;"
            :placeholder="['入住日期', '离店日期']"
          />
          <a-form-item>
            <a-input v-model:value="formInline.user" placeholder="人数未定" size="large">
              <template v-slot:suffix>
                <a-tooltip title="Extra information">
                  <UserOutlined style="color: rgba(0,0,0,.45)" />
                </a-tooltip>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" size="large" style="margin-left:15px;">查看价格</a-button>
          </a-form-item>
        </a-form>
      </div>
      <div class="flex j-between">
        <div style="width:60%;">
          <div class="flex j-between">
            <div style="width:100px;">区域:</div>
            <div class="flex f-wrap">
              <div v-for="(item,index) in nearby" :key="index">
                <div style="margin-right:10px;">{{item.name}}</div>
              </div>
            </div>
          </div>
          <!-- 均价 -->
          <div class="flex a-center" style="margin-top:20px;">
            <div class="flex junjia">
              <div>均价</div>
              <div>
                <a-tooltip>
                  <template v-slot:title>价格均价由平日价格计算得出，节假日价格会有上浮</template>
                  <a-badge>
                    <template v-slot:count>
                      <QuestionCircleOutlined style="color:gray;" />
                    </template>
                  </a-badge>
                </a-tooltip>
              </div>
              <div>:</div>
            </div>
            <div style="margin-right:15px;">
              <a-tooltip>
                <template v-slot:title>等级评定是针对房价，设施和服务等各方面的综合评定</template>
                <a-rate v-model:value="value1" allowHalf :count="value1" disabled>
                  <template v-slot:character>
                    <SketchOutlined />
                  </template>
                </a-rate>
                <span>￥332</span>
              </a-tooltip>
            </div>
            <div style="margin-right:15px;">
              <a-tooltip>
                <template v-slot:title>等级评定是针对房价，设施和服务等各方面的综合评定</template>
                <a-rate v-model:value="value2" allowHalf :count="value2" disabled>
                  <template v-slot:character>
                    <SketchOutlined />
                  </template>
                </a-rate>
                <span>￥521</span>
              </a-tooltip>
            </div>
            <div style="margin-right:15px;">
              <a-tooltip>
                <template v-slot:title>等级评定是针对房价，设施和服务等各方面的综合评定</template>
                <a-rate v-model:value="value3" allowHalf :count="value3" disabled>
                  <template v-slot:character>
                    <SketchOutlined />
                  </template>
                </a-rate>
                <span>￥768</span>
              </a-tooltip>
            </div>
          </div>
        </div>
        <!-- 地图 -->
        <div style="width:40%;">
          <div id="container" style="height:300px;width:400px;"></div>
        </div>
      </div>
      <div class="flex navs a-center border" style="margin-top:20px;">
        <!-- 1 -->
        <div class="right">
          <div class="flex j-around">
            <div>价格</div>
            <div>0-{{inputValue}}</div>
          </div>
          <div>
            <a-row>
              <a-col>
                <a-slider v-model:value="inputValue" :min="1" :max="4000" />
              </a-col>
            </a-row>
          </div>
        </div>
        <!-- 2 -->
        <div class="right">
          <div style="margin-left:33px;">住宿等级</div>
          <div style="text-align:right;">
            <a-select v-model:value="value11" style="width:82%;" ref="select">
              <a-select-option
                :value="item.name"
                v-for="(item,index) in datahotel.levels"
                :key="index"
              >{{item.name}}</a-select-option>
            </a-select>
          </div>
        </div>
        <!-- 3 -->
        <div class="right">
          <div style="margin-left:33px;">住宿类型</div>
          <div style="text-align:right;">
            <a-select v-model:value="value22" style="width:82%;" ref="select">
              <a-select-option
                :value="item.name"
                v-for="(item,index) in datahotel.types"
                :key="index"
              >{{item.name}}</a-select-option>
            </a-select>
          </div>
        </div>
        <!-- 4 -->
        <div class="right">
          <div style="margin-left:33px;">酒店设施</div>
          <div style="text-align:right;">
            <a-select v-model:value="value33" style="width:82%;" ref="select">
              <a-select-option
                :value="item.name"
                v-for="(item,index) in datahotel.assets"
                :key="index"
              >{{item.name}}</a-select-option>
            </a-select>
          </div>
        </div>
        <!-- 5 -->
        <div class="right">
          <div style="margin-left:33px;">酒店品牌</div>
          <div style="text-align:right;">
            <a-select v-model:value="value44" style="width:82%;" ref="select">
              <a-select-option
                :value="item.name"
                v-for="(item,index) in datahotel.brands"
                :key="index"
              >{{item.name}}</a-select-option>
            </a-select>
          </div>
        </div>
        <!-- 6 -->
        <div class="t-center">
          <a-button type="primary" value="large">撤销条件</a-button>
        </div>
      </div>
      <div v-for="(item,index) in hotel" :key="index">
        <div
          class="flex j-between"
          style="margin:20px 0;border-bottom:1px solid #eee;padding-bottom:20px;"
        >
          <div>
            <!-- 酒店图片 -->
            <img :src="item.photos" alt style="width:350px;height:250px;" />
          </div>
          <div style="width:100%;margin-left:20px;">
            <div>
              <!-- 酒店中文名 -->
              <div style="font-size:24px;font-weight:500;margin-bottom:5px;">{{item.name}}</div>
              <!-- 酒店英文名 -->
              <div class="flex a-center">
                <div>{{item.alias}}</div>
                <div style="margin:0 15px;">
                  <a-rate v-model:value="item.stars" allowHalf :count="item.stars" disabled>
                    <template v-slot:character>
                      <SketchOutlined />
                    </template>
                  </a-rate>
                </div>
                <div>{{item.hoteltype.name}}</div>
              </div>
              <!-- 酒店评分 -->
              <div class="flex a-center" style="margin:10px 0;">
                <div>
                  <a-rate v-model:value="item.stars" allowHalf disabled></a-rate>
                  <span>{{item.stars}}分</span>
                </div>
                <div style="margin:0 15px;">
                  <span style="color:#F7BA2A">{{item.all_remarks}}</span>
                  <span style="font-size:18px;">条评价</span>
                </div>
                <div>
                  <span style="color:#F7BA2A">{{item.num_collected}}</span>
                  <span style="font-size:18px;">篇游记</span>
                </div>
              </div>
              <div class="flex">
                <div>
                  <EnvironmentOutlined style="width:18px;height:18px;" />
                </div>
                <div>位于:{{item.address}}</div>
              </div>
            </div>
          </div>
          <div style="width:450px;margin-top:50px;">
            <div v-for="(item1,index1) in item.products" :key="index1">
              <div
                class="flex j-between conts"
                style="border-bottom:1px solid #eee;padding:0 20px 10px 20px;"
              >
                <div>{{item1.name}}</div>
                <div>
                  <sapn style="color:orange;font-size:18px;font-weight:500">￥{{item1.price}}</sapn>
                  <sapn>&nbsp;起&nbsp;&nbsp;</sapn>
                  <span>&gt;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  ref,
  onMounted
} from "vue";
import api from "../http/api";
interface FormInline {
  user: "";
  password: "";
}
interface Data {
  name: string;
  formInline: FormInline;
  inputValue: string;
  value1: number;
  value2: number;
  value3: number;
  value11: string;
  value22: string;
  value33: string;
  value44: string;
  city: string;
  departCode: number;
  hotel: [];
  nearby: [];
  datahotel: {};
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const container = ref<HTMLDivElement | null>(null);
    const data: Data = reactive<Data>({
      name: "jack",
      formInline: {
        user: "",
        password: ""
      },
      inputValue: "4000",
      value1: 3,
      value2: 4,
      value3: 5,
      value11: "不限",
      value22: "不限",
      value33: "不限",
      value44: "不限",
      city: "成都市",
      departCode: 239,
      hotel: [],
      nearby: [],
      datahotel: {}
    });
    const gethotels = (): void => {
      api
        .gethotels({
          city: data.departCode
        })
        .then((res: any) => {
          console.log(res);
          data.hotel = res.data;
        })
        .catch((err: any) => {
          console.log(err);
        });
    };
    //出发城市代码
    const getairscity = (): void => {
      api
        .getairscity({ name: data.city })
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
    //城市附近
    const getcities = (): void => {
      api
        .getcities({ name: data.city })
        .then((res: any) => {
          data.nearby = res.data[0].scenics;
          console.log(data.nearby);
        })
        .catch((err: any) => {
          console.log(err);
        });
    };
    const gethotelsoptions = (): void => {
      api
        .gethotelsoptions()
        .then((res: any) => {
          console.log(res);
          data.datahotel = res.data!;
        })
        .catch((err: any) => {
          console.log(err);
        });
    };
    onMounted(() => {
      getairscity();
      gethotels();
      getcities();
      gethotelsoptions();
      const map = new AMap.Map("container", {
        zoom: 12 //设置地图的缩放级别
      });
      // AMap.plugin("AMap.CitySearch", () => {
      //   const citySearch = new AMap.CitySearch();
      //   citySearch.getLocalCity(function(status: any, result: any) {
      //     if (status === "complete" && result.info === "OK") {
      //       // 查询成功，result即为当前所在城市信息
      //       console.log(result);
      //     }
      //   });
      // });
    });
    return {
      ...toRefs(data),
      onMounted,
      gethotels,
      getcities
    };
  }
});
</script>

<style scoped lang='scss'>
.navs > div {
  flex: 1;
}
.right {
  border-right: 1px solid #ccc;
  padding-right: 10px;
  margin: 10px 0;
}
.junjia > div {
  margin-right: 10px;
  font-size: 16px;
}
.conts:hover {
  background-color: #f0f0f0;
  cursor: pointer;
}
</style>