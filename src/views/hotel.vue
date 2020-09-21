<template>
  <div style="width:100vw;" class="bj-f flex j-center">
    <div style="width:70vw;height:500px;">
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
            <a-button type="primary" html-type="submit" size="large">查看价格</a-button>
          </a-form-item>
        </a-form>
      </div>
      <div>
        <div id="container" style="height:300px;width:400px;"></div>
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
      }
    });
    // const disabledDate=(current:any):void=> {
    //   // Can not select days before today and today
    //   return current && current < moment().endOf('day');
    // },
    onMounted(() => {
      const map = new AMap.Map("container", {
        zoom: 12 //设置地图的缩放级别
      });
      console.log(AMap);
    });
    return {
      ...toRefs(data),
      onMounted,
      container
    };
  }
});
</script>

<style scoped lang='scss'>
</style>