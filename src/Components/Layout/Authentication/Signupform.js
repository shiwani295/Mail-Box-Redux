import React from "react";
import logo from "../../Asset/Image/logo.png";
import "../Authentication/Signuppage.css";

const Signupform = () => {
  return (
    <section>
      <div className="container ">
        <div className="row justify-content-center ">
          <div className="signuppage mt-5 bg-dark text-white p-5 border border-white rounded">
            <img
              src={logo}
              alt="logo"
              className="w-25 d-block ml-auto mr-auto "
            />
            <h3>We Are The Mail Box Team</h3>
            <div className="Fromstart">
              <form>
                <p>Please login to your account</p>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form2Example11"
                    className="form-control"
                    placeholder="Email address.."
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form2Example22"
                    className="form-control"
                    placeholder="Password.."
                  />
                </div>

                <div className="text-center pt-1 mb-5 pb-1">
                  <button
                    className="btn btn-dark border-white btn-block mb-3"
                    type="button"
                  >
                    Log in
                  </button>
                  <a class="text-white " href="#!">
                    Forgot password?
                  </a>
                </div>
                <div class="d-flex align-items-center justify-content-center pb-4">
                  <p class="mb-0 me-2">Don't have an account?</p>
                  <button type="button" class="btn btn-outline-white ml-3">
                    Create new
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </section>
  );
};

export default Signupform;
// style="width: 185px;"
