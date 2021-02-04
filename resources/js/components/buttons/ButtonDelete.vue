<template>
  <button
    @click.prevent="showDeleteConfirmation(name)"
    type="button"
    class="text-xs px-3 py-1 border border-gray-300 rounded transition ease-in-out duration-150 hover:text-red-500 hover:border-red-400 focus:z-10 focus:text-red-500 focus:outline-none focus:border-red-300 focus:shadow-outline-red active:bg-gray-100 active:text-red-500"
  >
    Delete
  </button>
</template>

<script lang="ts">
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  methods: {
    showDeleteConfirmation (name) {
      invoker.showConfirmation({
        title: 'Delete Snapshot',
        text: 'Are you sure you want to delete: ' + name + '? This action can\'t be undone.',
        onConfirm: () => this.deleteSnapshot(name),
        confirmButtonClass: 'text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150',
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
      });
    },
    async deleteSnapshot (name) {
      try {
        const { data } = await invoker.evaluate(`
          $snapshot = app(Spatie\\DbSnapshots\\SnapshotRepository::class)->findByName('${name}');

          if (! $snapshot) {
            return false;
          }
          $snapshot->delete();

          return true;
        `);

        if (data.output) {
          this.$emit('refreshSnapshots');
          invoker.showNotification({
            title: 'Snapshot deleted',
            text: 'Snapshot ' + name + ' deleted!',
            type: 'success',
          });
        }
      } catch (err) {
        invoker.showNotification({
          title: 'Error',
          text: 'Could not delete the snapshot',
          type: 'error',
        });
      }
    }
  }
}
</script>
