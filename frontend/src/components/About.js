import atlasLogoBlack64px from '../images/atlas-logo-black-64px.png';
import featureThumbnail1 from '../images/feature-1.jpg'
import featureThumbnail2 from '../images/feature-2.jpg'
import featureThumbnail3 from '../images/feature-3.jpg'
import featureThumbnail4 from '../images/feature-4.jpg'
import featureReview from '../images/feature-review.jpg'
import featureTraffic from '../images/feature-traffic.jpg'

function About() {
  return (
    <div className="about">
      <div className="about-banner">
        <div className="d-flex align-items-center justify-content-center flex-column h-100 text-white">
          <h1 className="mb-4 mt-5 font-weight-bold">Welcome to Atlas</h1>
          <p>The future of travel.</p>
        </div>
      </div>
      <div className="container mt-4">
        <h1 className="font-weight-bold mt-5 mb-3"><img src={atlasLogoBlack64px} alt="Atlas Logo" height={52} width={52} className="mr-3 mb-2" style={{ transform: `rotate(${-15}deg)` }} />What is Atlas?</h1>
        <hr />
        <div className="mx-3">
          <p>Atlas is a revolutionary new app that that has changed the world of travel.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas accumsan dapibus dapibus. Maecenas maximus placerat turpis, in luctus arcu fermentum non. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin aliquet orci eu augue vehicula iaculis. Integer ac rhoncus tellus. Donec a quam eu erat imperdiet vestibulum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut at ligula dignissim, ultricies magna vitae, fermentum nunc. Phasellus vel ultricies dolor, eu pellentesque odio. Vivamus at varius nulla. Maecenas hendrerit nulla vel sagittis fringilla. Donec non velit lectus. Pellentesque molestie dui at sem malesuada, ut aliquet ante tincidunt. Mauris consectetur, ante quis porta bibendum, felis massa dignissim quam, sit amet pharetra diam justo faucibus ligula. Duis ullamcorper fermentum nibh, ac tincidunt dui dictum nec. Curabitur eget lorem vitae nisi iaculis imperdiet.</p>
        </div>
        
        {/* <!-- Location Filters --> */}
        <h2 className="font-weight-bold mt-5 mb-3 text-center">Location Filters</h2>
        <hr />
        <div className="row mx-3">
          <div className="col-lg-3 col-md-6 mb-3">
            <div><img className="about-thumbnail" src={featureThumbnail2} alt="Public Parks" /></div>
            <div className="caption text-center mt-1">Public Parks</div>
          </div>
          <div className="col-lg-3 col-md-6 mb-3">
            <div><img className="about-thumbnail" src={featureThumbnail3} alt="Landmarks" /></div>
            <div className="caption text-center mt-1">Landmarks</div>
          </div>
          <div className="col-lg-3 col-md-6 mb-3">
            <div><img className="about-thumbnail" src={featureThumbnail4} alt="Museums" /></div>
            <div className="caption text-center mt-1">Museums</div>
          </div>
          <div className="col-lg-3 col-md-6 mb-3">
            <div><img className="about-thumbnail" src={featureThumbnail1} alt="Favourites" /></div>
            <div className="caption text-center mt-1">Favourites</div>
          </div>
        </div>

        {/* <!-- Social Features --> */}
        <h2 className="font-weight-bold mt-5 mb-3 text-center">Social Features</h2>
        <hr />
        <div className="row mb-5 mx-3 align-items-center">
          <div className="col-lg-9">
            <h5 className="font-weight-bold">User Reviews</h5>
            <p>Read about other people's experiences and share yours as well.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas accumsan dapibus dapibus. Maecenas maximus placerat turpis, in luctus arcu fermentum non. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
          </div>
          <div className="col-lg-3">
            <img src={featureReview} alt="Feature Thumbnail" className="img-fluid rounded-thumbnail" />
          </div>
        </div>
        <div className="row mb-5 mx-3 align-items-center">
          <div className="col-lg-3">
            <img src={featureTraffic} alt="Feature Thumbnail" className="img-fluid rounded-thumbnail" />
          </div>
          <div className="col-lg-9 mt-3">
            <h5 className="font-weight-bold">Traffic Level</h5>
            <p>Know what you're getting into before arriving.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas accumsan dapibus dapibus. Maecenas maximus placerat turpis, in luctus arcu fermentum non. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
          </div>
        </div>

        {/* <!-- Accessibility --> */}
        <h2 className="font-weight-bold mt-5 mb-3 text-center">Accessibility</h2>
        <hr />
        <div className="row mx-3 mb-3">
          <h4 className="font-weight-bold">
            Font Size
            <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} fill="currentColor" className="bi bi-vector-pen ml-2" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M10.646.646a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 0 .708l-1.902 1.902-.829 3.313a1.5 1.5 0 0 1-1.024 1.073L1.254 14.746 4.358 4.4A1.5 1.5 0 0 1 5.43 3.377l3.313-.828L10.646.646zm-1.8 2.908-3.173.793a.5.5 0 0 0-.358.342l-2.57 8.565 8.567-2.57a.5.5 0 0 0 .34-.357l.794-3.174-3.6-3.6z"/>
              <path fillRule="evenodd" d="M2.832 13.228 8 9a1 1 0 1 0-1-1l-4.228 5.168-.026.086.086-.026z"/>
            </svg>
          </h4>
          <p className="mx-3">Do you have bad eyesight? We can work with that. Phasellus vestibulum mattis risus, quis porta mi dignissim malesuada. Cras sagittis ipsum vel ultricies imperdiet. Phasellus sem purus, mattis quis augue et, ultrices congue ex. Quisque tristique felis odio, in scelerisque magna tincidunt nec. Pellentesque vel arcu a ante dapibus efficitur. Praesent efficitur, est sed cursus venenatis, nibh metus euismod purus, congue vulputate mauris metus sed orci. Quisque vehicula risus ut mollis ultrices. Praesent imperdiet at risus eu vehicula. Mauris eget sollicitudin magna. Cras accumsan nibh sem, quis vulputate erat placerat vel.</p>
        </div>
        <div className="row mx-3 mb-3">
          <h4 className="font-weight-bold">
            Color Selection
            <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} fill="currentColor" className="bi bi-palette ml-2" viewBox="0 0 16 16">
              <path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
              <path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8zm-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7z"/>
            </svg>
          </h4>
          <p className="mx-3">Are you colorblind? Not a problem. Pellentesque dictum ipsum id nisl tincidunt, eu finibus lacus aliquet. Suspendisse interdum est non purus varius porta. Fusce pharetra, nunc non dapibus rhoncus, quam magna vestibulum quam, id pellentesque quam dui quis ante. Aliquam vitae dolor quis odio varius vulputate id nec massa. Mauris vel interdum libero. Nunc nec ullamcorper neque, sagittis dapibus enim. Suspendisse potenti.</p>
        </div>
        <div className="row mx-3 mb-3">
          <h4 className="font-weight-bold">
            Responsive Design
            <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} fill="currentColor" className="bi bi-aspect-ratio ml-2" viewBox="0 0 16 16">
              <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5v-9zM1.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"/>
              <path d="M2 4.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H3v2.5a.5.5 0 0 1-1 0v-3zm12 7a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H13V8.5a.5.5 0 0 1 1 0v3z"/>
            </svg>
          </h4>
          <p className="mx-3">Our app looks gorgeous no matter what you're viewing it on. Nulla nec nunc pellentesque, sagittis erat quis, scelerisque lectus. Maecenas dolor ipsum, fermentum quis interdum sed, varius a metus. In nec nibh sed lorem feugiat mattis id nec quam. Ut vitae pretium eros. Vivamus sit amet placerat nunc. Fusce sed rutrum risus. Suspendisse a elit ante. Fusce non nunc ultricies, scelerisque lacus at, malesuada enim.</p>
        </div>
      </div>
    </div>
  );
}

export default About;

