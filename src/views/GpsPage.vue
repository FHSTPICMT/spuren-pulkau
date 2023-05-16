<template>
    <ion-page>
        <!--    <ion-header :translucent="true">-->
        <!--      <ion-toolbar>-->
        <!--        <ion-title>Web Applikation DER STEINBRUCH, DAS LAGER UND DIE ORTSCHAFTEN</ion-title>-->
        <!--      </ion-toolbar>-->
        <!--    </ion-header>-->

        <ion-content :fullscreen="true">
            <div class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
                 role="alert">
                <div class="flex">
                    <div class="py-1">
                        <svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 20 20">
                            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
                        </svg>
                    </div>
                    <div>
                        <p class="font-bold">Coming Soon</p>
                        <p class="text-sm">Hier wird an einer dynamischen Tour <br>durch das NS-Zwangarbeiterlager
                            gearbeitet.</p>
                    </div>
                </div>
            </div>
        </ion-content>
        <ion-modal :is-open="showModal"
                   :backdrop-dismiss="false"
                   id="no-geo-modal"
                   ref="modal"
                   trigger="open-custom-dialog">
            <div class="wrapper p-4">
                <ion-item>
                    <ion-icon color="danger" :icon="alertCircleOutline"></ion-icon>
                    <h1>Fehlende Standortdaten</h1>
                </ion-item>
                <ion-item lines="none" class="pt-4">
                    Um unseren Service nutzen zu können benötigen wir deine Standortdaten. Bitte
                    erlaube den Zugriff in den Einstellungen.
                </ion-item>
                <ion-buttons slot="end">
                    <ion-button :strong="true" @click="cancel()">Ok</ion-button>
                </ion-buttons>
            </div>
        </ion-modal>
    </ion-page>
</template>

<script lang="js">
import {IonApp, IonModal, IonRouterOutlet, IonIcon, IonButton, IonContent, IonPage} from '@ionic/vue';
import {Geolocation} from "@capacitor/geolocation";
import {person, alertCircleOutline} from "ionicons/icons";

export default {
    components: {IonApp, IonRouterOutlet, IonModal, IonIcon, IonButton, IonContent, IonPage},
    data() {
        return {
            myTest: false,
            allowsGeo: true,
            geoWatcher: null,
            locationHasBeenLoaded: false,
            scan: false,
            person,
            alertCircleOutline,
            showModal: false
        };
    },
    created() {
        if (!this.geoWatcher) {
            this.initGeolocationWatcher();
            this.locationHasBeenLoaded = true
            console.log('Geolocation has been loaded');
        }
    },
    computed: {},
    watch: {
        // TODO - watch user location
    },
    methods: {
        cancel() {
            this.showModal = false
            this.$refs.modal.$el.dismiss(null, 'cancel');
        },
        confirm() {
            const name = this.$refs.input.$el.value;
            this.$refs.modal.$el.dismiss(name, 'confirm');
        },
        async initGeolocationWatcher() {
            const permission = await Geolocation.checkPermissions();
            console.log('gps user-permission', permission)
            if (permission.location !== "granted") {
                this.allowsGeo = false;
                this.showModal = true
            }

            const options = {
                enableHighAccuracy: true,
                maximumAge: 10000,
                timeout: 27000,
            };

            this.geoWatcher = await Geolocation.watchPosition(
                options,
                (position, error) => {
                    this.allowsGeo = true;
                    if (error) {
                        console.log('location error', error)
                    }
                    if (position) {
                        console.log('user location', position)
                    }
                }
            );
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
</style>
