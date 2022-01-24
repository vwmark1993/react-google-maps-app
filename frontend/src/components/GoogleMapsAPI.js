import SettingsMenu from './SettingsMenu.js';
import FilterMenu from './FilterMenu.js';
import LocationMenu from "./LocationMenu.js";
import DirectionsMenu from "./DirectionsMenu.js";
import API from "./API.js"

import React from "react";
import GoogleMapReact from 'google-map-react';

const getMapOptions = (maps) => {

  return {
    disableDefaultUI: true,
    mapTypeControl: false,
    clickableIcons: false,
    styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
  };
};

function CurrentLocationMarker(props) {
  return (
    <div className={`current-location-marker ${props.colorMode === "color" ? "current-location-marker-color" : "current-location-marker-grayscale"}`} title="Current Location">
    </div>
  );
};

class Marker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      id: null,
      text: "",
      colorMode: "color"
    }
  }

  handleMarkerClick() {
    this.props.onChange(this.state.id)
  }

  componentDidMount() {
    this.setState({
      id: this.props.id,
      selected: this.props.selected,
      text: this.props.text
    })
  }

  componentDidUpdate(oldProps, oldState) {
    if (this.state.id !== this.props.id) {
      this.setState({
        id: this.props.id,
        text: this.props.text
      })
    }

    if (this.state.selected !== this.props.selected) {
      this.setState({
        selected: this.props.selected
      })
    }

    if (this.state.colorMode !== this.props.colorMode) {
      this.setState({
        colorMode: this.props.colorMode
      })
    }

    if (this.state.colorMode !== this.props.colorMode) {
      this.setState({
        colorMode: this.props.colorMode
      })
    }
  }

  render() {
    return (
      <div 
        onClick={this.handleMarkerClick.bind(this)} 
        title={this.state.text}
        style={{ backgroundColor: this.state.color, cursor: 'pointer'}}
        className={`pin bounce 
          ${this.state.selected && this.state.colorMode === "color" ? "pin-color-selected" : ""} 
          ${this.state.selected && this.state.colorMode === "grayscale" ? "pin-grayscale-selected" : ""} 
          ${this.state.colorMode === "grayscale" ? "pin-grayscale" : "pin-color"}`}
      >
      </div>
    );
  }
};

