import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../Mail/OpenMail.css";
import { useDispatch, useSelector } from "react-redux";
import {
  ToReciverDataAction,
  ToSendDataAction,
  changeDataAction,
  getDataAction,
  readMailAction,
} from "../../Store/ModelMailSlice";

const OpenMail = () => {
  const location = useLocation();
  console.log(location.state);
  const dispatch = useDispatch();
  const loginemail = localStorage.getItem("email");
  const LoginUserPlainEmail = loginemail.replace(/[^a-zA-Z0-9]/g, "");
  console.log();
  // const inboxLength = useSelector((state) => state.Mail.totalinboxmessage);
  const [idMail, setIdMail] = useState([]);
  const dataGet = useSelector((state) => state.Mail.ToReciverData);
  console.log(dataGet);
  useEffect(() => {
    if (dataGet.length > 0) {
      dataGet[0].map((item) => {
        console.log(item);
        setIdMail(item.id);
      });
    }
  }, [dataGet]);

  const mailread = useSelector((state) => state.Mail.read);
  console.log(mailread);

  const gettoData = useSelector((state) => state.Mail.reciverData);
  console.log(gettoData);

  const { from, to, subject, msgBody, date, id, read } =
    location.state || undefined;
  console.log(location.state);
  // const mailId = location.state.id;

  useEffect(() => {
    console.log(idMail);
    fetch(
      `https://mailbox-57936-default-rtdb.firebaseio.com/${LoginUserPlainEmail}/inbox/${idMail}.json`,
      // `https://mailbox-57936-default-rtdb.firebaseio.com/shivanigmailcom/inbox/-NWrxcQQ663U8MLAcUQj.json`,

      {
        method: "PUT",
        body: JSON.stringify({
          ...location.state,
          read: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // dispatch(ToReciverDataAction.ToReciverData(data));
        // dispatch(ToSendDataAction.ToSendData(data));
        // dispatch(readMailAction.readMail(data));
      });
  }, [LoginUserPlainEmail, idMail]);

  return (
    <div className="container-fluid">
      <div className="row mt-5">
        <div className="col-md-12 col-lg-12 col-sm-12">
          <div className="row">
            {console.log(idMail)}
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
                  {/* test */}
                  <div
                    class="nav  "
                    id="nav-tab"
                    role="tablist"
                    style={{ display: "contents" }}
                  >
                    <a
                      class="nav-item nav-link active"
                      id="nav-home-tab"
                      data-toggle="tab"
                      href="#nav-home"
                      role="tab"
                      aria-controls="nav-home"
                      aria-selected="true"
                    >
                      <Link to={"/dashboard/inbox"}>
                        <i className="fa fa-inbox mb-4"></i> Inbox (
                        {dataGet.length})
                      </Link>
                    </a>

                    <a
                      class="nav-item nav-link"
                      id="nav-profile-tab"
                      data-toggle="tab"
                      href="#nav-profile"
                      role="tab"
                      aria-controls="nav-profile"
                      aria-selected="false"
                    >
                      <Link to={"/dashboard/send"}>
                        <i className="fa fa-mail-forward"></i> Sent
                      </Link>
                    </a>
                  </div>
                </ul>
              </div>
            </div>
            {/* END INBOX MENU */}
            {/* BEGIN content LIST */}
            <div className="col-md-9 col-lg-9 col-sm-9 mt-5">
              <div className="row">
                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active mt-3"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                  >
                    <div className="inboxDetail">
                      <div className="row">
                        <div className="col-md-12 d-flex">
                          <div className="col-md-2">
                            <p className="d-flex pt-3shadow mt-4 ml-4">
                              <span className="criclename justify-content-center mr-3 rounded-circle text-Uppercase">
                                {from ? from : to}
                              </span>
                            </p>
                          </div>
                          <div className="col-mg-10 mt-3">
                            <div>
                              <span className="">
                                <strong>{from ? "From-" : "To-"}</strong>
                                {from ? from : to}
                              </span>
                              <span style={{ marginLeft: "300px" }}>
                                {date}
                              </span>
                            </div>
                            <hr></hr>
                            <p>Subject- {subject}</p>
                            <p>Message- {msgBody}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* END INBOX CONTENT  */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenMail;
// background: gray;
// width: 60px;
// height: 60px;
// margin-left: 30px;
// display: flex;
// justify-content: center;
// margin-top: 12px;
// padding-top: 15px
// px
// ;
// color: white;
