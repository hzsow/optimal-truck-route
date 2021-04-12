import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Map from './Map';
import './HereMaps.css';

class HereMaps extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      map: {},
      behavior: {},
      factory: null,
    };
  }

  onMapLoaded = (map, behavior, factory) => {
    this.setState({
      map,
      behavior,
      factory,
    });

    this.props.onMapLoaded(map);
  };

  render() {
    const { map, behavior, factory } = this.state;
    const { children } = this.props;
    return (
      <div className="here-map-container">
        <Map {...this.props} onMapLoaded={this.onMapLoaded} />
        {React.Children.map(children, child => {
          if (!child) return null;
          return React.cloneElement(child, { map, behavior, factory });
        })}
      </div>
    );
  }
}

HereMaps.defaultProps = {
  appId: '',
  appCode: '',
  useHTTPS: true,
  onMapLoaded: () => {},
  center: { lng: 13.4, lat: 52.51 },
  bounds: {},
  zoom: 10,
};

HereMaps.propTypes = {
  /**
   * Heremaps App ID
   */
  appId: PropTypes.string,
  /**
   * Heremaps App Code
   */
  appCode: PropTypes.string,
  /**
   * If true then works in https
   */
  useHTTPS: PropTypes.bool,
  /**
   * Called when the map is loaded. This returns the map object.
   */
  onMapLoaded: PropTypes.func,
  /**
   *  Center of the map. It should be like this {lat: 12.12, lng: 13}
   */
  center: PropTypes.object,
  /**
   * Rectangular bounds which restrict the maps viewing port
   * It should be like this {north: 12, south: 17, east: 10, west: 14}
   */
  bounds: PropTypes.object,
  /**
   * Zoom level of the map. Defaults to 10.
   */
  zoom: PropTypes.number,
};

export default HereMaps;



// import React from 'react';
// import H from "@here/maps-api-for-javascript";
// import onResize from 'simple-element-resize-detector';

// export default class Map extends React.Component {
//   constructor(props) {
//     super(props);
//     this.ref = React.createRef();
//     this.map = null;
//   }

//   componentDidMount() {
//     if (!this.map) {
//       const platform = new H.service.Platform({
//         apikey: 'hn8nc_2Y3gsr7XMtPw4XwB3Gv4TbmmaQeD1xNOgCSGU'
//       });
//       const layers = platform.createDefaultLayers();
//       const map = new H.Map(
//         this.ref.current,
//         layers.vector.normal.map,
//         {
//           pixelRatio: window.devicePixelRatio,
//           center: {lat: 0, lng: 0},
//           zoom: 2,
//         },
//       );
// 	  onResize(this.ref.current, () => {
// 		map.getViewPort().resize();
// 	  });
//       this.map = map;
//     }
//   }

//   render() {
//     return (
//       <div
//         style={{ width: '100%', height:'800px' }}
//         ref={this.ref}
//       />
//     )
//   }
// }