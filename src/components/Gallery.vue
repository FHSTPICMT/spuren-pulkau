<template>
    <ion-grid class="vertical-center w-full p-0">
      <ion-row class="ion-align-items-center">
        <ion-col class="p-0">
          <div>
            <ion-img
              :style="currentImageStyle"
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
import {TRACKS} from '@/utils/constants.js';
import {Geolocation} from "@capacitor/geolocation";


export default defineComponent({
  name: 'gallery',
  components: {
    IonApp,
    IonRouterOutlet,
    IonModal,
    IonIcon,
    IonButton,
    IonContent,
    IonPage,
    IonRippleEffect,
    TRACKS
  },
  data () {
    return {
      geoWatcher: null,
      initPlay: true,
      imageSource: 'src/assets/img/00_Welcome.jpg',
      audioSource: 'src/assets/audio/00_Welcome.mp3',
      currentTrackIndex: 0,
      shouldPlayAudio: false,
      audioDuration: 0,
      currentTime: 0,
      currentImageStyle: {},
      radiusInMeters: 10,
      tracks: [],
      newTrack: false
    };
  },
  created () {
    // Create a variable array out of the constants, to remember visits
    this.tracks = [...TRACKS];

    window.addEventListener("orientationchange", this.handleOrientationChange);
    this.handleOrientationChange()
  },
  mounted () {
    this.$refs.audioPlayer.addEventListener('loadedmetadata', () => {
      this.audioDuration = this.$refs.audioPlayer.duration;
    });

    if (!this.geoWatcher) {
      this.watchGeolocation();
    }
  },
  watch: {
    currentTrackIndex(value) {
      // Play audio automatically
    }
  },
  computed: {
    currentAudio() {
      return this.tracks[this.currentTrackIndex].audio
    },
    currentImage() {
      return this.tracks[this.currentTrackIndex].image
    },
    alreadyVisited() {
      return this.tracks[this.currentTrackIndex].visited
    },
  },
  methods: {
    async watchGeolocation() {
      const options = {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 27000,
      };

      this.geoWatcher = Geolocation.watchPosition(options, (position, error) => {
        if (error) {
          console.error('Error getting geolocation:', error);
        } else {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log('User position:', latitude, longitude);

          for (let i = 0; i < this.tracks.length; i++) {
            let item = this.tracks[i]
            if(item.hasOwnProperty('coords')) {
              if(item.visited) {
                //console.log('Has been visited already')
              }
              if (this.currentTrackIndex !== i && this.isWithinRadius(latitude, longitude, item.coords.latitude, item.coords.longitude, this.radiusInMeters)) {
                console.log('You are here: ',item.image.split('/').pop(), '(' + item.coords.latitude + ',' + item.coords.longitude + ')');
                this.currentTrackIndex = i
                item.visited = true
                if (this.$refs.audioPlayer && this.$refs.audioPlayer.readyState === 4) {
                  // TODO automatically play audio
                  this.$refs.audioPlayer.volume = 1;
                  this.$refs.audioPlayer.play();
                }
                break
              }
            }
          }
        }
      });
    },
    isWithinRadius(userLatitude, userLongitude, targetLatitude, targetLongitude, radiusInMeters) {
      const distance = this.calculateDistance(userLatitude, userLongitude, targetLatitude, targetLongitude);

      return distance <= radiusInMeters;
    },
    calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371e3; // Earth's radius in meters
      const phi1 = this.toRadians(lat1);
      const phi2 = this.toRadians(lat2);
      const diffPhi = this.toRadians(lat2 - lat1);
      const diffLambda = this.toRadians(lon2 - lon1);
      const a = Math.sin(diffPhi / 2) * Math.sin(diffPhi / 2) +
        Math.cos(phi1) * Math.cos(phi2) *
        Math.sin(diffLambda / 2) * Math.sin(diffLambda / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return R * c;
    },
    toRadians(degrees) {
      return degrees * (Math.PI / 180);
    },
    pauseOutline () {
      return pauseOutline
    },
    toggleAudio () {
      this.initPlay = false
      this.shouldPlayAudio = !this.shouldPlayAudio
      console.log('shouldPlay', this.shouldPlayAudio)
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
    },
    handleOrientationChange () {
      //console.log('orientation change detected (width, height):', window.innerWidth, window.innerHeight)
      if (window.innerWidth > window.innerHeight) {
        // Landscape mode
        this.currentImageStyle = {
          width: "auto",
          height: "300px",
        };
      } else {
        // Portrait mode
        this.currentImageStyle = {
          width: "100%",
          height: '100%',
        };
      }
    },
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
