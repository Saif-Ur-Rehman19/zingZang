import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
  Event,
  State,
  PlaybackErrorEvent,
} from 'react-native-track-player';
// import {seekToCurrentTime} from './seekToCurrentTime';

export async function setupPlayer() {
  // let isSetup = false;
  // try {
  //   await TrackPlayer.getCurrentTrack();
  //   isSetup = true;
  // } catch {
  //   await TrackPlayer.setupPlayer({
  //     minBuffer: 3,
  //     playBuffer: 4,
  //     maxBuffer: 100,
  //     maxCacheSize: 100,
  //   });
  //   await TrackPlayer.updateOptions({
  //     android: {
  //       appKilledPlaybackBehavior:
  //         AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
  //     },
  //     capabilities: [
  //       Capability.Play,
  //       Capability.Pause,
  //       Capability.Stop,
  //       Capability.SkipToNext,
  //       Capability.SkipToPrevious,
  //       Capability.SeekTo,
  //     ],
  //     compactCapabilities: [
  //       Capability.Play,
  //       Capability.Pause,
  //       Capability.Stop,
  //       Capability.SkipToNext,
  //       Capability.SkipToPrevious,
  //       Capability.SeekTo,
  //     ],
  //     progressUpdateEventInterval: 2,
  //   });
  //   isSetup = true;
  // } finally {
  //   return isSetup;
  // }
}

export async function SetupPlayer() {
  let isSetup = false;
  try {
    let setup = await TrackPlayer.setupPlayer();
    console.log(setup);
    await TrackPlayer.updateOptions({
      // Media controls capabilities
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],

      // Capabilities that will show up when the notification is in the compact form on Android
      compactCapabilities: [Capability.Play, Capability.Pause, Capability.Stop],

      // Icons for the notification on Android (if you don't like the default ones)
    });
    isSetup = true;
    return isSetup;
  } catch (error) {
    console.log(error, 'sadmas');
    isSetup = false;
    return false;
  }
}

export async function addTracksOnTrackPlayer(
  tracks: any,
  insertBeforeIndex?: number,
) {
  if (tracks) {
    await TrackPlayer.reset();
    await TrackPlayer.add(tracks, insertBeforeIndex);
    // await TrackPlayer.seekTo(0);
    // await seekToCurrentTime();
    // await TrackPlayer.play();
  }
}

export async function addTracks() {
  await TrackPlayer.add([
    {
      id: '1',
      url: require('./../assets/sound/sound.mp3'),
      title: 'Fluidity',
      artist: 'tobylane',
      duration: 60,
    },
  ]);
  // await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

export async function playbackService() {
  // Add event listeners for remote control events (play, pause, next, etc.)
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
    console.log('Remote Play');
  });
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });
  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    TrackPlayer.skipToNext();
  });
  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    TrackPlayer.skipToPrevious();
  });
  TrackPlayer.addEventListener(
    Event.PlaybackError,
    (data: PlaybackErrorEvent) => {
      console.warn('An error occurred while playing:', data.message);
    },
  );
}
