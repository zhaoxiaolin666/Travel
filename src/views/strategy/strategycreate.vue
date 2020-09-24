<template>
  <div></div>
  <!-- <div class="bj-f flex j-center" style="width:100vw">
    <div style="width:70vw;margin:20px 0;" class="flex">
      <div style="width:70%;">
        <div style="font-size:20px;font-weight:500">发表新攻略</div>
        <div>分享你的个人游记，让更多人看到哦！</div>
        <div style="width:100%;padding:10px 0;">
          <a-input
            v-model:value="value111"
            placeholder="请输入标题"
            size="large"
            style="width:100%;"
          />
        </div>
        <div>
         
        </div>
        <div class="flex a-center" style="padding:10px 0;">
          <div style="font-size:16px;margin-right:15px;">选择城市</div>
          <div>
            <a-input
              v-model:value="value222"
              placeholder="请搜索游玩城市"
              size="large"
              style="width:100%;"
            />
          </div>
        </div>
        <div class="flex a-center">
          <div>
            <a-button type="primary">发布</a-button>
          </div>
          <div style="margin-left:15px;">
            <span>或者</span>
            <span style="color:orange;">保存到草稿</span>
          </div>
        </div>
      </div>
      <div style="width:25vw;margin:20px;">
        <div class="border" style="width:100%;">
          <div style="margin:15px;">草稿箱(0)</div>
        </div>
        <div>
            


      </div>
    </div>
  </div> -->
</template>

<script lang='ts'>
const mavonEditor = require("mavon-editor");
import "mavon-editor/dist/css/index.css";
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
interface Data {
  value: string;
  value111: string;
  value222: string;
  value333: string;
}
export default defineComponent({
  el: "#main",
  name: "editor",
  props: {},
  components: {
    "mavon-editor": mavonEditor.mavonEditor
  },
  setup(props, ctx: SetupContext) {
    const data: Data = reactive<Data>({
      value: "",
      value111: "",
      value222: "",
      value333: ""
    });
    return {
      ...toRefs(data)
    };
  }
});
</script>

<style scoped lang='scss'>
</style>