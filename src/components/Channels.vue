<template>
  <div class="channels">
    <div class="title-bar">
      <h4>{{ userState.name }}</h4>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component
export default class Channels extends Vue {
  @State('user') private userState: {}
}
</script>

<style lang="scss">
.channels {
  background: #2f3135;
  flex: 0 0 240px;
  height: 100%;

  > .title-bar {
    height: 48px;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2), 0 2px 0 rgba(0, 0, 0, 0.06);

    > h4 {
      color: #fff;
    }
  }
}
</style>
