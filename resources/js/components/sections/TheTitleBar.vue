<template>
  <div class="px-4 py-6 pb-2">
    <div class="sm:flex sm:items-center sm:justify-between">
      <div class="flex flex-1 min-w-0 group">
        <div>
          <h2 class="leading-7 text-cool-gray-700 text-xl font-semibold">
            <slot name="title"></slot>
          </h2>
          <slot name="subtitle"></slot>
        </div>
      </div>

      <div class="flex-shrink-0 flex pt-4 sm:pt-0">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>

</template>
<script lang="ts">
export default {
}
</script>
