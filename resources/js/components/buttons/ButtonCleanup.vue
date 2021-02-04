<template>
  <button
    @click.prevent="showCleanupConfirmation"
    type="button"
    class="mr-2 relative inline-flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm leading-4 font-medium text-gray-700 disabled:text-gray-500 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
  >
    Cleanup
  </button>
</template>

<script lang="ts">
export default {
  methods: {
    showCleanupConfirmation() {
      invoker.showConfirmation({
        title: 'Cleanup Snapshots',
        text: 'Are you sure you want to delete ALL Snapshots? This action can\'t be undone.',
        onConfirm: () => this.cleanupSnapshots(),
        confirmButtonClass: 'text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150',
        confirmButtonText: 'Cleanup',
        cancelButtonText: 'Cancel',
      });
    },
    async cleanupSnapshots() {
      try {
        const { data } = await invoker.evaluate(`
          $snapshots = app(Spatie\\DbSnapshots\\SnapshotRepository::class)->getAll();

          if ($snapshots->isEmpty()) {
            return false;
          }

          $snapshots->each(function ($snapshot) {
            $snapshot->delete();
          });

          return true;
        `);
        if (data.output) {
          this.$emit('refreshSnapshots');
          invoker.showNotification({
            title: 'Cleanup',
            text: 'All snapshots have been deleted',
            type: 'success',
          });
        } else {
          invoker.showNotification({
            title: 'No snapshots found',
            text: 'Click on the \'Create\' button to create a snapshot',
            type: 'error',
          });
        }
      } catch (err) {
        invoker.showNotification({
          title: 'Error',
          text: 'Could not delete the snapshots',
          type: 'error',
        });
      }
    },
  }
}
</script>
