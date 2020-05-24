import React, {Component} from 'react';
import MainNavigation from '../../containers/MainNavigation/MainNavigation';
import NowAvailableSlider from '../../components/NowAvailableSlider/NowAvailableSlider';
import FreeLimited from '../../containers/FreeLimited/FreeLimited';
import NewReleases from '../../containers/NewReleases/NewReleases';
import './EpicStore.css';
class EpicStore extends Component {
  render() {
    return (
      <React.Fragment>
        <MainNavigation />
        <NowAvailableSlider />
        <NewReleases />
        <FreeLimited />
      </React.Fragment>
    );
  }
}

export default EpicStore;
