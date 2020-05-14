<template>
  <div class="int js-katex-ignore pkc-name">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <h1>{{$t('pk-component.hello')}}</h1>

    <!-- <video-player src="video.mp4"></video-player> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'pkc-name',
  components: {
    HelloWorld
  }
};
</script>

<style lang="scss">

</style>

<i18n>
   {
    "hr": {
      "pkc-name": {
        "hello": "Zdravo"
      }
    },
    "en": {
      "pkc-name": {
        "hello": "Hello"
      }
    },
    "bg": {
      "pkc-name": {
        "hello": "Помогне"
      }
    }
  }
</i18n>