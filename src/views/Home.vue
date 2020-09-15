<template>
  <div class="position-r">
    <div class="position-a" style="left:50%;top:50%;width:500px;margin-left:-250px;z-index:5;">
      <div class="flex c-pointer">
        <div :class="flag===1 ? 'nav1':'nav2'" @click="Strategy">攻略</div>
        <div :class="flag===2 ? 'nav1':'nav2'" @click="hotel">酒店</div>
        <div :class="flag===3 ? 'nav1':'nav2'" @click="planeticket">机票</div>
      </div>
      <div>
        <a-input-search
          v-model:value="value"
          :placeholder="flag===1?'搜索城市':'请输入城市搜索酒店'"
          @search="onSearch"
          size="large"
          style="width:100%"
        />
      </div>
    </div>
    <a-carousel arrows autoplay>
      <template v-slot:prevArrow>
        <div class="custom-slick-arrow" style="left: 20px;zIndex: 1">
          <left-circle-outlined />
        </div>
      </template>
      <template v-slot:nextArrow>
        <div class="custom-slick-arrow" style="right: 20px;zIndex: 1">
          <right-circle-outlined />
        </div>
      </template>
      <div v-for="(item,index) in banners" :key="index">
        <div
          :style="`background: url('http://157.122.54.189:9095${item.url}')`"
          style="height:600px;width:100%;background-position:center;"
        ></div>
      </div>
    </a-carousel>
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
import api from "../http/api";
import { Res, DataItem } from "../types";
import { useRoute, useRouter } from "vue-router";
interface Data {
  name: string;
  banners: DataItem[];
  value: string;
  flag: number;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const route = useRoute();
    const router = useRouter();
    const data: Data = reactive<Data>({
      name: "jack",
      banners: [],
      value: "",
      flag: 1
    });
    const onSearch = (value: any): void => {
      console.log(value);
    };
    const Strategy = (): void => {
      data.flag = 1;
    };
    const hotel = (): void => {
      data.flag = 2;
    };
    const planeticket = (): void => {
      data.flag = 3;
      router.push("/ticket");
    };
    onMounted(() => {
      api
        .getbanners()
        .then((res: Res) => {
          console.log(res);
          data.banners = res.data;
          localStorage.setItem("picture", JSON.stringify(data.banners[2].url));
        })
        .catch((err: any) => {
          console.log(err);
        });
    });
    return {
      ...toRefs(data),
      onSearch,
      Strategy,
      hotel,
      planeticket
    };
  }
});
</script>

<style scoped lang='scss'>
.ant-carousel ::v-deep(.slick-slide) {
  text-align: center;
  overflow: hidden;
}

.ant-carousel ::v-deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}
.ant-carousel ::v-deep(.custom-slick-arrow:before) {
  display: none;
}
.ant-carousel ::v-deep(.custom-slick-arrow:hover) {
  opacity: 0.5;
}

.ant-carousel ::v-deep(.slick-slide h3) {
  color: #fff;
}
.nav1 {
  width: 100px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  background-color: rgba(0, 0, 0, 0);
  border-bottom: 40px solid #f0f0f0;
  border-right: 10px solid transparent;
}
.nav2 {
  width: 100px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0);
  border-bottom: 40px solid rgba(0, 0, 0, 0.5);
  border-right: 10px solid transparent;
}
</style>