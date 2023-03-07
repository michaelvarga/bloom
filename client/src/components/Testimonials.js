import "../index.scss";

function Testimonials() {
  return (
    <div className="fluid-container d-flex row justify-content-center">
      <h3 className="text-center mt-5 mb-3">What People are Saying</h3>
      <div className="row mb-5">
        <div className="testimonial col-md-4 text-center ps-5 pe-5">
          <p>"I'm so happy with my purchase! The plant arrived in perfect condition and has been thriving in my living room. I highly recommend this site for anyone looking to add some greenery to their home."</p>
          <span>Sarah M.</span>
        </div>
        <div className="testimonial col-md-4 text-center ps-5 pe-5">
          <p>"I was hesitant to buy plants online, but I'm so glad I did! The selection on this website is fantastic and I was able to find the perfect plant for my bedroom. I'll definitely be back for more!"</p>
          <span>Michael P.</span>
        </div>
        <div className="testimonial col-md-4 text-center ps-5 pe-5">
          <p>"I'm not the most experienced plant parent, but this site made it easy for me to find a plant that would work well in my low-light apartment. I'm happy to say the plant is thriving!"</p>
          <span>Emily S.</span>
        </div>
      </div>
    </div>
  )
}

export default Testimonials
