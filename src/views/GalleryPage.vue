<template>
  <ion-page>
    <offline-gallery></offline-gallery>
  </ion-page>
</template>

<script lang="js">
import {defineComponent} from 'vue';
import {IonPage} from '@ionic/vue';
import OfflineGallery from "@/components/OfflineGallery.vue";

export default defineComponent({
  components: {OfflineGallery, IonPage},

});
</script>

<style scoped>
</style>
