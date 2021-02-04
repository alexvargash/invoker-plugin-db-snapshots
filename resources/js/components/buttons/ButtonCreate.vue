<template>
  <button
    @click.prevent="createSnapshot"
    type="button"
    class="relative inline-flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm leading-4 font-medium text-gray-700 disabled:text-gray-500 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
  >
    Create
  </button>
</template>

<script lang="ts">
export default {
  methods: {
    async createSnapshot () {
      try {
        const { data } = await invoker.evaluate(`
          $connectionName = config('db-snapshots.default_connection') ?? config('database.default');

          $snapshotName = Carbon\\Carbon::now()->format('Y-m-d_H-i-s');
          $compress = false;

          $snapshot = app(Spatie\\DbSnapshots\\SnapshotFactory::class)->create(
              $snapshotName,
              config('db-snapshots.disk'),
              $connectionName,
              $compress
          );

          $size = Spatie\\DbSnapshots\\Helpers\\Format::humanReadableSize($snapshot->size());
          return [
            'snapshot_name' => $snapshotName,
            'size' => $size,
          ];
        `);

        this.$emit('refreshSnapshots');
        invoker.showNotification({
          title: 'Snapshot created',
          text: 'Snapshot ' + data.output.snapshot_name + ' created (size: ' + data.output.size + ')',
          type: 'success',
        });
      } catch (err) {
        invoker.showNotification({
          title: 'Error',
          text: 'Could not create a new Snapshot',
          type: 'error',
        });
      }
    }
  }
}
</script>
