<template>
  <div class="m-4">
    <div class="rounded-lg bg-white inline-block w-full min-w-3xl shadow-xl">
      <table class="min-w-full">
        <thead>
          <tr>
            <th class="px-4 border-b border-cool-gray-200 text-left text-xs leading-4 font-medium text-cool-gray-500 tracking-wider whitespace-no-wrap border-r border-gray-200 bg-cool-gray-50 py-3">
              name
            </th>
            <th class="px-4 border-b border-cool-gray-200 text-left text-xs leading-4 font-medium text-cool-gray-500 tracking-wider whitespace-no-wrap border-r border-gray-200 bg-cool-gray-50 py-3">
              created at
            </th>
            <th class="px-4 border-b border-cool-gray-200 text-left text-xs leading-4 font-medium text-cool-gray-500 tracking-wider whitespace-no-wrap border-r border-gray-200 bg-cool-gray-50 py-3">
              size
            </th>
            <th class="px-4 border-b border-cool-gray-200 text-left text-xs leading-4 font-medium text-cool-gray-500 tracking-wider whitespace-no-wrap bg-cool-gray-50 py-3 w-48">
              actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(snapshot, index) in snapshots" :key="index" class="border-t border-invoker-gray" :class="index % 2 ? 'bg-gray-50' : 'bg-white'">
            <td class="px-4 py-2 whitespace-no-wrap text-xs text-cool-gray-900 border-r border-gray-200">
              {{ snapshot.name }}
            </td>
            <td class="px-4 py-2 whitespace-no-wrap text-xs text-cool-gray-900 border-r border-gray-200">
              {{ snapshot.created_at }}
            </td>
            <td class="px-4 py-2 whitespace-no-wrap text-xs text-cool-gray-900 border-r border-gray-200">
              {{ snapshot.size }}
            </td>
            <td class="px-4 py-2 whitespace-no-wrap text-xs text-center text-cool-gray-900">
              <div class="flex items-center justify-center">
                <button-load :name="snapshot.name" />
                <button-delete :name="snapshot.name" @refreshSnapshots="$emit('refreshSnapshots')" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="bg-white px-4 py-3 flex items-center justify-between rounded-b-lg border-t border-cool-gray-200">
        <div class="flex-1 flex items-center justify-between">
          <p class="text-sm leading-5 text-cool-gray-700">
            Showing <span class="font-medium">{{ count }}</span> results
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ButtonLoad from '@/buttons/ButtonLoad';
import ButtonDelete from '@/buttons/ButtonDelete';

export default {
  components: {
    ButtonLoad,
    ButtonDelete
  },
  props: {
    snapshots: {
      type: Object,
      required: true
    },
    count: {
      type: Number,
      required: true
    }
  }
}
</script>
