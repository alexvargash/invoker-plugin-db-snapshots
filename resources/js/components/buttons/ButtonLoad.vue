<template>
  <button
    @click.prevent="showLoadConfirmation(name)"
    type="button"
    class="text-xs px-3 py-1 border border-gray-300 rounded transition ease-in-out duration-150 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 mr-4"
  >
    Load
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
    showLoadConfirmation (name) {
      invoker.showConfirmation({
        title: 'Load Snapshot',
        text: 'Are you sure you want to load: ' + name + '?',
        onConfirm: () => this.loadSnapshot(name),
        confirmButtonText: 'Load',
        cancelButtonText: 'Cancel',
      });
    },
    async loadSnapshot (name) {
      try {
        const { data } = await invoker.evaluate(`
          $snapshot = app(Spatie\\DbSnapshots\\SnapshotRepository::class)->findByName('${name}');

          if (! $snapshot) {
            return false;
          }
          $connectionName = config('db-snapshots.default_connection') ?? config('database.default');
          $snapshot->load($connectionName);

          return true;
        `);

        if (data.output) {
          invoker.showNotification({
            title: 'Snapshot Loaded',
            text: 'Snapshot ' + name + ' loaded',
            type: 'success',
          });
        }
      } catch (err) {
        invoker.showNotification({
          title: 'Error Loading Snapshot',
          text: 'Could not load the snapshot',
          type: 'error',
        });
      }
    }
  }
}
</script>
