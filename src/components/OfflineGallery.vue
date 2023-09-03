<template>
  <ion-grid class="vertical-center w-full p-0" :fullscreen="true">
    <ion-row class="ion-align-items-center">
      <ion-col class="p-0">
          <div>
            <img :src="currentImage" alt="Welcome">
            <audio ref="audioPlayer" :src="currentAudio" @timeupdate="onTimeUpdate"></audio>
            <progress class="w-full custom-progress" :max="audioDuration" :value="currentTime" @click="seekAudio"></progress>
          </div>
          <div class="flex justify-around text-center">
            <ion-button @click="previousAudio" fill="clear" class="transparent-button">
              <ion-icon slot="start" :icon="playSkipBack()" style="font-size: 30px;"></ion-icon>
            </ion-button>
            <ion-button @click="toggleAudio" fill="clear" class="transparent-button" style="padding-left: 14px">
              <ion-icon v-if="!shouldPlayAudio" slot="start" :icon="play()" style="font-size: 50px;"></ion-icon>
              <ion-icon v-else slot="start" :icon="pause()" style="font-size: 50px;"></ion-icon>
            </ion-button>
            <ion-button @click="nextAudio" fill="clear" class="transparent-button">
              <ion-icon slot="start" :icon="playSkipForward()" style="font-size: 30px;"></ion-icon>
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
import {play, playSkipBack, playSkipForward, pause} from 'ionicons/icons';
import {TRACKS_NO_GPS} from '@/utils/constants.js';


export default defineComponent({
  name: 'offline-gallery',
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
      firstVisit: true,
      imageSource: 'src/assets/img/00_Welcome.jpg',
      audioSource: 'src/assets/audio/00_Welcome.mp3',
      currentTrackIndex: 0,
      shouldPlayAudio: false,
      audioDuration: 0,
      currentTime: 0
    };
  },
  computed: {
    currentAudio () {
      return TRACKS_NO_GPS[this.currentTrackIndex].audio
    },
    currentImage () {
      return TRACKS_NO_GPS[this.currentTrackIndex].image
    }
  },
  methods: {
    pause () {
      return pause
    },
    toggleAudio () {
      this.shouldPlayAudio = !this.shouldPlayAudio
      if (this.shouldPlayAudio) {
        this.playAudio()
      } else {
        this.pauseAudio()
      }
    },
    playAudio () {
      if (this.$refs.audioPlayer && this.$refs.audioPlayer.src) {
        const canAutoplay = this.$refs.audioPlayer.autoplay !== undefined;
        this.shouldPlayAudio = true

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
    pauseAudio () {
      this.shouldPlayAudio = false;
      this.$refs.audioPlayer.pause();
    },
    previousAudio () {
      this.pauseAudio()
      this.currentTrackIndex--
      this.playAudio()
    },
    nextAudio () {
      this.pauseAudio()
      this.currentTrackIndex++
      this.playAudio()
    },
    onTimeUpdate () {
      this.currentTime = this.$refs.audioPlayer.currentTime;
    },
    playSkipForward () {
      return playSkipForward
    },
    playSkipBack () {
      return playSkipBack
    },
    play () {
      return play
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
