<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <ion-row>
          <ion-text color="white" size="--ion-font-size" class="ion-margin-end">
            <h1>Web Applikation DER STEINBRUCH, <br>DAS LAGER UND DIE ORTSCHAFTEN</h1>
          </ion-text>
        </ion-row>
        <ion-row class="mt-6">
          <ion-list lines="none bg-black">
            <ul class="navigation-list">
              <li @click="redirect('/gps')">
                <ion-icon color="white" :icon="globe()" class="mr-2 font-bold"></ion-icon>
                <strong>
                  Mit GPS Empfang
                </strong>
              </li>
              <li @click="redirect('/gallery')">
                <ion-icon color="white" :icon="image()" class="mr-2 font-bold"></ion-icon>
                <strong>Ersatzmodus ohne GPS Empfang</strong>
              </li>
              <li @click="redirect('/info')">
                <ion-icon color="white" :icon="documentText()" class="mr-2 font-bold"></ion-icon>
                <strong>Projektbeschreibung und Quellen</strong>
              </li>
            </ul>
          </ion-list>
        </ion-row>

      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="js">
import {IonNav, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/vue';
import GalleryPage from './GalleryPage.vue';
import {documentText, globe, image} from "ionicons/icons";

export default {
  methods: {
    globe() {
      return globe
    },
    image() {
      return image
    },
    documentText() {
      return documentText
    },
    redirect(path) {
      this.$router.push(path);
    }
  },
  components: {IonNav, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, documentText, globe, image},
  data() {
    return {
      component: GalleryPage,
    };
  },
};
</script>

<style scoped>
li {
  cursor: pointer;
}
#container {
  padding: 1em;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}

.navigation-list {
  list-style: none;
  padding: 0;
}
</style>
