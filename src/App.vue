<template>
  <div class="int js-katex-ignore pkc-name">
    <int-header 
      :title="conf.title" 
      :description="conf.description"
      @toggle-header="toggleHeader" 
      @toggle-fullscreen="toggleFullscreen" 
      @toggle-help="toggleHelp" 
      @toggle-mute="toggleMute"
      >
      <template v-slot:splash>
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><path d="M80 40L62 22v11H51v14h11v11l18-18zM18 22L0 40l18 18V47h11V33H18V22z" fill="#fff"/><path d="M33 29h14V18h11L40 0 22 18h11v11zm14 22H33v11H22l18 18 18-18H47V51z" opacity=".5" fill="#fff"/></svg>
      </template>
    </int-header>

    <div class="int-body">
      <div class="int-content">
        <h1>{{$t('pkc-name.hello')}}</h1>
        <!-- <video-player src="video.mp4"></video-player> -->
      </div>
    </div>

    <int-footer 
      :is-solved="isSolved"
      :is-submitted="isSubmitted"
      :submitted-count="submittedCount"
      @reset-question="reset"
      @show-solution="showSolution"
      @submit-answer="submitAnswer"
      >
    </int-footer>
  </div>
</template>

<script>
import configLoader from '../node_modules/pk-components-common/mixins/config-loader.js';
import commonToggles from '../node_modules/pk-components-common/mixins/common-toggles.js';
import scorer from '../node_modules/pk-components-common/mixins/scorer.js';
import analytics from '../node_modules/pk-components-common/mixins/analytics.js';
import IntHeader from '../node_modules/pk-components-common/components/int-header.vue';
import IntFooter from '../node_modules/pk-components-common/components/int-footer.vue';
import messages from './messages.js';

export default {
  name: 'pkc-name',
  mixins: [configLoader, commonToggles, scorer, analytics],
  props: {
    'config': Object,
    'block-id': String
  },
  i18n: {
    messages: messages,
  },
  components: {
    'int-header': IntHeader,
    'int-footer': IntFooter
  },
  data() {
    return {
      help: {
        supported: false,
        text: 'Instructions how to use'
      },
      fullscreenSupported: false,
      fullscreenMandatory: false,
      hasSplash: true,
      conf: {
        title: '',
        description: '',
        sounds: {}
      },
      isSolved: false
    };
  },
  methods: {
    /** 
     * If component can be solved these 3 methods are mandatory with these exact names.
     * If component cannot be solved you can delete these
     * submitAnswer(),
     * reset(),
     * showSolution()
     */
    submitAnswer() {

    },
    reset() {

    },
    showSolution() {

    },

  }
};
</script>

<style lang="scss">

</style>
