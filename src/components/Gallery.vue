<template>
    <ion-grid class="vertical-center w-full p-0">
      <ion-row class="ion-align-items-center">
        <ion-col class="p-0">
          <div>
            <img :src="currentImage" alt="Welcome">
            <audio ref="audioPlayer" :src="currentAudio" @timeupdate="onTimeUpdate" @ended="playNextTrack"></audio>
            <progress class="w-full custom-progress" :max="audioDuration" :value="currentTime" @click="seekAudio"></progress>
            <ion-button v-show="!started" @click="startTour" class="action-btn" fill="clear">
              <ion-icon slot="start" :icon="play()" style="color:#505050; font-size: 45px;"></ion-icon>
            </ion-button>
          </div>
          <div :class="{ 'overlay': !started }"></div>
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
import {play, pause} from 'ionicons/icons';
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
      started: false,
      firstVisit: true,
      initImageSource: 'src/assets/img/00_Welcome.jpg',
      initAudioSource: 'src/assets/audio/00_Welcome.mp3',
      currentTrackIndex: 0,
      shouldPlayAudio: false,
      audioDuration: 0,
      currentTime: 0,
      radiusInMeters: 10,
      tracks: [],
      newTrack: false,
      latitude: null,
      longitude: null
    };
  },
  created () {
    // Create a variable array out of the constants, to remember visits
    this.tracks = [...TRACKS];
  },
  mounted () {
    this.$refs.audioPlayer.addEventListener('loadedmetadata', () => {
      this.audioDuration = this.$refs.audioPlayer.duration;
    });

    if (!this.geoWatcher) {
      this.watchGeolocation();
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
    playNextTrack() {
      this.setTrackByPosition()
    },
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
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;

          if(!this.firstVisit) {
            this.setTrackByPosition()
          }
        }
      });
    },
    setTrackByPosition() {
      if(this.latitude && this.longitude) {
        for (let i = 0; i < this.tracks.length; i++) {
          let item = this.tracks[i]

          if (item.hasOwnProperty('coords')) {
            if (this.currentTrackIndex !== i && this.isWithinRadius(this.latitude, this.longitude, item.coords.latitude, item.coords.longitude, this.radiusInMeters)) {
              console.log((this.tracks[i].visited ? '[GEHÖRT] ' : '') + this.removeExtension(item.image.split('/').pop()), '(' + item.coords.latitude + ',' + item.coords.longitude + ')');
              if (this.tracks[i].visited === true) {
                this.$refs.audioPlayer.pause()
                break
              }
              this.currentTrackIndex = i
              this.tracks[i].visited = true
              this.playAudio();
              break
            }
          }
        }
      } else {
        // When no coordinates, set next track
        this.currentTrackIndex++;
      }
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
    startTour () {
      this.currentAudio = this.initAudioSource
      this.currentImage = this.initImageSource
      this.playAudio()
      this.started = true;
    },
    playAudio () {
      if (this.$refs.audioPlayer && this.$refs.audioPlayer.src) {
        const canAutoplay = this.$refs.audioPlayer.autoplay !== undefined;

        if (canAutoplay) {
          this.$refs.audioPlayer.play();
          if(this.firstVisit) {
            // Initialize autoplay function
            this.$refs.audioPlayer.addEventListener('loadedmetadata', () => {
              this.$refs.audioPlayer.play();
            });
            this.firstVisit = false
          }
        } else {
          // Autoplay is not supported, start playback on user interaction
          this.$refs.audioPlayer.addEventListener('loadedmetadata', () => {
            this.$refs.audioPlayer.play();
          });
        }
      }
    },
    seekAudio(event) {
      const progressBar = event.target;
      const clickX = event.clientX; // Get the horizontal position of the click event
      const progressBarRect = progressBar.getBoundingClientRect();
      const progressBarWidth = progressBarRect.width;

      // Calculate the new time position based on the click position
      const newTime = (clickX - progressBarRect.left) / progressBarWidth * this.audioDuration;

      // Set the audio player's currentTime to the new time
      this.$refs.audioPlayer.currentTime = newTime;
    },
    onTimeUpdate () {
      this.currentTime = this.$refs.audioPlayer.currentTime;
    },
    play () {
      return play
    },
    pause () {
      return pause
    },
    removeExtension(filename) {
      if (filename.endsWith(".jpg")) {
        return filename.slice(0, -4); // Remove the last 4 characters (".jpg")
      } else if (filename.endsWith(".png")) {
        return filename.slice(0, -4); // Remove the last 4 characters (".png")
      } else {
        return filename; // If the string doesn't end with ".jpg" or ".png", return it as is
      }
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
.action-btn {
  position: absolute;
  transform: translate(-50%,-50%);
  margin-right: -50%;
  top: 46%;
  left: 52%;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  pointer-events: none;
}
@media only screen and (orientation: landscape) and (max-height: 500px){
  img {
    object-fit: cover;
    max-height: 300px;
  }
}
@media only screen and (orientation: landscape) and (min-height: 501px) and (max-height: 600px){
  img {
    object-fit: cover;
    max-height: 400px;
  }
}
@media only screen and (orientation: landscape) and (min-height: 601px) and (max-height: 700px){
  img {
    object-fit: cover;
    max-height: 500px;
  }
}
@media only screen and (orientation: landscape) and (min-height: 701px) and (max-height: 800px){
  img {
    object-fit: cover;
    max-height: 700px;
  }
}
@media only screen and (orientation: landscape) and (min-height: 801px) and (max-height: 1000px){
  img {
    object-fit: cover;
    max-height: 800px;
  }
}
@media only screen and (orientation: landscape) and (min-height: 1001px) and (max-height: 1200px){
  img {
    object-fit: cover;
    max-height: 800px;
  }
}
@media only screen and (orientation: landscape) and (min-height: 1201px) and (max-height: 1400px){
  img {
    object-fit: cover;
    max-height: 1200px;
  }
}
@media only screen and (orientation: landscape) and (min-height: 1401px){
  img {
    object-fit: cover;
    max-height: 100%;
  }
}



@media only screen and (orientation: portrait) and (max-height: 1000px){
  img {
    object-fit: cover;
    max-height: 700px;
  }
}
@media only screen and (orientation: portrait) and (min-height: 1001px) and (max-height: 1200px){
  img {
    object-fit: cover;
    max-height: 1000px;
  }
}
@media only screen and (orientation: portrait) and (min-height: 1201px) and (max-height: 1400px){
  img {
    object-fit: cover;
    max-height: 1200px;
  }
}
@media only screen and (orientation: portrait) and (min-height: 1401px){
  img {
    object-fit: cover;
    max-height: 100%;
  }
}
</style>
