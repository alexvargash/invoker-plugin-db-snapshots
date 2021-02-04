<template>
  <div v-if="!isLoading" class="flex flex-col flex-1 overflow-hidden bg-invoker-gray">
    <template v-if="isDbSnapshotsPackageInstalled">
      <view-snapshots />
    </template>
    <template v-else>
      <view-package-not-installed @reload="checkDbSnapshotIntallation" />
    </template>
  </div>
</template>

<script lang="ts">
import ViewSnapshots from './views/ViewSnapshots';
import ViewPackageNotInstalled from './views/ViewPackageNotInstalled';

export default {
  components: {
    ViewSnapshots,
    ViewPackageNotInstalled
  },
  data() {
    return {
      isLoading: true,
      isDbSnapshotsPackageInstalled: false,
    }
  },
  mounted() {
    this.checkDbSnapshotIntallation();
  },
  methods: {
    async checkDbSnapshotIntallation() {
      try {
        const { data } = await invoker.evaluate(`
          return app()->getProvider(Spatie\\DbSnapshots\\DbSnapshotsServiceProvider::class) ? true : false;
        `);
        this.isDbSnapshotsPackageInstalled = data.output;
        this.isLoading = false;
      } catch (err) {
        invoker.showNotification({
          title: 'Error',
          text: 'There was an error while loading the plugin',
          type: 'error',
        });
      }
    }
  }
}
</script>
