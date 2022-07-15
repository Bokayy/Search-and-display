[<template>
  <div class="int js-katex-ignore pkc-search-and-display" :class="elClass">
    <int-header 
      :title="conf.title" 
      :description="conf.description"
      @toggle-fullscreen="toggleFullscreen" 
      >
      <template v-slot:splash>
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><path d="M80 40L62 22v11H51v14h11v11l18-18zM18 22L0 40l18 18V47h11V33H18V22z" fill="#fff"/><path d="M33 29h14V18h11L40 0 22 18h11v11zm14 22H33v11H22l18 18 18-18H47V51z" opacity=".5" fill="#fff"/></svg>
      </template>
    </int-header>

    <div class="int-body">
      <div class="int-content">
        <div class="pkc-search-and-display__input-wrapper">
          <input class="pkc-search-and-display__input" type="text" placeholder="Search for city or state" v-model="inputText" @keydown.enter="search()">
        </div>

        <div class="pkc-search-and-display__labels-wrapper">
          <div>Cities found: {{ this.cityText }}</div>
          <div>States found: {{ this.stateText }}</div>
        </div>

        <div class="pkc-search-and-display__results-wrapper">
          <table class="pkc-search-and-display__table">
            <th>
              <td>#</td>
              <td>City</td>
              <td>State</td>
              <td>Population</td>
            </th>
              <tr>
                <tr v-for="(item) in RenderTable.cities" v-bind:key="item" class="pkc-search-and-display">
                  {{ item }}
                </tr>
                <!-- <tr>1</tr> -->
              </tr>
          </table>
        </div>
        
      </div>
    </div>

  </div>
</template>

<script>
import configLoader from '../node_modules/pkc-common/mixins/config-loader.js';
import commonToggles from '../node_modules/pkc-common/mixins/common-toggles.js';
import IntHeader from '../node_modules/pkc-common/components/int-header.vue';

import cities from './data.js';

export default {
  name: 'pkc-search-and-display',
  mixins: [configLoader, commonToggles],
  props: {
    'config': Object,
    'block-id': String
  },
  components: {
    'int-header': IntHeader
  },
  data() {
    return {
      help: {
        supported: false,
        text: 'Instructions how to use'
      },
      fullscreenSupported: true,
      fullscreenMandatory: false,
      hasSplash: false,
      conf: {
        title: '',
        description: '',
        sounds: {}
      },
      isSolved: false,
      //my variables,
      cityText: 'Texas',
      stateText: 'Dallas',
      RenderTable: {
        number: [

        ],
        cities: [

        ],
        states: [

        ],
        population: [

        ]
      },
      inputText: '',
    };
  },
  methods: {
    search: function() {
      //console.log(this.inputTextFetch);
      console.log(cities[0].city);
      this.RenderTable.cities[0] = cities.filter(data => data.city===this.inputTextFetch);
      console.log(this.RenderTable);
      console.log(this.RenderTable.cities[0]);
    }
  },
  created() {
    console.log('cities', cities);
  },
  computed: {
    inputTextFetch: function() {
      return this.inputText;
    },
    elClass() {
      return {
        ...this.commonElClass
      };
    },
  }
};
</script>

<style lang="scss">
@import "../node_modules/pkc-common/styles/_variables.scss";

.pkc-search-and-display {

  .pkc-search-and-display__input-wrapper {

      display: flex;
      align-items: center;
      justify-content: center;

    .pkc-search-and-display__input {
      margin: 0;
      text-align: center;
      outline: 0;
      border: 10px solid #F7F7F7;
      width: 80%;
      border-radius: 5px;
      font-size: 4rem;
      box-shadow: 0 0 5px rgb(0 0 0 / 12%), inset 0 0 2px rgb(0 0 0 / 19%);
    }

  }

  .pkc-search-and-display__labels-wrapper {
    display: flex;
    justify-content: space-around;
    margin: 30px 0;
  }

  .pkc-search-and-display__table {
    width: 100%;
    border: 1px solid $border-gray;

      th {
        border-bottom: 1px solid $border-gray;
      }

      th, tr {
        display: flex;

        td {
          padding-left: 10px;
        }

        td:nth-child(1) {
          flex-basis: 6%;
        }

        td:nth-child(2) {
          flex-basis: 36%;
        }

        td:nth-child(3) {
          flex-basis: 36%;
        }

        td:nth-child(4) {
          flex-basis: 22%;
          text-align: right;
          padding-right: 10px;
        }

        td:not(:last-child) {
          border-right: 1px solid $border-gray;
        }

    }

  }


}
</style>
]