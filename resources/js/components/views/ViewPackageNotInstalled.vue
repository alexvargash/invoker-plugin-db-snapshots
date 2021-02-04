<template>
  <main class="flex flex-col flex-1 h-screen relative z-0 overflow-y-auto">
    <the-title-bar>
      <template v-slot:title>
        Snapshots
      </template>
      <template v-slot:actions>
        <button-reload @reload="$emit('reload')" />
      </template>
    </the-title-bar>

    <state-package-not-installed />
  </main>
</template>

<script lang="ts">
import TheTitleBar from '@/sections/TheTitleBar';
import ButtonReload from '@/buttons/ButtonReload';
import StatePackageNotInstalled from '@/states/StatePackageNotInstalled';

export default {
  components: {
    TheTitleBar,
    ButtonReload,
    StatePackageNotInstalled
  }
}
</script>
