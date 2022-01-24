import React from "react";

class SettingsDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      font: "small",
      marker: "color"
    }
  }

  onFontSettingChange(event) {
    this.setState({
      font: event.target.value
    })
  }

  onMarkerSettingChange(event) {
    this.setState({
      marker: event.target.value
    })
  }

  sendSettings() {
    this.props.onSaveButtonClicked(this.state.font, this.state.marker)
  }

  componentDidMount() {
    this.setState({
      font: this.props.font,
      marker: this.props.marker
    })
  } 

  componentDidUpdate() {

  }

  render() {
    return (
      <div className="settings-dialog">
        <div className="settings-dialog-content border rounded shadow-lg">
          <svg onClick={this.props.onCloseClicked} xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="#6c757d" className="bi bi-x-lg float-right" style={{cursor: 'pointer'}} viewBox="0 0 16 16">
            <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
          </svg>
          <h3 className="font-weight-bold">
            Settings
            <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} fill="currentColor" className="bi bi-gear ml-1 mb-1" viewBox="0 0 16 16">
              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
            </svg>
          </h3>
          <table width="100%" className="text-center">
            <tbody>
              <tr>
                <td>
                  <hr className="mb-4 mt-0" />
                  <span className={`form-text text-muted ${this.props.font === "large" ? "font-weight-bold" : "small"}`}>Font Size</span>
                  <div className="form-check form-check-inline">
                    <input onChange={this.onFontSettingChange.bind(this)} className="form-check-input" type="radio" name="fontSize" id="fontSizeSmall" value="small" checked={this.state.font === "small" ? true : false} />
                    <label className="form-check-label" htmlFor="fontSizeSmall">Small</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input onChange={this.onFontSettingChange.bind(this)} className="form-check-input" type="radio" name="fontSize" id="fontSizeLarge" value="large" checked={this.state.font === "large" ? true : false} />
                    <label className="form-check-label" htmlFor="fontSizeLarge">Large</label>
                  </div>        
                </td>
              </tr>
              <tr>
                <td>
                  <span className={`form-text text-muted ${this.props.font === "large" ? "font-weight-bold" : "small"}`}>Markers</span>
                  <div className="form-check form-check-inline">
                    <input onChange={this.onMarkerSettingChange.bind(this)} className="form-check-input" type="radio" name="markerColor" id="color" value="color" checked={this.state.marker === "color" ? true : false} />
                    <label className="form-check-label" htmlFor="color">Color</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input onChange={this.onMarkerSettingChange.bind(this)} className="form-check-input" type="radio" name="markerColor" id="grayscale" value="grayscale" checked={this.state.marker === "grayscale" ? true : false} />
                    <label className="form-check-label" htmlFor="grayscale">Grayscale</label>
                  </div>    
                  <hr className="mb-0 mt-4" />    
                </td>
              </tr>
              <tr>
                <td className="d-flex justify-content-end">
                  <button onClick={this.sendSettings.bind(this)} className="btn btn-success mt-3 px-4">Save</button>
                  <button onClick={this.props.onCloseClicked} className="btn btn-secondary mt-3 px-3 ml-2">Cancel</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default class SettingsMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      font: "small",
      marker: "color",
      showDialog: false
    }
  }

  showSettingsDialog() {
    this.setState({
      showDialog: true
    })
  }

  handleDialogConfirmationClicked(font, marker) {
    this.props.onChange(font, marker)
    this.setState({
      font: font,
      marker: marker,
      showDialog: false
    })
  }

  handleDialogCloseClicked() {
    this.setState({
      showDialog: false
    })
  }

  componentDidMount() {
    this.setState({
      font: this.props.fontSize,
      marker: this.props.colorMode
    })
  }

  componentDidUpdate() {
    if (this.state.marker !== this.props.colorMode) {
      this.setState({
        marker: this.props.colorMode
      })
    }

    if (this.state.font !== this.props.fontSize) {
      this.setState({
        marker: this.props.fontSize
      })
    }
  }

  render() {
    let dialogContent = [];

    if (this.state.showDialog) {
      dialogContent =
      <SettingsDialog 
        font={this.state.font}
        marker={this.state.marker}
        onSaveButtonClicked={this.handleDialogConfirmationClicked.bind(this)}
        onCloseClicked={this.handleDialogCloseClicked.bind(this)}
      />
    }
    return (
      <div className="settingsMenu">
        <div
          onClick={this.showSettingsDialog.bind(this)}
          className="position-absolute bg-white py-2 px-4 m-2 rounded rounded-lg shadow"
          id="settings-menu"
        >
          <h5 className="text-center mb-0 font-weight-bold">Settings</h5>
        </div>
        {dialogContent}
      </div>
    );
  }
}
  