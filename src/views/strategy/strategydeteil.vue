<template>
  <div class="bj-f flex j-center">
    <div style="width:70vw;padding:15px 0;" class="flex j-between">
      <!-- 旅游攻略详情 -->
      <div v-for="(item,index) in postsdetail" :key="index" style="width:70%;">
        <div class="top c-pointer" style="margin-bottom:15px;">
          <span style="font-weight:600" @click="gotoback">旅游攻略</span>
          <span style="color:#ccc;">/</span>
          <span style="color:#ccc;">旅游详情</span>
        </div>
        <div
          style="font-weight:600;font-size:28px;margin-bottom:20px;border-bottom:1px solid #ccc;"
        >{{item.title}}</div>
        <div style="text-align:right;margin-bottom:15px;">
          <span style="margin-right:10px;">{{day}}</span>
          <span>阅读:{{item.watch}}</span>
        </div>
        <div v-html="item.content" class="content"></div>
        <div class="flex j-around" style="color:#FFAD00;margin:30px 0;">
          <div>
            <div>
              <FormOutlined style="font-size:40px;" />
            </div>
            <div style="text-align:center;">评论()</div>
          </div>
          <div>
            <div>
              <ShareAltOutlined style="font-size:40px;" />
            </div>
            <div style="text-align:center;">分享</div>
          </div>
        </div>
        <div style="font-size:20px;font-weight:500">评论</div>
        <div style="margin:10px 0;">
          <a-textarea v-model:value="value111" placeholder="说点什么吧..." :rows="3" />
        </div>
        <div>
          <a-upload
            v-model:fileList="fileList"
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :action="api/upload"
            :before-upload="beforeUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
            <div v-else>
              <loading-outlined v-if="loading" />
              <plus-outlined v-else />
            </div>
          </a-upload>
        </div>
      </div>
      <!-- 相关攻略 -->
      <div style="width:30%;margin-left:20px;">
        <div style="font-size:20px;padding-bottom:15px;border-bottom:1px solid #ccc;">相关攻略</div>
        <div
          class="flex j-between"
          v-for="(item,index) in Resposts111"
          :key="index"
          style="padding:15px 0;"
        >
          <div class="flex j-between" @click="gotodetail(item)">
            <div>
              <img :src="item.images[0]" alt style="width:120px; height:80px;" />
            </div>
            <div style="margin-left:10px;">
              <div style="font-weight:600;font-size:15px;" class="summary">{{item.title}}</div>
              <div style="font-size:10px;margin-top:15px;" class="flex j-between">
                <div>{{item.timer}}</div>
                <div>阅读:{{item.watch}}</div>
              </div>
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
import { useRoute, useRouter } from "vue-router";
import api from "../../http/api";
import { Resposts, RespostsItem } from "../../types/index";
interface Data {
  name: string;
  id: string;
  postsdetail: RespostsItem[];
  day: string;
  day111: string;
  values: string;
  value111: string;
  Resposts111: RespostsItem[];
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const route = useRoute();
    const router = useRouter();
    const data: Data = reactive<Data>({
      name: "",
      id: "",
      postsdetail: [],
      day: "",
      values: "",
      value111: "",
      Resposts111: [],
      day111: ""
    });
    //此城市文章详情
    const getgetpostsdetail = (): void => {
      api
        .getgetpostsdetail({ id: data.id })
        .then((res: Resposts) => {
            console.log(res,'jagvjhbajbcf')
          data.postsdetail = res.data! as RespostsItem[];
          data.postsdetail.map(item => {
            const a = item.updated_at!;
            const date = new Date(a);
            data.day = date.toLocaleString();
          });
          console.log(data.postsdetail);
        })
        .catch((err: any) => {
          console.log(err);
        });
    };
    const gotoback = (item: RespostsItem): void => {
      router.push("/strategy");
    };
    //文章详情
    const getposts = (): void => {
      api
        .getposts({ city: data.values })
        .then((res: Resposts) => {
          data.Resposts111 = res.data! as RespostsItem[];
          data.Resposts111 = data.Resposts111.splice(0, 4);
          data.Resposts111.map(item => {
            const a = item.updated_at!;
            const date = new Date(a);
            data.day111 = date.toLocaleString()!;
            item.timer = data.day111!;
          });
          console.log(data.Resposts111, "文章详情");
        })
        .catch((err: any) => {
          console.log(err);
        });
    };
    const gotodetail = (item: RespostsItem): void => {
      const a = String(item.id);
      data.id = a;
      getgetpostsdetail();
    };
    onMounted(() => {
      console.log(route.query.id);
      data.id = route.query.id! as string;
      getgetpostsdetail();
      getposts();
    });
    return {
      ...toRefs(data),
      getgetpostsdetail,
      gotoback,
      getposts,
      gotodetail
    };
  }
});
</script>

<style scoped lang='scss'>
.content/deep/img {
  width: 784px !important;
  height: 400px !important;
}
.content/deep/p:nth-of-type(5) > img {
  width: 30px !important;
  height: 30px !important;
}
.top > span {
  margin-right: 5px;
}
.summary {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>