import React from "react";

export default class FilterMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "All",
      favouriteCount: 0,
      fontSize: "small"
    }
  }

  setFilter(event) {
    this.setState({
      filter: event.target.value
    })
  }

  componentDidMount() {
    this.setState({
      favouriteCount: this.props.favouriteCount,
      fontSize: this.props.fontSize
    })
  }

  componentDidUpdate(oldProps, oldState) {
    if (this.state.filter !== oldState.filter) {
      this.props.onChange(this.state.filter)
    }

    if (this.props.favouriteCount !== this.state.favouriteCount) {
      this.setState({
        favouriteCount: this.props.favouriteCount
      })
    }

    if (this.props.fontSize !== this.state.fontSize) {
      this.setState({
        fontSize: this.props.fontSize
      })
    }
  }

  render() {
    return (
      <div className="filterMenu">
        <div
          className="position-absolute bg-white py-3 px-4 m-2 rounded rounded-lg shadow"
          id="map-filters"
        >
          <ul className={`p-0 pl-3 ${this.state.fontSize === "small" ? "filter-menu-font-small" : "filter-menu-font-large"}`}>
            <li>
              <label htmlFor="All"
                ><input
                  type="radio"
                  className="form-check-input filter-option"
                  value="Favourites"
                  id="Favourites"
                  name="map_filter"
                  onChange={this.setFilter.bind(this)}
                />
                Favourites ({this.state.favouriteCount})
                </label>
            </li>
            <li>
              <label htmlFor="All"
                ><input
                  type="radio"
                  className="form-check-input filter-option"
                  value="All"
                  id="All"
                  name="map_filter"
                  onChange={this.setFilter.bind(this)}
                  defaultChecked
                />
                All
                </label>
            </li>
            <li>
              <label htmlFor="Parks"
                ><input
                  type="radio"
                  className="form-check-input filter-option"
                  value="Parks"
                  id="Parks"
                  name="map_filter"
                  onChange={this.setFilter.bind(this)}
                />
                Public Parks
                </label>
            </li>
            <li>
              <label htmlFor="Landmarks"
                ><input
                  type="radio"
                  className="form-check-input filter-option"
                  value="Landmarks"
                  id="Landmarks"
                  name="map_filter"
                  onChange={this.setFilter.bind(this)}
                />
                Landmarks
              </label>
            </li>
            <li>
              <label htmlFor="Museums"
                ><input
                  type="radio"
                  className="form-check-input filter-option"
                  value="Museums"
                  id="Museums"
                  name="map_filter"
                  onChange={this.setFilter.bind(this)}
                />
                Museums
              </label>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
  