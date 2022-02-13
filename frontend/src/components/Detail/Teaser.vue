<template>
  <div
    v-if="teaserVideo"
    id="container"
    class="m-0 p-0">
    <iframe
      id="player"
      type="text/html"
      :src="`http://www.youtube.com/embed/${this.teaserVideo.id.videoId}`"
      frameborder="0">
    </iframe>
  </div>
</template>

<script>
export default {
  name: 'Teaser',
  props:{
    teaserVideo:{
      type: Object,
      required: false,
    }
  },
}
</script>

<style scoped>
#container{
  padding-top: 56.25%;
}
iframe {
  /* border: none;
  border-radius: 1rem;
  margin: 0.5rem; */
   top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height:100%
}
</style>