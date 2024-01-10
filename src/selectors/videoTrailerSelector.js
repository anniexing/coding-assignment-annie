import {createSelector} from '@reduxjs/toolkit';

const selectVideosData = (state) => state.movies.videos;

export const selectedTrailerVideo = createSelector(selectVideosData,(selectData, videoType) => {
  if(selectData && Object.keys(selectData) && Object.keys(selectData).length > 0) {
    if(selectData.videos){
      if(selectData.videos.results && selectData.videos.results.length > 0){
        const videoResults =  selectData.videos.results;
        const trailer = videoResults && videoResults.length > 0 && videoResults.find(vid => vid.type === 'Trailer');
        const videoKey = trailer ? trailer.key : videoResults[0].key
        return {videoKeyTest:videoKey, videos:videoResults};
      }

    }

  }else {
    return {videoKeyTest:null, videos:[]}
  }
})
