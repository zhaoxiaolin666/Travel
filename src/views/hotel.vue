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
          <a-range-picker format="YYYY-MM-DD HH:mm:ss" size="large" />
          <a-form-item>
            <a-input
              v-model:value="formInline.user"
              placeholder="人数未定"
              size="large"
              style="margin-left:15px;"
            ></a-input>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" size="large" style="margin-left:15px;">查看价格</a-button>
          </a-form-item>
        </a-form>
      </div>
      <div>
        <div></div>
        <!-- 地图 -->
        <div id="container" style="height:300px;width:400px;"></div>
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
          <div class="flex j-around">
            <div>不限</div>
            <div>
              <DownOutlined />
            </div>
          </div>
        </div>
        <!-- 3 -->
        <div class="right">
          <div style="margin-left:33px;">住宿类型</div>
          <div class="flex j-around">
            <div>不限</div>
            <div>
              <DownOutlined />
            </div>
          </div>
        </div>
        <!-- 4 -->
        <div class="right">
          <div style="margin-left:33px;">酒店设施</div>
          <div class="flex j-around">
            <div>不限</div>
            <div>
              <DownOutlined />
            </div>
          </div>
        </div>
        <!-- 5 -->
        <div class="right">
          <div style="margin-left:33px;">酒店品牌</div>
          <div class="flex j-around">
            <div>不限</div>
            <div>
              <DownOutlined />
            </div>
          </div>
        </div>
        <!-- 6 -->
        <div class="t-center">
          <a-button type="primary" value="large">撤销条件</a-button>
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
interface FormInline {
  user: "";
  password: "";
}
interface Data {
  name: string;
  formInline: FormInline;
  inputValue: string;
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
      inputValue: "4000"
    });
    // const disabledDate=(current:any):void=> {
    //   // Can not select days before today and today
    //   return current && current < moment().endOf('day');
    // },
    onMounted(() => {
      const map = new AMap.Map("container", {
        zoom: 12 //设置地图的缩放级别
      });
      //   AMap.plugin("AMap.CitySearch", () => {
      //     const citySearch = new AMap.CitySearch();
      //     citySearch.getLocalCity(function(status: any, result: any) {
      //       if (status === "complete" && result.info === "OK") {
      //         // 查询成功，result即为当前所在城市信息
      //         console.log(result);
      //       }
      //     });
      //   });
      console.log(map);
      console.log(AMap);
    });
    return {
      ...toRefs(data),
      onMounted
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
</style>