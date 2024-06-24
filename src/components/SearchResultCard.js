import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Context from '../context/Context';

const SearchResultCard = (props) => {
  const Navigate = useNavigate();
  const { video } = props;
  const { theme } = useContext(Context);

  const Render = () => {
    Navigate(`/video/${video.videoId}/${video.channelId}`)
  }

  const ViewConverter = (views) => {
    let count = 0;
    let originalCount = views;
    while (views !== 0) {
      count++;
      views = parseInt(views / 10);
    }

    if ((count - 1) === 4 || count - 1 === 3) {
      return ((originalCount / Math.pow(10, 3)).toString().slice(0, 4) + 'K')
    }
    else if ((count - 1) === 5) {
      return ((originalCount / Math.pow(10, 5)).toString().slice(0, 4) + 'lakh')
    }
    else if ((count - 1) >= 6) {
      return ((originalCount / Math.pow(10, 6)).toString().slice(0, 4) + 'M')
    }
    else {
      return originalCount;
    }
  }
  return (
    <>
      <div className='my-2 lg:w-[70%] w-full'>
        <div className='flex mb-5 flex-col sm:flex-row'>
          <div className='thumb relative'>
            <img src={video?.thumbnail[0]?.url} className='sm:rounded-xl cursor-pointer w-full sm:w-[400px] ' onClick={Render} alt="logo" />
            <div className='text-white text-center absolute right-2 bottom-2'>
              <h5 className={`${video.lengthText === 'LIVE' ? 'bg-red-600' : 'bg-black'} px-1  rounded-[7px] text-xs`}>{video.isLive ? <p> • {video.lengthText}</p> : <p>{video.lengthText}</p>}</h5>
            </div>
          </div>
          <div className='mx-4 my-1 text-lg'>
            <h4 className={`leading-5 text-sm font-bold text-${theme === 'light' ? 'black' : 'white'}`}>{video?.title}</h4>
            <div className={`text-${theme === 'light' ? 'black' : 'white'}  sm:block hidden`}>
              <h4 className='text-[10px] my-2'>{ViewConverter(video.viewCount)} views • {video?.publishedTimeText}</h4>
              <div className='flex items-center my-3 text-xs'>
                <img src={video.channelThumbnail[0].url} width='20px' className='rounded-full mr-2' alt="" />
                <h5 className='font-semibold cursor-pointer' onClick={() => { Navigate(`/channelDetails/${video.channelId}`) }}>{video?.channelTitle}</h5>
                <img src="/images/verify.webp" className='self-center mx-2 w-3' alt="verify" />
                {video.isLive &&
                  <p className='flex items-center text-sm my-2'>
                    <img src="/images/live.webp" width='20px' className='mr-2' alt="live" />
                  </p>}
              </div>
            </div>

            <div className={`text-${theme === 'light' ? 'black' : 'white'} block sm:hidden`}>
              <div className='flex items-center text-xs'>
                {<img src={video.channelThumbnail[0].url} width='20px' className='rounded-full mr-2' alt="" />}
                <h5 onClick={() => { Navigate(`/channelDetails/${video.channelId}`) }}>{video?.channelTitle}</h5>
                <img src="/images/verify.webp" className='self-center mx-2 w-3' alt="verify" />
                {video.isLive &&
                  <p className='flex items-center text-sm my-2'>
                    <img src="/images/live.webp" width='20px' className='mr-2' alt="live" />
                  </p>}
                <p className='text-[10px] my-2'>{ViewConverter(video?.viewCount)} views • {video?.publishedTimeText}</p>
              </div>
            </div>
            <h6 className={`text-${theme === 'light' ? 'black' : 'white'} text-xs my-2 hidden md:block`}>{video.description}</h6>
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchResultCard