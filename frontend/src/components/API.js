export default class API {
  static async getAll() {
    let locationData = await fetch("http://localhost:3001/api?act=getlocations")
      .then(res => {
        return res.json()
      })
    let reviewData = await fetch("http://localhost:3001/api?act=getreviews")
      .then(res => {
        return res.json()
      })
      
    let locations = []

    // 'ownership' field needs to be type casted since the database stores the values as BOOL type (0, 1).
    reviewData.forEach(review => {
      review.ownership = Boolean(review.ownership)
    })

    locationData.forEach(location => {
      // 'favourite' field needs to be type casted since the database stores the values as BOOL type (0, 1).
      if (location.favourite === "false" || location.favourite === 0) {
        location.favourite = false
      } else {
        location.favourite = true
      }

      // Link reviews to their respective locations.
      if (reviewData.filter(review => review.location_id === location.id).length > 0) {
        let reviews = reviewData.filter(review => review.location_id === location.id)
        location.reviews = reviews
      } else {
        location.reviews = []
      }
      locations.push(location)
    })

    return locations
  }

  static async addReview(location_id, user, text, date, ownership) {
    return await fetch(`http://localhost:3001/api?act=addReview&location_id=${location_id}&user=${user}&text=${text}&date=${date}&ownership=${ownership}`)
      .then(res => res.json())
      .then(res => {
        return res;
      });
  }

  static async updateReview(location_id, user, text, date, id) {
    return await fetch(`http://localhost:3001/api?act=updateReview&location_id=${location_id}&user=${user}&text=${text}&date=${date}&id=${id}`)
      .then(res => res.json())
      .then(res => {
        return res;
      });
  }

  static async deleteReview(id) {
    return await fetch(`http://localhost:3001/api?act=deleteReview&id=${id}`)
      .then(res => res.json())
      .then(res => {
        return res;
      });
  }

  static async updateFavourite(favourite, id) {
    return await fetch(`http://localhost:3001/api?act=updateFavourite&favourite=${favourite}&id=${id}`)
      .then(res => res.json())
      .then(res => {
        return res;
      });
  }
}