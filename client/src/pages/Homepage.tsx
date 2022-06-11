import { useState } from "react";
import {
  useToggleMusic,
  useToggleTimer,
  useToggleTasks,
  useSpotifyMusic,
  usePosTask,
  useToggleStickyNote,
  useStickyNote,
  useToggleQuote,
  useToggleTwitch,
  usePosMusic,
  usePosSpotify,
  usePosTimer,
  usePosQuote,
  usePosTwitch,
  useGrid,
} from "@Store";
import { Player } from "@Components/Player/Player";
import { Timer } from "@Components/Timer/Timer";
import { TaskTracker } from "@Components/TaskTracker/TaskTracker";
import { Spotify } from "@Components/Player/Spotify/Player";
import { BackgroundNav } from "@Components/Nav/BackgroundNav";
import { DWrapper } from "@Components/Dragggable/Draggable";
import { CryptoDonationButton } from "@App/components/Crypto/Donation";
import { CustomizationButton } from "@App/components/Common/Buttons/CustomizationButton";
import { GoGear } from "react-icons/go";
import { SettingsModal } from "@App/components/Settings/Modal";
import { MdWidgets } from "react-icons/md";
import { WidgetControlModal } from "@App/components/WidgetControl/WidgetControlModal";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { Sticky } from "@Components/Sticky/Sticky";
import { Quotes } from "@App/components/Quotes/Quotes";
import useMediaQuery from "@Utils/hooks/useMediaQuery";
import { TwitchStream } from "@Components/Twitch/TwitchStream";

export const HomePage = ({ backgrounds }: { backgrounds: any }) => {
  const { isMusicToggled, isMusicShown } = useToggleMusic();
  const { isTimerToggled, isTimerShown } = useToggleTimer();
  const { isTasksToggled, isTasksShown } = useToggleTasks();
  const { isSpotifyToggled, isSpotifyShown } = useSpotifyMusic();
  const { isStickyNoteShown } = useToggleStickyNote();
  const { isQuoteToggled, isQuoteShown } = useToggleQuote();
  const { isTwitchToggled, isTwitchShown } = useToggleTwitch();

  // Position hooks
  const { taskPosX, taskPosY, setTaskPos } = usePosTask();
  const { musicPosX, musicPosY, setMusicPos } = usePosMusic();
  const { spotifyPosX, spotifyPosY, setSpotifyPos } = usePosSpotify();
  const { quotePosX, quotePosY, setQuotePos } = usePosQuote();
  const { timerPosX, timerPosY, setTimerPos } = usePosTimer();
  const { stickyNotes, setStickyNotesPos } = useStickyNote();
  const { twitchPosX, twitchPosY, setTwitchPos } = usePosTwitch();
  const isDesktop = useMediaQuery("(min-width: 641px)");
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const [isConfigureWidgetModalOpen, setIsConfigureWidgetModalOpen] =
    useState(false);
  const [isBackgroundModalOpen, setIsBackgroundModalOpen] = useState(false);
  const { grid } = useGrid();

  return (
    <div className="h-screen space-y-1">
      <div
        className={
          "flex justify-end " +
          (isDesktop ? " space-x-6" : " justify-items-end grid gap-y-[5%]")
        }
      >
        <div className="settingsButton">
          <CustomizationButton
            title="Settings"
            icon={<GoGear className="-mr-1 ml-2" />}
            modal={
              <SettingsModal
                isVisible={isSettingsModalOpen}
                onClose={() => setSettingsModalOpen(false)}
              />
            }
            changeModal={setSettingsModalOpen}
          />
        </div>
        <div className="configureWidgetsButton">
          <CustomizationButton
            title="Configure Widgets"
            icon={<MdWidgets className="-mr-1 ml-2" />}
            modal={
              <WidgetControlModal
                isVisible={isConfigureWidgetModalOpen}
                onClose={() => setIsConfigureWidgetModalOpen(false)}
              />
            }
            changeModal={setIsConfigureWidgetModalOpen}
          />
        </div>
        <div className="chooseBackgroundButton">
          <CustomizationButton
            title="Choose Background"
            icon={<IoMdArrowDropdownCircle className="-mr-1 ml-2" />}
            modal={
              <BackgroundNav
                backgrounds={backgrounds}
                isVisible={isBackgroundModalOpen}
                onClose={() => setIsBackgroundModalOpen(false)}
              />
            }
            changeModal={setIsBackgroundModalOpen}
          />
        </div>
      </div>
      <CryptoDonationButton />
      {!isDesktop ? (
        <div className="flex flex-col items-center ml-8">
          <div className={`${isMusicToggled ? "block" : "hidden"}`}>
            <Player />
          </div>
          <div className={`${isSpotifyToggled ? "block" : "hidden"}`}>
            <Spotify />
          </div>
          <div className={`${isTimerToggled ? "block" : "hidden"}`}>
            <Timer />
          </div>
          <div className={`${isTasksToggled ? "block" : "hidden"}`}>
            <TaskTracker />
          </div>
          <div className={`${isQuoteToggled ? "block" : "hidden"}`}>
            <Quotes />
          </div>
        </div>
      ) : (
        <>
          {stickyNotes.map((stickyNote) => {
            return (
              <DWrapper
                key={stickyNote.id}
                toggleHook={isStickyNoteShown}
                defaultX={stickyNote.stickyNotesPosX}
                defaultY={stickyNote.stickyNotesPosY}
                setPosition={setStickyNotesPos}
                isSticky={true}
                stickyID={stickyNote.id}
                handle={true}
                gridValues={grid}
              >
                <Sticky id={stickyNote.id} text={stickyNote.text} />
              </DWrapper>
            );
          })}
          <DWrapper
            toggleHook={isTimerToggled && isTimerShown}
            defaultX={timerPosX}
            defaultY={timerPosY}
            setPosition={setTimerPos}
            isSticky={false}
            handle={false}
            gridValues={grid}
          >
            <Timer />
          </DWrapper>
          <DWrapper
            toggleHook={isTasksToggled && isTasksShown}
            defaultX={taskPosX}
            defaultY={taskPosY}
            setPosition={setTaskPos}
            isSticky={false}
            handle={true}
            gridValues={grid}
          >
            <TaskTracker />
          </DWrapper>
          <DWrapper
            toggleHook={isMusicToggled && isMusicShown}
            defaultX={musicPosX}
            defaultY={musicPosY}
            setPosition={setMusicPos}
            isSticky={false}
            handle={false}
            gridValues={grid}
          >
            <Player />
          </DWrapper>
          <DWrapper
            toggleHook={isSpotifyToggled && isSpotifyShown}
            defaultX={spotifyPosX}
            defaultY={spotifyPosY}
            setPosition={setSpotifyPos}
            isSticky={false}
            handle={true}
            gridValues={grid}
          >
            <Spotify />
          </DWrapper>
          <DWrapper
            toggleHook={isQuoteToggled && isQuoteShown}
            defaultX={quotePosX}
            defaultY={quotePosY}
            setPosition={setQuotePos}
            isSticky={false}
            handle={true}
            gridValues={grid}
          >
            <Quotes />
          </DWrapper>
          <DWrapper
            toggleHook={isTwitchToggled && isTwitchShown}
            defaultX={twitchPosX}
            defaultY={twitchPosY}
            setPosition={setTwitchPos}
            isSticky={false}
            handle={false}
            gridValues={grid}
          >
            <TwitchStream />
          </DWrapper>
        </>
      )}
    </div>
  );
};
