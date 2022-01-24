import exhibit1 from "../images/docs-exhibit-1.png";
import exhibit2 from "../images/docs-exhibit-2.png";
import exhibit3 from "../images/docs-exhibit-3.png";
import exhibit4 from "../images/docs-exhibit-4.png";
import exhibit5 from "../images/docs-exhibit-5.png";
import exhibit6 from "../images/docs-exhibit-6.png";

function Docs(props) {
  return (
    <div className="docs">
      <div className="container mt-4">        
        {/* <!-- Write a Review --> */}
        <h2 className="font-weight-bold mt-5 mb-3">Writing a Review</h2>
        <hr />
        <div className="row mx-3">
          <p>Reviews are stories written by users that are visible to everyone. They are a great way of sharing experiences with others as well as learning about locations that you are unfamiliar with.</p>
          <p>1. To write a review, click on the "Write" button in the location menu. Refer to Exhibit 1.</p>
          <figure className="figure">
            <img src={exhibit1} className="figure-img img-fluid rounded" alt="Exhibit 1" />
            <figcaption className="figure-caption">Exhibit 1: Review Button</figcaption>
          </figure>
          <p>2. After clicking on the button, a modal should appear. Fill in the appropriate fields; your name and the contents of the review. Refer to Exhibit 2.</p>
          <figure className="figure">
            <img src={exhibit2} className="figure-img img-fluid rounded" alt="Exhibit 2" />
            <figcaption className="figure-caption">Exhibit 2: Review Modal</figcaption>
          </figure>
          <p>3. Once you are satisfied with your review and are ready to finalize it, click on the "Save" button to post it. Once posted, it should then appear in the location menu, under the "Reviews" section. Refer to Exhibit 3.</p>
          <figure className="figure">
            <img src={exhibit3} className="figure-img img-fluid rounded" alt="Exhibit 3" />
            <figcaption className="figure-caption">Exhibit 3: Posting the Review</figcaption>
          </figure>
          <p>4. If you wish to edit or delete a previously posted review, click on the "Edit" button which should appear in place of the "Write" button in Step 1. This will open the review modal as before, but now there are options for editing and deleting the review. Refer to Exhibit 4.</p>
          <figure className="figure">
            <img src={exhibit4} className="figure-img img-fluid rounded" alt="Exhibit 4" />
            <figcaption className="figure-caption">Exhibit 4: Editing and Deleting a Review</figcaption>
          </figure>
        </div>

        {/* <!-- Favourites --> */}
        <h2 className="font-weight-bold mt-5 mb-3">Favouriting a Location</h2>
        <hr />
        <div className="row mx-3">
          <p>Favouriting is a good way of keeping track of places you like to visit on a regular basis.</p>
          <p>1. To favourite a location, simply click on the star icon in the location menu beside the location's name. Refer to Exhibit 5.</p>
          <figure className="figure">
            <img src={exhibit5} className="figure-img img-fluid rounded" alt="Exhibit 5" />
            <figcaption className="figure-caption">Exhibit 5: Favourite Icon</figcaption>
          </figure>
          <p>2. Once clicked, the icon should fill in to indicate that the location has been favourited. The newly favourited location can now be quickly referenced using the "Favourite" filter. Refer to Exhibit 6.</p>
          <figure className="figure">
            <img src={exhibit6} className="figure-img img-fluid rounded" alt="Exhibit 6" />
            <figcaption className="figure-caption">Exhibit 5: Favourite Filter</figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}

export default Docs;