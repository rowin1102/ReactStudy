export default function Home() {

  return (<>
    {/* Start Hero Section */}
    <div className="hero">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-5">
            <div className="intro-excerpt">
              <h1>Modern Interior <span clsas="d-block">Design Studio</span></h1>
              <p className="mb-4">Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.</p>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="hero-img-wrap">
              <img src="images/couch.png" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* <!-- Start Product Section --> */}
		<div className="product-section">
			<div className="container">
				<div className="row">

					{/* <!-- Start Column 1 --> */}
					<div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
						<h2 className="mb-4 section-title">Crafted with excellent material.</h2>
						<p className="mb-4">Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. </p>
					</div> 

					{/* <!-- Start Column 2 --> */}
					<div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
						<div className="product-item" href="cart.html">
							<img src="images/product-1.png" className="img-fluid product-thumbnail" />
							<h3 className="product-title">Nordic Chair</h3>
							<strong className="product-price">$50.00</strong>

							<span className="icon-cross">
								<img src="images/cross.svg" className="img-fluid" />
							</span>
						</div>
					</div> 

					{/* <!-- Start Column 3 --> */}
					<div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
						<div className="product-item" href="cart.html">
							<img src="images/product-2.png" className="img-fluid product-thumbnail" />
							<h3 className="product-title">Kruzo Aero Chair</h3>
							<strong className="product-price">$78.00</strong>

							<span className="icon-cross">
								<img src="images/cross.svg" className="img-fluid" />
							</span>
						</div>
					</div>

					{/* <!-- Start Column 4 --> */}
					<div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
						<div className="product-item" href="cart.html">
							<img src="images/product-3.png" className="img-fluid product-thumbnail" />
							<h3 className="product-title">Ergonomic Chair</h3>
							<strong className="product-price">$43.00</strong>

							<span className="icon-cross">
								<img src="images/cross.svg" className="img-fluid" />
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<h2></h2>
  </>); 
}