<template>
  <ion-page>
    <ion-header v-if="!allowsGeo" :translucent="true">
      <ion-toolbar color="danger">
        <ion-title>GPS aktivieren</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-modal :is-open="showModal"
               :backdrop-dismiss="false"
               id="no-geo-modal"
               ref="modal">
      <div class="wrapper p-4 border-white border rounded">
        <ion-item>
          <ion-icon color="danger" :icon="alertCircleOutline"></ion-icon>
          <h1>Fehlende Standortdaten</h1>
        </ion-item>
        <ion-item lines="none" class="pt-4 pb-6">
          Um unseren Service nutzen zu können benötigen wir deine Standortdaten. Bitte
          erlaube den Zugriff in den Einstellungen.
        </ion-item>
        <ion-buttons slot="end">
          <ion-button :strong="true" @click="cancel()" class="border border-white rounded text-white p-2">Ok
          </ion-button>
        </ion-buttons>
      </div>
    </ion-modal>

    <ion-content v-if="allowsGeo" :fullscreen="true">
      <gallery></gallery>
    </ion-content>
  </ion-page>
</template>

<script lang="js">
import {IonApp, IonModal, IonRouterOutlet, IonIcon, IonButton, IonContent, IonPage} from '@ionic/vue';
import {Geolocation} from "@capacitor/geolocation";
import {person, alertCircleOutline} from "ionicons/icons";
import Gallery from "@/components/Gallery.vue";

export default {
  components: {Gallery, IonApp, IonRouterOutlet, IonModal, IonIcon, IonButton, IonContent, IonPage},
  data () {
    return {
      person,
      alertCircleOutline,
      allowsGeo: true,
      showModal: false,
    };
  },
  created () {
    this.checkPermission();
  },
  methods: {
    cancel () {
      this.showModal = false
      this.$refs.modal.$el.dismiss(null, 'cancel');
    },
    confirm () {
      const name = this.$refs.input.$el.value;
      this.$refs.modal.$el.dismiss(name, 'confirm');
    },
    async checkPermission () {
      const permission = await Geolocation.checkPermissions();
      //console.log('gps user-permission', permission)
      if (permission.location !== "granted") {
        this.allowsGeo = false;
        this.showModal = true
      } else {
        this.allowsGeo = true;
        this.showModal = false
      }
    },
  },
};
</script>

<style scoped lang="scss">
ion-header {
  .logo {
    height: 100%;
  }

  .home-button {
    background-color: transparent;
  }
}

ion-modal#no-geo-modal {
  --width: 90vw;
  --max-width: 400px;
  --height: fit-content;
  --border-radius: 6px;
  --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
}

ion-modal#no-geo-modal h1 {
  margin: 20px 20px 10px 20px;
}

ion-modal#no-geo-modal ion-icon {
  margin-right: 6px;

  width: 48px;
  height: 48px;

  padding: 4px 0;

  color: #aaaaaa;
}

ion-modal#no-geo-modal .wrapper {
  margin-bottom: 10px;
}

ion-item {
  --padding-start: 0;
  --padding-end: 0;
}


ion-modal {
  --ion-background-color: rgba(0, 0, 0, 0.8); /* Change modal background color */
}

ion-modal ion-content {
  background-color: white; /* Change modal content background color */
}

ion-modal ion-header {
  background-color: #f1f1f1; /* Change modal header background color */
}

ion-modal ion-title {
  color: #333; /* Change modal title color */
  font-size: 24px; /* Change modal title font size */
}

ion-modal ion-buttons {
  justify-content: flex-end; /* Align modal buttons to the right */
}

ion-modal ion-button {
  color: #333; /* Change modal button text color */
  font-size: 16px; /* Change modal button text font size */
  --ripple-color: #333; /* Change modal button ripple color */
}
</style>
