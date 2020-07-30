<template>
  <a target="_blank" rel="noreferrer" :href="href" v-text="href" />
</template>

<script>
  export default {
    name: 'SafeA',
    props: {
      href: String
    }
  };
</script>
