import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Model from "./Model";
import { useDispatch, useSelector } from "react-redux";
import { getDataAction } from "../../Store/ModelMailSlice";

const Maildashboard = () => {
  const [getData, setGetdata] = useState([]);
  const dispatch = useDispatch();
  const inboxlength = useSelector((state) => state.Mail.totalinboxmessage);
  const loginemail = localStorage.getItem("email");
  const LoginUserPlainEmail = loginemail.replace(/[^a-zA-Z0-9]/g, "");

  useEffect(() => {
    fetch(
      `https://mailbox-57936-default-rtdb.firebaseio.com/${LoginUserPlainEmail}/sendBox.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const newdata = [];
        for (let key in data) {
          newdata.push({
            id: key,
            ...data[key],
          });
        }
        dispatch(getDataAction.getData(newdata));
        setGetdata(newdata);
      });
  }, [dispatch, LoginUserPlainEmail]);

  //get data
  return (
    <div className="container-fluid">
      <div className="row mt-5">
        <div className="col-md-12 col-lg-12 col-sm-12">
          <div className="row">
            {/* BEGIN INBOX MENU */}
            <div className="col-md-3 col-lg-3 col-sm-6">
              <h2 className="grid-title">
                <i className="fa fa-inbox"></i> Inbox
              </h2>
              <Link
                className="btn btn-block btn-primary "
                data-toggle="modal"
                data-target="#compose-modal"
              >
                <i className="fa fa-pencil"></i>&nbsp;&nbsp;NEW MESSAGE
              </Link>
              <hr className="hr hr-blurry" />
              <div>
                <ul className=" list-unstyled pl-3">
                  <li
                    className="header text-uppercase h5 mb-4"
                    style={{ color: "#777" }}
                  >
                    Folders
                  </li>
                  <li className="active ">
                    <Link>
                      <i className="fa fa-inbox mb-4"></i> Inbox ({inboxlength})
                    </Link>
                  </li>
                  <li>
                    <Link>
                      <i className="fa fa-mail-forward"></i> Sent
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* END INBOX MENU */}

            {/* BEGIN INBOX CONTENY */}

            <div className="col-md-9 col-lg-9 col-sm-9">
              <div className="row">
                {/* SEARCH START */}
                <div className="col-md-6 h5">Mail</div>
                <div className="col-md-6 search-form">
                  <form action="#" className="text-right">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control input-sm"
                        placeholder="Search"
                      />
                    </div>
                  </form>
                </div>
                {/* SEARCH END */}
                {/* TABLE START*/}
                <div className="table-responsive mt-3">
                  <table className="table table-hover table-mail">
                    <tbody>
                      {getData.map((items) => {
                        return (
                          <tr>
                            <td className="table-inbox-checkbox">
                              <div className="checkbox">
                                <label>
                                  <input type="checkbox" />
                                </label>
                              </div>
                            </td>

                            <td className="name ">
                              <Link style={{ textDecoration: "none" }}>
                                <span className="bg-dark text-white p-1 rounded">
                                  from-{items.from}
                                </span>
                                &nbsp;
                                <span className="text-dark">
                                  {items.subject}
                                </span>
                              </Link>
                            </td>
                            <td className="subject ">
                              <Link
                                className="text-dark"
                                style={{ textDecoration: "none" }}
                              >
                                {items.msgBody}
                              </Link>
                            </td>
                            <td className="time">{items.date}</td>
                            <td>
                              <Link
                                className="text-dark"
                                style={{ textDecoration: "none" }}
                              >
                                <i
                                  className="fa fa-trash"
                                  aria-hidden="true"
                                ></i>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* END INBOX CONTENT  */}
            {/* MOdel BOX */}
            <Model />
            {/* MODEL BOX END  */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maildashboard;
