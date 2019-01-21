<style>
@import "./css/base.css";
@import"./css/style.css";
@import "mint-ui/lib/style.css";
@import "./assets/font/iconfont.css";
:root {
  --themeColorLeft: #00aaff;
  --themeColorRight: #0085ff;
  --themeColor: #0098ff;
}
a,
a:hover,
a:active,
a:visited,
a:link,
a:focus {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  -webkit-tap-highlight-color: transparent;

  outline: none;

  background: none;

  text-decoration: none;
}
#app {
  overflow-x: hidden;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
<template>
  <div id="app">
    <!-- <v-touch v-on:swiperLeft="onSwiperLeft()"> -->
    <transition :name="transitionName">
      <router-view/>
    </transition>
    <!-- </v-touch> -->
  </div>
</template>

<script>
import Vue from "vue";
window.Vue = Vue;
// import VueTouch from 'touch'
// import Vue from 'vue'
// Vue.use(VueTouch, { name: 'v-touch'})

// import VueRouter from 'vue-router'
// import VueRouterTransition from 'vue-router-transition'
// Vue.use(VueRouter)
// Vue.use(VueRouterTransition, VueRouter)

export default {
  name: "App",
  data() {
    return {
      selected: "tab1",
      transitionName: ""
    };
  },
  watch: {
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
    }
  },
  mounted() {
    /*
    ;(function (win, lib) {
      var doc = win.document
      var docEl = doc.documentElement
      var metaEl = doc.querySelector('meta[name="viewport"]')
      var flexibleEl = doc.querySelector('meta[name="flexible"]')
      var dpr = 0
      var scale = 0
      var tid
      var flexible = lib.flexible || (lib.flexible = {})

      if (metaEl) {
        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/)
        if (match) {
          scale = parseFloat(match[1])
          dpr = parseInt(1 / scale)
        }
      } else if (flexibleEl) {
        var content = flexibleEl.getAttribute('content')
        if (content) {
          var initialDpr = content.match(/initial\-dpr=([\d\.]+)/)
          var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/)
          if (initialDpr) {
            dpr = parseFloat(initialDpr[1])
            scale = parseFloat((1 / dpr).toFixed(2))
          }
          if (maximumDpr) {
            dpr = parseFloat(maximumDpr[1])
            scale = parseFloat((1 / dpr).toFixed(2))
          }
        }
      }

      if (!dpr && !scale) {
        // var isAndroid = win.navigator.appVersion.match(/android/gi)
        var isIPhone = win.navigator.appVersion.match(/iphone/gi)
        var devicePixelRatio = win.devicePixelRatio
        if (isIPhone) {
          // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
          if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
            dpr = 3
          } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
            dpr = 2
          } else {
            dpr = 1
          }
        } else {
          // 其他设备下，仍旧使用1倍的方案
          dpr = 1
        }
        scale = 1 / dpr
      }

      docEl.setAttribute('data-dpr', dpr)
      if (!metaEl) {
        metaEl = doc.createElement('meta')
        metaEl.setAttribute('name', 'viewport')
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no')
        if (docEl.firstElementChild) {
          docEl.firstElementChild.appendChild(metaEl)
        } else {
          var wrap = doc.createElement('div')
          wrap.appendChild(metaEl)
          doc.write(wrap.innerHTML)
        }
      }

      function refreshRem () {
        var width = docEl.getBoundingClientRect().width
        // 适配平板
        if (width / dpr > 540) {
          width = 540 * dpr
        }
        var rem = width / 10
        docEl.style.fontSize = rem + 'px'
        flexible.rem = win.rem = rem
      }

      win.addEventListener('resize', function () {
        clearTimeout(tid)
        tid = setTimeout(refreshRem, 300)
      }, false)
      win.addEventListener('pageshow', function (e) {
        if (e.persisted) {
          clearTimeout(tid)
          tid = setTimeout(refreshRem, 300)
        }
      }, false)

      if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 * dpr + 'px'
      } else {
        doc.addEventListener('DOMContentLoaded', function (e) {
          doc.body.style.fontSize = 12 * dpr + 'px'
        }, false)
      }
      refreshRem()

      flexible.dpr = win.dpr = dpr
      flexible.refreshRem = refreshRem
      flexible.rem2px = function (d) {
        var val = parseFloat(d) * this.rem
        if (typeof d === 'string' && d.match(/rem$/)) {
          val += 'px'
        }
        return val
      }
      flexible.px2rem = function (d) {
        var val = parseFloat(d) / this.rem
        if (typeof d === 'string' && d.match(/px$/)) {
          val += 'rem'
        }
        return val
      }
    })(window, window['lib'] || (window['lib'] = {}))
    */
    (function(doc, win) {
      let docEl = doc.documentElement;
      let resizeEvt =
        "orientationchange" in window ? "orientationchange" : "resize";
      let recalc = function() {
        let clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        if (clientWidth >= 750) {
          docEl.style.fontSize = "100px";
        } else {
          docEl.style.fontSize = 100 * (clientWidth / 750) + "px";
        }
      };

      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener("DOMContentLoaded", recalc, false);
    })(document, window);
  },
  methods: {
    onSwiperLeft() {
      console.log("什么鬼");
    }
  }
};
</script>
