<template>
  <div>22222222222222222222222</div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
interface Data {
  name: string;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
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
</style>