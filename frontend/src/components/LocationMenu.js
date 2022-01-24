import React from "react";
import API from "./API.js"

class ReviewDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: "add",
      dialogTitle: "Write a review",
      fontSize: "small",
      review: {
        id: null,
        user: "",
        text: ""
      }
    }
  }

  updateReviewUser(event) {
    this.setState({
      review: {
        id: this.state.review.id,
        user: event.target.value,
        text: this.state.review.text
      }
    })
  }

  updateReviewText(event) {
    this.setState({
      review: {
        id: this.state.review.id,
        user: this.state.review.user,
        text: event.target.value
      }
    })
  }

  sendReview() {
    this.props.onAddButtonClicked(this.state.mode, this.state.review)
  }

  deleteReview() {
    this.props.onDeleteButtonClicked('delete', this.state.review)
  }

  componentDidMount() {
    this.setState({
      fontSize: this.props.fontSize,
      mode: this.props.mode,
      review: this.props.review
    })
  }

  componentDidUpdate() {
    if (this.state.fontSize !== this.props.fontSize) {
      this.setState({
        fontSize: this.props.fontSize
      })
    }
  }

  render() {
    return (
      <div className="review-dialog">
        <div className="review-dialog-content border rounded shadow-lg">
          <svg onClick={this.props.onCloseClicked} xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="#6c757d" className="bi bi-x-lg float-right" style={{cursor: 'pointer'}} viewBox="0 0 16 16">
            <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
          </svg>
          <h3 className="font-weight-bold">
            {this.state.dialogTitle}
            <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} fill="currentColor" className="bi bi-vector-pen ml-2" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M10.646.646a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 0 .708l-1.902 1.902-.829 3.313a1.5 1.5 0 0 1-1.024 1.073L1.254 14.746 4.358 4.4A1.5 1.5 0 0 1 5.43 3.377l3.313-.828L10.646.646zm-1.8 2.908-3.173.793a.5.5 0 0 0-.358.342l-2.57 8.565 8.567-2.57a.5.5 0 0 0 .34-.357l.794-3.174-3.6-3.6z"/>
              <path fillRule="evenodd" d="M2.832 13.228 8 9a1 1 0 1 0-1-1l-4.228 5.168-.026.086.086-.026z"/>
            </svg>  
            <hr className="my-3" />
          </h3>
          <table width="100%">
            <tbody>
              <tr>
                <td colSpan="2">
                  <span className={`form-text text-muted ${this.state.fontSize === "large" ? "font-weight-bold" : "small"}`}>Who Wrote This</span>
                  <input type="text" onChange={this.updateReviewUser.bind(this)} value={this.state.review.user} placeholder="Name" className="form-control" />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                <span className={`form-text text-muted ${this.state.fontSize === "large" ? "font-weight-bold" : "small"}`}>Review</span>
                  <textarea onChange={this.updateReviewText.bind(this)} value={this.state.review.text} placeholder="Content" className="form-control" rows="2"></textarea>
                </td>
              </tr>
              <tr>
                <td colSpan="2" className="d-flex justify-content-end">
                  { this.state.mode === 'edit' && (
                    <div>
                      <button onClick={this.sendReview.bind(this)} className="btn btn-success mt-4 px-4">Save</button>
                      <button onClick={this.deleteReview.bind(this)} className="btn btn-danger mt-4 px-4 ml-2">Delete</button>
                    </div>
                  )}
                  { this.state.mode === 'add' && (
                    <button onClick={this.sendReview.bind(this)} className="btn btn-success mt-4 px-4">Add</button>
                  )}
                  <button onClick={this.props.onCloseClicked} className="btn btn-secondary mt-4 px-3 ml-2">Cancel</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default class LocationMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      selectedLocationId: null,
      hidden: true,
      numberOfTrafficSymbols: 0,
      showDialog: false,
      dialogMode: 'add',
      fontSize: "small"
    }
  }

  getSelectedLocation() {
    let selectedLocation = this.state.locations.filter(location => location.id === this.state.selectedLocationId).length > 0 ? this.state.locations.filter(location => location.id === this.state.selectedLocationId)[0] : null
    
    if (selectedLocation && selectedLocation.reviews.length > 0) {
      selectedLocation.reviews.sort((a, b) => b.ownership - a.ownership)
    }

    return selectedLocation
  }

  getUserReview() {
    if (this.getSelectedLocation()) {
      if (this.getSelectedLocation().reviews.filter(review => review.ownership === true).length > 0) {
        return this.getSelectedLocation().reviews.filter(review => review.ownership === true)[0]
      } else {
        return {
          id: null,
          user: "",
          text: ""
        }
      }  
    } else {
      return {
        id: null,
        user: "",
        text: ""
      }
    }
  }

  async toggleFavourite() {
    let updatedLocations = this.state.locations
    let index = this.state.locations.findIndex(location => location.id === this.state.selectedLocationId)
    updatedLocations[index].favourite = !updatedLocations[index].favourite

    await API.updateFavourite(updatedLocations[index].favourite, this.state.selectedLocationId)
    let locations = await API.getAll();
    this.setState({
      locations: locations
    })

    this.props.onFavouriteChange(locations)
  }

  async handleDialogConfirmationClicked(mode, review) {
    let updatedLocations = this.state.locations

    if (mode === 'add') {
      // let index = this.state.locations.findIndex(location => location.id === this.state.selectedLocationId)
      let date = new Date();
      let newDate = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();

      await API.addReview(this.state.selectedLocationId, review.user, review.text, newDate, 1)
      let locations = await API.getAll();
      this.setState({
        showDialog: false,
        locations: locations
      })

      this.setState({
        dialogMode: 'edit'
      })

      this.props.onReviewChange(locations)
    } else if (mode === 'edit') {
      let indexOfLocation = this.state.locations.findIndex(location => location.id === this.state.selectedLocationId)
      let indexOfReview = updatedLocations[indexOfLocation].reviews.findIndex(review => review.ownership === true)
      let date = new Date();
      let newDate = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();

      updatedLocations[indexOfLocation].reviews[indexOfReview] = {
        user: review.user,
        text: review.text,
        date: newDate,
        ownership: true
      }

      await API.updateReview(this.state.selectedLocationId, review.user, review.text, newDate, review.id)
      let locations = await API.getAll();
      this.setState({
        showDialog: false,
        locations: locations
      })

      this.props.onReviewChange(locations)
    } else if (mode === 'delete') {
      let indexOfLocation = this.state.locations.findIndex(location => location.id === this.state.selectedLocationId)
      let indexOfReview = updatedLocations[indexOfLocation].reviews.findIndex(review => review.ownership === true)

      updatedLocations[indexOfLocation].reviews.splice(indexOfReview, 1)

      await API.deleteReview(review.id)
      this.setState({
        showDialog: false,
        dialogMode: 'add'
      })

      this.props.onReviewChange(updatedLocations)
    }

    this.setState({
      showDialog: false
    })
  }

  showDirections() {
    this.props.onDirectionChange()
  }

  showReviewDialog() {
    this.setState({
      showDialog: true
    })
  }

  handleDialogCloseClicked() {
    this.setState({
      showDialog: false
    })
  }

  closeLocationMenu() {
    this.props.onClose()
    this.setState({
      hidden: true,
      selectedLocationId: null
    })
  }

  componentDidMount() {
    this.setState({
      locations: this.props.locations,
      dialogMode: this.props.dialogMode,
      fontSize: this.props.fontSize,
      hidden: true
    })
  }

  async componentDidUpdate(oldProps, oldState) {
    if (this.props.selectedLocationId === null && this.props.selectedLocationId !== this.state.selectedLocationId) {
      this.setState({
        selectedLocationId: this.props.selectedLocationId,
        locations: this.props.locations,
        numberOfTrafficSymbols: 0,
        hidden: true
      })
    } else if (this.props.selectedLocationId !== this.state.selectedLocationId) {
      let numberOfTrafficSymbols = this.props.locations.filter(location => location.id === this.props.selectedLocationId).length > 0 ? this.props.locations.filter(location => location.id === this.props.selectedLocationId)[0].traffic : 0;
      
      await this.setState({
        selectedLocationId: this.props.selectedLocationId,
        locations: this.props.locations,
        numberOfTrafficSymbols: numberOfTrafficSymbols,
        dialogMode: "add",
        hidden: false
      })

      if (this.getSelectedLocation() && this.getSelectedLocation().reviews.filter(review => review.ownership === true).length > 0) {
        this.setState({
          dialogMode: "edit"
        })
      } else {
        this.setState({
          dialogMode: "add"
        })
      }
    }

    if (this.state.fontSize !== this.props.fontSize) {
      this.setState({
        fontSize: this.props.fontSize
      })
    }
  }

  render() {
    let dialogContent = [];

    if (this.state.showDialog) {
      dialogContent =
      <ReviewDialog 
        mode={this.state.dialogMode} 
        review={this.getUserReview()}
        fontSize={this.state.fontSize}
        onSaveButtonClicked={this.handleDialogConfirmationClicked.bind(this)}
        onAddButtonClicked={this.handleDialogConfirmationClicked.bind(this)}
        onDeleteButtonClicked={this.handleDialogConfirmationClicked.bind(this)}
        onCloseClicked={this.handleDialogCloseClicked.bind(this)}
      />
    }

    return (
      <div className="locationMenu">
        <div
          className={`position-absolute bg-white p-4 m-2 rounded rounded-lg shadow ${this.state.hidden ? "d-none" : ""}`}
          id="location-menu"
        >
          <svg onClick={this.closeLocationMenu.bind(this)} xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="#6c757d" className="bi bi-x-lg float-right" style={{cursor: 'pointer'}} viewBox="0 0 16 16">
            <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
          </svg>
          <div className={`font-weight-bold text-truncate mb-0 ${this.state.fontSize === "large" ? "h3" : "h4"}`}>
            {this.getSelectedLocation() ? this.getSelectedLocation().name : null}
            <svg onClick={this.toggleFavourite.bind(this)} xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" className={`bi bi-star ml-1 mb-1 ${this.getSelectedLocation() !== null && this.getSelectedLocation().favourite === true ? "d-none" : "d-inline"}`} style={{cursor: 'pointer'}} viewBox="0 0 16 16">
              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
            </svg>
            <svg onClick={this.toggleFavourite.bind(this)} xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" className={`bi bi-star-fill ml-1 mb-1 ${this.getSelectedLocation() !== null && this.getSelectedLocation().favourite === false ? "d-none" : "d-inline"}`} style={{cursor: 'pointer'}} viewBox="0 0 16 16">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
          </div>
          <div className="location-menu-container d-flex mx-2">
            <div>
              <div className={`text-muted d-inline-block text-truncate mt-1 ${this.state.fontSize === "large" ? "" : "small"}`}>
                Traffic Level:
                <span className="ml-1">
                  {Array.from(Array(this.state.numberOfTrafficSymbols)).map((trafficSymbol, index) => 
                    <svg key={index} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-diamond-fill" style={{marginBottom: "2px", marginRight: "2px"}} viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435z"/>
                    </svg>
                  )}
                </span>
              </div>
              <img className="location-thumbnail" src={this.getSelectedLocation() ? this.getSelectedLocation().imageUrl : ""} alt="Placeholder" />
            </div>
            <div className="w-100 ml-3">
              <div className="w-100 d-flex justify-content-end align-items-center">
                <div onClick={this.showDirections.bind(this)} className="direction-button-desktop location-direction-button font-weight-bold" style={{cursor: 'pointer'}}>
                  <span className={`${this.state.fontSize === "large" ? "h5 font-weight-bold" : ""}`}>Directions</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="currentColor" className="bi bi-compass ml-1" style={{marginBottom: "2px"}} viewBox="0 0 16 16">
                    <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                    <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z"/>
                  </svg>
                </div>
                <div onClick={this.showDirections.bind(this)} className="direction-button-mobile location-direction-button font-weight-bold" style={{cursor: 'pointer'}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} fill="currentColor" className="bi bi-compass ml-1" style={{marginBottom: "2px"}} viewBox="0 0 16 16">
                    <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                    <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z"/>
                  </svg>
                </div>
              </div>
              <div>
                <div className="location-menu-review-container">
                  <div className="w-100 d-flex justify-content-between align-items-center my-2">
                    <span className={`font-weight-bold text-muted m-0 ${this.state.fontSize === "large" ? "h5" : ""}`}>Reviews</span>
                    <div onClick={this.showReviewDialog.bind(this)} className="review-button-desktop review-button font-weight-bold" style={{cursor: 'pointer'}}>
                      <span className={`${this.state.fontSize === "large" ? "h5 font-weight-bold" : ""}`}>{this.state.dialogMode === "add" ? "Write" : "Edit"}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="currentColor" className="bi bi-vector-pen ml-1" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M10.646.646a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 0 .708l-1.902 1.902-.829 3.313a1.5 1.5 0 0 1-1.024 1.073L1.254 14.746 4.358 4.4A1.5 1.5 0 0 1 5.43 3.377l3.313-.828L10.646.646zm-1.8 2.908-3.173.793a.5.5 0 0 0-.358.342l-2.57 8.565 8.567-2.57a.5.5 0 0 0 .34-.357l.794-3.174-3.6-3.6z"/>
                        <path fillRule="evenodd" d="M2.832 13.228 8 9a1 1 0 1 0-1-1l-4.228 5.168-.026.086.086-.026z"/>
                      </svg>
                    </div>
                    <div onClick={this.showReviewDialog.bind(this)} className="review-button-mobile review-button font-weight-bold" style={{cursor: 'pointer'}}>
                      <span className={`${this.state.fontSize === "large" ? "h5 font-weight-bold" : ""}`}></span>
                      <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} fill="currentColor" className="bi bi-vector-pen ml-1" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M10.646.646a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 0 .708l-1.902 1.902-.829 3.313a1.5 1.5 0 0 1-1.024 1.073L1.254 14.746 4.358 4.4A1.5 1.5 0 0 1 5.43 3.377l3.313-.828L10.646.646zm-1.8 2.908-3.173.793a.5.5 0 0 0-.358.342l-2.57 8.565 8.567-2.57a.5.5 0 0 0 .34-.357l.794-3.174-3.6-3.6z"/>
                        <path fillRule="evenodd" d="M2.832 13.228 8 9a1 1 0 1 0-1-1l-4.228 5.168-.026.086.086-.026z"/>
                      </svg>
                    </div>
                  </div>
                  <div className={`${this.getSelectedLocation() && this.getSelectedLocation().reviews.length === 0 ? "d-block" : "d-none"}`}>
                    <h6 className="text-muted">None</h6>
                  </div>
                  <div className={`location-menu-review-content-overflow ml-2 ${this.getSelectedLocation() && this.getSelectedLocation().reviews.length > 0 ? "d-block" : "d-none"}`}>
                    {this.getSelectedLocation() ? this.getSelectedLocation().reviews.map((review, index) => 
                        <div key={index} className={`p-1 m-1 ${review.ownership === true? "review-personal-comment" : ""}`}>
                          <h6 className="font-weight-bold mb-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-person-circle mb-1 mr-1" viewBox="0 0 16 16">
                              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                            </svg>
                            <span className={`${this.state.fontSize === "large" ? "review-font-large" : ""}`}>{review.user}</span>
                            <span className="text-muted small ml-1">{review.date}</span>
                          </h6>
                          <p className={`text-muted ml-2 ${this.state.fontSize === "large" ? "" : "small"}`}>{review.text}</p>
                        </div> 
                      ) : null
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {dialogContent}
      </div>
    );
  }
}