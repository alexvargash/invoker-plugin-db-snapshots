<template>
  <main class="flex flex-col flex-1 h-screen relative z-0 overflow-y-auto">
    <the-title-bar>
      <template v-slot:title>
        Snapshots
      </template>

      <template v-slot:subtitle>
        <div v-if="connection" class="text-gray-500 text-xs">
          <span class="mr-3">connection: {{ connection.name }}</span>
          <span class="mr-3">disk: {{ connection.disk }}</span>
          <span>driver: {{ connection.driver }}</span>
        </div>
      </template>

      <template v-slot:actions>
        <button-cleanup @refreshSnapshots="refreshSnapshots" />
        <button-refresh @refreshSnapshots="refreshSnapshots" />
        <button-create @refreshSnapshots="refreshSnapshots" />
      </template>
    </the-title-bar>

    <template v-if="snapshots">
      <table-snapshots
        :snapshots="snapshots"
        :count="count"
        @refreshSnapshots="refreshSnapshots"
      />
    </template>

    <template v-else>
      <state-empty-snapshots />
    </template>
  </main>
</template>

<script lang="ts">
import TheTitleBar from '@/sections/TheTitleBar';
import ButtonCreate from '@/buttons/ButtonCreate';
import ButtonRefresh from '@/buttons/ButtonRefresh';
import ButtonCleanup from '@/buttons/ButtonCleanup';
import TableSnapshots from '@/tables/TableSnapshots';
import StateEmptySnapshots from '@/states/StateEmptySnapshots';

export default {
  components: {
    TheTitleBar,
    ButtonCreate,
    ButtonRefresh,
    ButtonCleanup,
    TableSnapshots,
    StateEmptySnapshots
  },
  data() {
    return {
      count: 0,
      connection: null,
      snapshots: null,
    }
  },
  mounted() {
    this.refreshSnapshots();
  },
  methods: {
    async refreshSnapshots() {
      try {
        const { data } = await invoker.evaluate(`
          $snapshots = app(Spatie\\DbSnapshots\\SnapshotRepository::class)->getAll();
          $diskName = config('db-snapshots.disk');
          $connectionName = config('db-snapshots.default_connection') ?? config('database.default');
          $driver = config('filesystems.disks.' . $diskName . '.driver');

          if ($snapshots->isEmpty()) {
            return [
              'snapshots' => null,
              'count' => 0,
              'connection' => [
                'name' => $connectionName,
                'disk' => $diskName,
                'driver' => $driver,
              ],
            ];
          }

          $count = $snapshots->count();
          $snapshots = $snapshots->map(function ($snapshot) {
              return [
                  'name' => $snapshot->name,
                  'created_at' => $snapshot->createdAt()->format('Y-m-d H:i:s'),
                  'compressed' => $snapshot->compressionExtension ? true : false,
                  'size' => Spatie\\DbSnapshots\\Helpers\\Format::humanReadableSize($snapshot->size()),
              ];
          })->sortByDesc('created_at')->values()->all();

          return [
            'snapshots' => $snapshots,
            'count' => $count,
            'connection' => [
              'name' => $connectionName,
              'disk' => $diskName,
              'driver' => $driver,
            ],
          ];
        `);

        this.snapshots = data.output.snapshots;
        this.count = data.output.count;
        this.connection = data.output.connection;
      } catch (err) {
        invoker.showNotification({
          title: 'Error',
          text: 'There was an error loading the Snapshots',
          type: 'error',
        });
      }
    }
  }
}
</script>