export default class GoogleMapsAPI extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      maps: null,
      directionsService: null,
      directionsRenderer: null,
      locations: [],
      centerLatLng: {
        lat: null,
        lng: null
      },
      settings: {
        font: "small",
        marker: "color"
      },
      filter: "All",
      userLocation: null,
      selectedLocationId: null,
      hideDirectionsMenu: true
    }
  }
  

  filterLocations(filter) {
    let locationsArray = this.state.locations;
    if(filter === "Favourites") {
      return locationsArray.filter(location => location.favourite === true);
    }
    else if (filter !== "All") {
      return locationsArray.filter(location => location.filterType === filter);
    } else {
      return locationsArray
    }
    
  }

  filterChange(filter) {
    this.setState({
      filter: filter,
      selectedLocationId: null
    })
  }

  markerSelected(id) {
    this.setState({
      selectedLocationId: id
    })
  }

  resetSelectedLocation() {
    this.setState({
      selectedLocationId: null,
      hideDirectionsMenu: true
    })
  }
  
  updateReview(updatedLocations) {
    this.setState({
      locations: updatedLocations
    })
  }

  updateFavourite(updatedLocations) {
    this.setState({
      locations: updatedLocations
    })

    if (this.state.filter === "Favourites" && updatedLocations.filter(location => location.id === this.state.selectedLocationId)[0].favourite === false) {
      this.setState({
        selectedLocationId: null
      })
    }
  }

  updateSettings(font, marker) {
    this.setState({
      settings: {
        font: font,
        marker: marker
      }
    })
  }

  getDirections() {
    console.log("SHOW DIRECTIONS")
    this.setState({
      hideDirectionsMenu: false
    })

    // let maps = this.state.maps;
    // let directionsService = this.state.directionsService;
    // let directionsRenderer = this.state.directionsRenderer;

    // // let origin = new maps.LatLng(43.2716, -79.8724)
    // let origin = new maps.LatLng(this.state.centerLatLng.lat, this.state.centerLatLng.lng)
    // let destination = new maps.LatLng(43.2422, -79.8287)
    // let mapOptions = {
    //   zoom: 13,
    //   center: destination,
    //   disableDefaultUI: true,
    //   draggable: true
    // }

    // let map = new maps.Map(document.getElementById('google-map-react-container'), mapOptions);
    // directionsRenderer.setMap(map);
    // directionsRenderer.setPanel(
    //   document.getElementById("map-directions-content")
    // );
  
    // let request = {
    //     origin: origin,
    //     destination: destination,
    //     travelMode: maps.TravelMode["DRIVING"]
    // };
    // directionsService.route(request, function(response, status) {
    //   if (status == 'OK') {
    //     directionsRenderer.setDirections(response);
    //   }
    // });
  }

  hideDirectionsMenu() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            centerLatLng: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        }
      )
    }

    this.setState({
      hideDirectionsMenu: true
    })
    this.forceUpdate();
  }

  async componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            centerLatLng: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        }
      )
    }
    
    let locations;

    // Retrieve location records from database.
    locations = await API.getAll();

    this.setState({
      locations: locations
    })
  }

  render() {
    const handleApiLoaded = (map, maps) => {
      let directionsService = new maps.DirectionsService();
      // let directionsRenderer = new maps.DirectionsRenderer(rendererOptions);
      let directionsRenderer = new maps.DirectionsRenderer({
        draggable: true,
        map: map
      });

      this.setState({
        maps: maps,
        directionsService: directionsService,
        directionsRenderer: directionsRenderer,
        draggable: true,
      })
    };
    
    return (
      <div className="googleMapsApi">
        <div>
          <div>
            <SettingsMenu onChange={this.updateSettings.bind(this)} fontSize={this.state.settings.font} colorMode={this.state.settings.marker} />
            <FilterMenu onChange={this.filterChange.bind(this)} favouriteCount={this.state.locations.filter(location => location.favourite).length} fontSize={this.state.settings.font} />
            <LocationMenu onFavouriteChange={this.updateFavourite.bind(this)} onReviewChange={this.updateReview.bind(this)} onDirectionChange={this.getDirections.bind(this)} onClose={this.resetSelectedLocation.bind(this)} locations={this.state.locations} selectedLocationId={this.state.selectedLocationId} fontSize={this.state.settings.font} />
            <DirectionsMenu onChange={this.hideDirectionsMenu.bind(this)} hidden={this.state.hideDirectionsMenu} maps={this.state.maps} directionsService={this.state.directionsService} directionsRenderer={this.state.directionsRenderer} />
            <div id="google-map-react-container" className="map-container">
              <GoogleMapReact
                bootstrapURLKeys={{key: "AIzaSyDoH3oyYR5nzERWlIBQ4XLVZLtm63ZoIzc"}}
                defaultCenter={this.state.centerLatLng}
                defaultZoom={13}
                options={getMapOptions}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
              > 
                <CurrentLocationMarker
                  lat={this.state.centerLatLng.lat}
                  lng={this.state.centerLatLng.lng}
                  colorMode={this.state.settings.marker}
                >
                </CurrentLocationMarker>  
                {this.filterLocations(this.state.filter).map((marker, i) => {
                  return (
                    <Marker
                      key={i}
                      lat={marker.lat}
                      lng={marker.lng}
                      text={marker.name}
                      id={marker.id}
                      colorMode={this.state.settings.marker}
                      onChange={this.markerSelected.bind(this)}
                      selected={marker.id === this.state.selectedLocationId}
                    >
                    </Marker>
                  )
                })}
              </GoogleMapReact>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
