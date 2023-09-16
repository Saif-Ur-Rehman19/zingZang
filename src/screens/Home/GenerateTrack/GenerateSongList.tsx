import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {SafeAreaView} from 'react-native-safe-area-context';

import TrackPlayer, {useProgress} from 'react-native-track-player';
import {Slider} from '@react-native-assets/slider';

import {connect} from 'react-redux';
import {addCurrentSong} from '../../../actions/songs';
import {setupPlayer} from '../../../service/trackPlayerServices';
import {LyricsSongList} from '../../../service/lyricsService';
import {Images} from '../../../constant/Images';
import {Strings} from '../../../constant/Strings';
import TrackPlayerModal from '../../../components/Modal/TrackPlayerModal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import WaveAnimation from '../../../components/WaveAnimation';
function GenerateSongList({navigation, song, addPlaySong}: any) {
  const [Song, setSong] = useState<any>(null);
  const [isPlay, setIsPlay] = useState<any>(false);
  useEffect(() => {
    async function setup() {
      let isSetup = await setupPlayer();
      console.log(isSetup);
      const queue = await TrackPlayer.getQueue();
      if (isSetup && queue.length <= 0) {
        TrackPlayer.reset();
        await TrackPlayer.add(LyricsSongList);
      }
    }

    setup();
  }, []);
  const {position, duration} = useProgress();
  const [showTrackPlayer, setShowTrackPlayer] = useState(false);

  console.log(song);
  return (
    <ImageBackground style={{height: hp('100%')}} source={Images.BG_1}>
      <SafeAreaView className="h-full " edges={['right', 'left', 'top']}>
        {/* // Search Box */}
        <View className="flex flex-row items-center justify-center px-4">
          <Text
            className="px-4 mt-5 font-medium text-center text-white"
            style={{fontSize: hp('2.5%')}}>
            Generate Track
          </Text>

          <TouchableOpacity
            className="absolute right-5 top-5"
            onPress={() => navigation.goBack(' ')}>
            <MaterialIcons color="white" name="close" size={32} />
          </TouchableOpacity>
        </View>
        {/* //Song List */}
        <View className="flex-1 px-4 mt-10 ">
          {LyricsSongList.map((item: any, index: number) => (
            <TouchableOpacity
              className={`flex flex-row items-center  justify-between p-3 bg-[#6836691A] rounded-2xl border-2 border-transparent  ${
                item.id === Song?.id && 'border-[#F780FB]'
              } drop-shadow-md mb-3 `}
              key={index + 1}
              onPress={async () => {
                setSong(item);
                setIsPlay(true);

                await TrackPlayer.play();
              }}>
              <View className={`flex flex-row items-center`}>
                <Image
                  source={{
                    uri: item.albumCover,
                  }}
                  className="w-12 h-12 mr-5 rounded-lg"
                />
                <View>
                  <Text className="text-xl font-semibold text-white">
                    {item.title}
                  </Text>
                  <Text className="font-normal text-md text-zinc-300 ">
                    {item.artist}
                  </Text>
                </View>
              </View>
              {item.id === Song?.id && (
                <View className="flex flex-row w-[50] h-[30]">
                  <WaveAnimation />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* //Button */}
        <View className={`pb-10 ${Song ? 'bg-[#6836693A]' : 'transparent'}`}>
          {Song ? (
            <>
              {/* <View className="h-1.5 bg-[#683669]" /> */}
              <TouchableOpacity>
                <Slider
                  minimumValue={0}
                  maximumValue={duration}
                  value={position}
                  minimumTrackTintColor="#9CF5F6"
                  maximumTrackTintColor="#683669"
                  thumbStyle={{
                    backgroundColor: 'transparent',
                  }}
                  trackStyle={{
                    height: 5,
                  }}
                  onValueChange={value => {
                    console.log(value);
                    TrackPlayer.seekTo(value);
                  }}
                />
              </TouchableOpacity>
              <View className="flex flex-row items-center justify-between py-2">
                <View className="flex-row items-center justify-between rounded-lg drop-shadow-md">
                  <TouchableOpacity
                    onPress={() => {
                      setShowTrackPlayer(true);

                      addPlaySong(Song);
                    }}
                    className="flex flex-row items-center p-3 ">
                    <Image
                      source={{
                        uri: Song?.albumCover,
                      }}
                      className="w-12 h-12 mr-5 rounded-lg"
                    />
                    <View>
                      <Text className="text-xl font-semibold text-white">
                        {Song?.title}
                      </Text>
                      <Text className="font-normal text-md text-zinc-300 ">
                        {Song?.artist}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    if (!isPlay) {
                      setIsPlay(true);
                      TrackPlayer.play();
                    } else {
                      setIsPlay(false);
                      TrackPlayer.pause();
                    }
                  }}
                  className="mr-2">
                  {isPlay ? (
                    <Image source={Images.PAUSE} />
                  ) : (
                    <Image source={Images.PLAY} />
                  )}
                </TouchableOpacity>
              </View>
            </>
          ) : null}
          <TouchableOpacity
            className="px-4 "
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('VideoCoverPage');
              TrackPlayer.pause();
            }}>
            <View
              className={`py-4 ${
                Song ? 'bg-[#F780FB]' : 'bg-[#F780FB4A]'
              }   rounded-full `}>
              <Text className="text-xl font-semibold text-center text-black">
                Continue
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <TrackPlayerModal
        showTrackPlayer={showTrackPlayer}
        setShowTrackPlayer={setShowTrackPlayer}
      />
    </ImageBackground>
  );
}

const mapStateToProps = (state: any) => {
  return {
    song: state.songs,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addPlaySong: (song: any) => {
      dispatch(addCurrentSong(song));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GenerateSongList);