<template>
  <scroll-bar>
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="activeIndex"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      @select="handleSelect"
    >
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
import ScrollBar from "@/components/ScrollBar";

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters(["sidebar", "routers"]),
    routes() {
      // return this.$router.options.routes
      return this.routers;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
    data() {
      return {
        activeIndex: this.$route.path,
      };
    },

    watch: {
      $route(to, from) {
        this.activeIndex = to.path;
      },
    },
    mounted() {},
    methods: {
      handleSelect(key, keyPath) {},
    },
  },
};
</script>
