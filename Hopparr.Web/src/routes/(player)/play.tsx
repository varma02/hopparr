import { createFileRoute } from "@tanstack/react-router";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  DefaultVideoLayout,
  type DefaultLayoutIcons,
} from "@vidstack/react/player/layouts/default";

import "./player.css";

import {
  LucideAArrowDown,
  LucideAArrowUp,
  LucideAccessibility,
  LucideAirplay,
  LucideArrowLeft,
  LucideArrowRight,
  LucideCaptions,
  LucideCaptionsOff,
  LucideCast,
  LucideCircleFadingArrowUp,
  LucideClockArrowDown,
  LucideClockArrowUp,
  LucideDownload,
  LucideFastForward,
  LucideFullscreen,
  LucideGalleryVerticalEnd,
  LucideHeadphones,
  LucideMinimize,
  LucideMonitorDown,
  LucideMonitorUp,
  LucidePause,
  LucidePictureInPicture2,
  LucidePlay,
  LucideRadio,
  LucideRewind,
  LucideRotateCw,
  LucideSettings,
  LucideSquarePlay,
  LucideVolume1,
  LucideVolume2,
  LucideVolumeOff,
} from "lucide-react";

export const Route = createFileRoute("/(player)/play")({
  component: RouteComponent,
});

const customIcons: DefaultLayoutIcons = {
  AirPlayButton: {
    Default: LucideAirplay,
    Connecting: () => <LucideAirplay className="animate-pulse" />,
    Connected: () => <LucideAirplay className="fill-primary-foreground" />,
  },
  GoogleCastButton: {
    Default: LucideCast,
    Connecting: () => <LucideCast className="animate-pulse" />,
    Connected: () => <LucideCast className="fill-primary-foreground" />,
  },
  PlayButton: {
    Play: LucidePlay,
    Pause: LucidePause,
    Replay: LucideRotateCw,
  },
  MuteButton: {
    Mute: LucideVolumeOff,
    VolumeLow: LucideVolume1,
    VolumeHigh: LucideVolume2,
  },
  CaptionButton: {
    On: LucideCaptions,
    Off: LucideCaptionsOff,
  },
  PIPButton: {
    Enter: LucidePictureInPicture2,
    Exit: LucidePictureInPicture2,
  },
  FullscreenButton: {
    Enter: LucideFullscreen,
    Exit: LucideMinimize,
  },
  SeekButton: {
    Backward: LucideFastForward,
    Forward: LucideRewind,
  },
  DownloadButton: {
    Default: LucideDownload,
  },
  Menu: {
    Accessibility: LucideAccessibility,
    ArrowLeft: LucideArrowLeft,
    ArrowRight: LucideArrowRight,
    Audio: LucideHeadphones,
    AudioBoostUp: LucideVolume2,
    AudioBoostDown: LucideVolume1,
    Chapters: LucideGalleryVerticalEnd,
    Captions: LucideCaptions,
    Playback: LucideSquarePlay,
    Settings: LucideSettings,
    SpeedUp: LucideClockArrowUp,
    SpeedDown: LucideClockArrowDown,
    QualityUp: LucideMonitorUp,
    QualityDown: LucideMonitorDown,
    FontSizeUp: LucideAArrowUp,
    FontSizeDown: LucideAArrowDown,
    OpacityUp: LucideCircleFadingArrowUp,
    OpacityDown: () => <LucideCircleFadingArrowUp className="-scale-y-100" />,
    RadioCheck: LucideRadio,
  },
  KeyboardDisplay: {
    Play: LucidePlay,
    Pause: LucidePause,
    Mute: LucideVolumeOff,
    VolumeUp: LucideVolume2,
    VolumeDown: LucideVolume1,
    EnterFullscreen: LucideFullscreen,
    ExitFullscreen: LucideMinimize,
    EnterPiP: LucidePictureInPicture2,
    ExitPiP: LucidePictureInPicture2,
    CaptionsOn: LucideCaptions,
    CaptionsOff: LucideCaptionsOff,
    SeekForward: LucideFastForward,
    SeekBackward: LucideRewind,
  },
};

function RouteComponent() {
  return (
    <main>
      <MediaPlayer
        className="w-screen h-screen"
        title="Sprite Fight"
        src="https://files.vidstack.io/sprite-fight/hls/stream.m3u8"
      >
        <MediaProvider />
        <DefaultVideoLayout
          thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
          icons={customIcons}
        />
      </MediaPlayer>
    </main>
  );
}
