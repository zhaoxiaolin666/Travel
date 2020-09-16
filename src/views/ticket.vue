<template>
  <div style="width:100vw;" class="flex bj-f j-center">
    <div style="width:70vw;">
      <div style="padding:10px 0;" class="flex a-center">
        <img src="../assets/feiji.png" alt style="width:22=4px;height:24px;" />
        <span style="font-size:24px;color:#FFA500;font-weight:400">国内机票</span>
      </div>
      <div class="flex">
        <div style="width:100%;height:350px" class="border"></div>
        <div>
          <img src="../assets/特卖汇.jpeg" alt style="width:600px;height:350px;" />
        </div>
      </div>
      <div style="padding:20px 0;">
        <img src="../assets/import.png" alt style="width:100%;height:60px;" />
      </div>
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
  onMounted
} from "vue";
import api from "../http/api";
import { Resairssale, ResairssaleItem } from "../types/index";

interface Data {
  name: string;
  ressale: ResairssaleItem;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const data: Data = reactive<Data>({
      name: "jack",
      ressale: {}
    });
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
      ...toRefs(data)
    };
  }
});
</script>

<style scoped lang='scss'>
</style>