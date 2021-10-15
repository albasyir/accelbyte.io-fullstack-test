<template>
  <div>
    Layout
    <router-view />
  </div>
</template>

<script>
export default {
  serverPrefetch() {
    console.log("On Server");
    return Promise.resolve();
  },
};
</script>
