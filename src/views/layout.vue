<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header>
        <child></child>
      </a-layout-header>
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer>
        <img src="../assets/bottom.png" style="width:100vw" />
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
import child from "@/components/child.vue";
interface Data {
  name: string;
}
export default defineComponent({
  name: "",
  props: {},
  components: {
    child
  },
  setup(props, ctx: SetupContext) {
    const data: Data = reactive<Data>({
      name: "jack"
    });
    return {
      ...toRefs(data)
    };
  }
});
</script>

<style scoped lang='scss'>
#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
  background: #fff;
}
.ant-layout-header {
  margin-bottom: 3px;
  padding: 0 !important;
}
.ant-layout-footer {
  padding: 0 !important;
}
.ant-layout-content {
  margin-bottom: -6px;
}
</style>