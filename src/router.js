import Vue from "vue";
import Router from "vue-router";
import Layout from "@/components/layout/Layout";

Vue.use(Router);

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export default new Router({
  routes: [
    {
      path: "/",
      component: Layout,
      redirect: "/example/home"
    },
    {
      path: "/example",
      component: Layout,
      redirect: "/example/home",
      name: "example",
      meta: { title: "example", icon: "example" },
      children: [
        {
          path: "home",
          name: "home",
          component: () => import("@/views/home.vue"),
          meta: { title: "home", icon: "table" }
        },
        {
          path: "about",
          name: "about",
          component: () => import("@/views/about"),
          meta: { title: "about", icon: "tree" }
        }
      ]
    },
    {
      path: "/st-amap",
      component: Layout,
      redirect: "/amap/demo",
      name: "amap",
      meta: { title: "amap", icon: "example" },
      children: [
        {
          path: "demo",
          name: "demo",
          component: () => import("@/views/amap/st-amap-demo.vue"),
          meta: { title: "demo", icon: "tree" }
        },
        {
          path: "position",
          name: "position",
          component: () => import("@/views/amap/st-amap-position-demo.vue"),
          meta: { title: "position", icon: "tree" }
        },
        {
          path: "remarker",
          name: "remarker",
          component: () => import("@/views/amap/st-amap-remarker-demo.vue"),
          meta: { title: "remarker", icon: "tree" }
        },
        {
          path: "simple-marker",
          name: "simple-marker",
          component: () =>
            import("@/views/amap/st-amap-simple-marker-demo.vue"),
          meta: { title: "simple-marker", icon: "tree" }
        },
        {
          path: "info-window",
          name: "info-window",
          component: () => import("@/views/amap/st-amap-info-window-demo.vue"),
          meta: { title: "info-window", icon: "tree" }
        },
        {
          path: "canvas",
          name: "canvas",
          component: () => import("@/views/amap/st-amap-canvas-demo.vue"),
          meta: { title: "canvas", icon: "tree" }
        },
        {
          path: "svg",
          name: "svg",
          component: () => import("@/views/amap/st-amap-svg-demo.vue"),
          meta: { title: "svg", icon: "tree" }
        },
        {
          path: "sector",
          name: "sector",
          component: () => import("@/views/amap/st-amap-sector-demo.vue"),
          meta: { title: "sector", icon: "tree" }
        },
        {
          path: "azimuth",
          name: "azimuth",
          component: () => import("@/views/amap/st-amap-azimuth-demo.vue"),
          meta: { title: "azimuth", icon: "tree" }
        }
      ]
    }
  ]
});
