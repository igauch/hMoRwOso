<template>
  <div class="main">
    <top-bar></top-bar>

  </div>
</template>

<script>
  import topBar from '@/components/topBar'
  import overView from '@/components/overView'
  export default {
    name: 'main',
    components: {
      topBar,
      overView
    }
  }
</script>
