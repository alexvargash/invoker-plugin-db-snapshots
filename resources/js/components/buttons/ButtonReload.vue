<template>
  <button
    @click.prevent="$emit('reload')"
    type="button"
    class="relative inline-flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm leading-4 font-medium text-gray-700 disabled:text-gray-500 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
  >
    Reload
  </button>
</template>

<script lang="ts">
export default {
}
</script>
