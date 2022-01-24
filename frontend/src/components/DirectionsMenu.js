import React from "react";

export default class DirectionsMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maps: null,
      directionsService: null,
      directionsRenderer: null,
      hidden: true
    }
  }

  clearDirections() {
    // let maps = this.state.maps;
    // let directionsRenderer = this.state.directionsRenderer;

    // let mapOptions = {
    //   zoom:13,
    //   center: { lat: 43.2464343, lng: -79.8618984 },
    //   disableDefaultUI: true,
    // }
    // let map = new maps.Map(document.getElementById('google-map-react-container'), mapOptions);

    // directionsRenderer.setMap(null);
    // directionsRenderer.setPanel(null);

    this.props.onChange();
    // this.setState({
    //   hidden: true
    // })
  }

  closeDirectionsMenu() {
    // let directionsRenderer = this.state.directionsRenderer;
    // directionsRenderer.setMap(null);
    // directionsRenderer.setPanel(null);
    // this.forceUpdate();

    this.props.onChange();
    // this.setState({
    //   hidden: true
    // })
  }

  componentDidMount() {
    this.setState({
      maps: this.props.maps,
      directionsService: this.props.directionsService,
      directionsRenderer: this.props.directionsRenderer,
      hidden: this.props.hidden
    })
  }

  componentDidUpdate(oldProps, oldState) {
    if (this.props.hidden !== this.state.hidden) {
      this.setState({
        hidden: this.props.hidden
      })
    }

    if (this.props.maps !== this.state.maps) {
      this.setState({
        maps: this.props.maps,
        directionsService: this.props.directionsService,
        directionsRenderer: this.props.directionsRenderer
      })
    }
  }

  render() {
    return (
      <div className="directionsMenu">
        <div
          className={`position-absolute bg-white py-3 px-4 m-2 rounded rounded-lg shadow ${this.state.hidden ? "d-none" : ""}`}
          id="map-directions"
        >
          <div className="font-weight-bold d-flex justify-content-between align-items-center">
            <span className="h5 mb-0">Directions</span>
            <svg onClick={this.closeDirectionsMenu.bind(this)} xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="#6c757d" className="bi bi-x-lg float-right" style={{cursor: 'pointer'}} viewBox="0 0 16 16">
              <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
            </svg>
          </div>
          <div id="map-directions-content"></div>
          <button
            className="btn btn-secondary btn-block"
            onClick={this.clearDirections.bind(this)}
          >
            Clear Directions
          </button>
        </div>
      </div>
    );
  }
}
  