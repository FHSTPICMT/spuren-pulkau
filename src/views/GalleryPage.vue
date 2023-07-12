<template>
  <ion-page>
    <ion-grid class="vertical-center w-full p-0">
      <ion-row class="ion-align-items-center">
        <ion-col class="p-0">
          <div>
            <ion-img
              :src="currentImage"
              alt="Welcome"
            ></ion-img>
            <audio ref="audioPlayer" :src="currentAudio" @timeupdate="onTimeUpdate"></audio>
            <progress class="w-full" :max="audioDuration" :value="currentTime"></progress>
          </div>
          <div class="flex justify-around text-center">
            <ion-button @click="previousAudio">
              <ion-icon slot="start" :icon="playSkipBackOutline()"></ion-icon>
            </ion-button>
            <ion-button @click="toggleAudio">
              <ion-icon v-if="!shouldPlayAudio" slot="start" :icon="playOutline()"></ion-icon>
              <ion-icon v-else slot="start" :icon="pauseOutline()"></ion-icon>
            </ion-button>
            <ion-button @click="nextAudio">
              <ion-icon slot="start" :icon="playSkipForwardOutline()"></ion-icon>
            </ion-button>
          </div>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-page>
</template>

<script lang="js">
import {defineComponent} from 'vue';
import {
  IonContent,
  IonPage,
  IonApp,
  IonRouterOutlet,
  IonModal, IonIcon, IonButton
} from '@ionic/vue';
import {IonRippleEffect} from '@ionic/vue';
import {playOutline, playSkipBackOutline, playSkipForwardOutline, pauseOutline} from 'ionicons/icons';
import {TRACKS_NO_GPS} from '@/utils/constants.js';


export default defineComponent({
  components: {
    IonApp,
    IonRouterOutlet,
    IonModal,
    IonIcon,
    IonButton,
    IonContent,
    IonPage,
    IonRippleEffect,
    TRACKS_NO_GPS
  },
  mounted () {
    this.$refs.audioPlayer.addEventListener('loadedmetadata', () => {
      this.audioDuration = this.$refs.audioPlayer.duration;
    });
  },
  data () {
    return {
      initPlay: true,
      imageSource: 'src/assets/img/00_Welcome.jpg',
      audioSource: 'src/assets/audio/00_Welcome.mp3',
      currentTrackIndex: 0,
      shouldPlayAudio: false,
      audioDuration: 0,
      currentTime: 0
    };
  },
  computed: {
    currentAudio() {
      return TRACKS_NO_GPS[this.currentTrackIndex].audio
    },
    currentImage() {
      return TRACKS_NO_GPS[this.currentTrackIndex].image
    }
  },
  methods: {
    pauseOutline () {
      return pauseOutline
    },
    toggleAudio () {
      this.initPlay = false
      this.shouldPlayAudio = !this.shouldPlayAudio
      if (this.shouldPlayAudio) {
        this.playAudio()
      } else {
        this.pauseAudio()
      }
    },
    playAudio () {
      this.$refs.audioPlayer.play();
    },
    pauseAudio () {
      this.$refs.audioPlayer.pause();
    },
    previousAudio () {
      this.pauseAudio()
      this.shouldPlayAudio = false;
      this.currentTrackIndex--
    },
    nextAudio () {
      this.pauseAudio()
      this.shouldPlayAudio = false;
      this.currentTrackIndex++
    },
    onTimeUpdate () {
      this.currentTime = this.$refs.audioPlayer.currentTime;
    },
    playSkipForwardOutline () {
      return playSkipForwardOutline
    },
    playSkipBackOutline () {
      return playSkipBackOutline
    },
    playOutline () {
      return playOutline
    }
  },
});
</script>

<style scoped>
.vertical-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
