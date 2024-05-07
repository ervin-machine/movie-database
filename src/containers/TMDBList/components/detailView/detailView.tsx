import styles from "./detailView.module.css"
import { useLocation, Link } from "react-router-dom";
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectVideo } from "../../store/selectors";
import { fetchVideo } from "../../store/actions";
import useDebounce from "../../../../utilities/useDebounce";

import YoutubePlayer from "../../../../components/YoutubePlayer";

type detailViewProps = {
  video: any;
  fetchVideo: (fetch: string, id: number) => void;
}

const DetailView = (props: detailViewProps) => {
  const { video, fetchVideo } = props;
  const { state } = useLocation();

  const RenderBackdrop = () => {
    if(video?.length > 0) {
      return <YoutubePlayer videoID={video[0]?.key}/>
    }
    else {
      return <img src={`https://image.tmdb.org/t/p/w500/${state.item.backdrop_path}`} alt="backdrop" />
    }
  }

  useDebounce(
    () => {

      if(video === undefined) {
        fetchVideo(state.detailLink, state.item.id);
      }

    },
    [video],
    1000
  );

  return (
    <div className={styles.detailView}>
      <div className={styles.detailViewContent}>
        <Link to="/" state={{ resetVideo: true }}><button className={styles.back}>&laquo; Back</button></Link>
        <RenderBackdrop />
        <p className={styles.detailTitle}>{ state.item.original_title || state.item.original_name }</p>
        <p className={styles.detailOverview}>{state.item.overview}</p>
      </div>
      
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  video: selectVideo(),
})

const mapDispatchToProps = (dispatch: any) => {
  return {
      fetchVideo: (fetch: string, id: number) => {
          dispatch(fetchVideo(fetch, id))
      },
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default (withConnect)(DetailView)