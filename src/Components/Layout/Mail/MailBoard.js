import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Model from "./Model";
import { useDispatch, useSelector } from "react-redux";
import { ToReciverDataAction, getDataAction } from "../../Store/ModelMailSlice";

const MailBoard = () => {
  const [getData, setGetdata] = useState([]);
  const [gettoData, settodata] = useState([]);
  const [read, setRead] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const loginemail = localStorage.getItem("email");
  const LoginUserPlainEmail = loginemail.replace(/[^a-zA-Z0-9]/g, "");
  const dataGet = useSelector((state) => state.Mail.ToReciverData);
  console.log(dataGet);

  useEffect(() => {
    if (LoginUserPlainEmail) {
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
          if (data) {
            const newData = Object.keys(data).map((key) => [
              { id: key.toString(), values: data[key] },
            ]);
            console.log(data);
            console.log(newData);
            dispatch(getDataAction.getData(newData));

            settodata(newData);
          } else {
            console.log("null");
          }

          ////////////////////////////////////////////////////////////////////////////////

          // const newdata = [];
          // for (let key in data) {
          //   newdata.push({
          //     id: key,
          //     ...data[key],
          //   });
          // }
          // console.log(newdata);
          // dispatch(getDataAction.getData(newdata));
          // // dispatch(ToReciverDataAction.ToSendData(data));
          // settodata(newdata);
        });
    }
  }, [dispatch, LoginUserPlainEmail]);

  //Reciver
  useEffect(() => {
    if (LoginUserPlainEmail) {
      fetch(
        `https://mailbox-57936-default-rtdb.firebaseio.com/${LoginUserPlainEmail}/inbox.json`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            const newData = Object.keys(data).map((key) => [
              { id: key.toString(), values: data[key] },
            ]);
            console.log(newData);
            dispatch(ToReciverDataAction.ToReciverData(newData));
            setGetdata(newData);
          } else {
            console.log("null");
          }
          //////////////////////////////////////////////////////////
          //   const newdata = [];
          //   for (let key in data) {
          //     newdata.push({
          //       id: key,
          //       ...data[key],
          //     });
          //   }
          //   dispatch(getDataAction.getData(newdata));
          //   setGetdata(newdata);
        });
    }
  }, [LoginUserPlainEmail, dispatch]);
  //delete

  const DeleteHandler = () => {
    if (LoginUserPlainEmail) {
      console.log("delete");
    }
  };

  const ToDeleteHandler = () => {
    if (LoginUserPlainEmail) {
      console.log("ToDelete");
    }
  };
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
                className="btn btn-block bg-dark text-white "
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
                    className="nav  "
                    id="nav-tab"
                    role="tablist"
                    style={{ display: "contents" }}
                  >
                    {getData ? (
                      <a
                        className="nav-item nav-link active text-dark"
                        id="nav-home-tab"
                        data-toggle="tab"
                        href="#nav-home"
                        role="tab"
                        aria-controls="nav-home"
                        aria-selected="true"
                      >
                        <Link
                          to={"/dashboard/inbox"}
                          className="text-dark"
                          style={{ textDecoration: "none" }}
                        >
                          <i className="fa fa-inbox mb-4"></i> Inbox(
                          {getData.length})
                        </Link>
                      </a>
                    ) : (
                      <a
                        className="nav-item nav-link active text-dark"
                        id="nav-home-tab"
                        data-toggle="tab"
                        href="#nav-home"
                        role="tab"
                        aria-controls="nav-home"
                        aria-selected="true"
                      >
                        <Link
                          to={"/dashboard/inbox"}
                          className="text-dark"
                          style={{ textDecoration: "none" }}
                        >
                          <i className="fa fa-inbox mb-4"></i>Inbox(
                          {gettoData.length})
                        </Link>
                      </a>
                    )}

                    <a
                      className="nav-item nav-link text-dark"
                      id="nav-profile-tab"
                      data-toggle="tab"
                      href="#nav-profile"
                      role="tab"
                      aria-controls="nav-profile"
                      aria-selected="false"
                    >
                      <Link
                        to={"/dashboard/send"}
                        className="text-dark"
                        style={{ textDecoration: "none" }}
                      >
                        <i className="fa fa-mail-forward mr-2 text-dark"></i>
                        Send
                      </Link>
                    </a>
                  </div>
                </ul>
              </div>
            </div>
            {/* END INBOX MENU */}

            {/* BEGIN INBOX CONTENY */}

            <div className="col-md-9 col-lg-9 col-sm-9 mt-5">
              <div className="row ">
                {/* SEARCH START */}
                <div className="col-md-6 h5 d-flex  ">Mail</div>

                <div className="col-md-6 search-form">
                  <form className="text-right">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control input-sm"
                        placeholder="Search"
                        onChange={(event) => {
                          setSearchTerm(event.target.value);
                        }}
                      />
                    </div>
                  </form>
                </div>
                {/* SEARCH END */}
                {/* ///////////////////////////////////////////////////////////////// */}
                {/* BEGIN MESSAGE LIST */}
                <div className="col-md-12 tab-content">
                  <div class="tab-content" id="nav-tabContent">
                    <div
                      class="tab-pane fade show active table-responsive mt-3"
                      id="nav-home"
                      // role="tabpanel"
                      aria-labelledby="nav-home-tab"
                    >
                      <table className="table table-hover table-mail">
                        <tbody>
                          {getData
                            .filter((val) => {
                              if (searchTerm === "") {
                                return val;
                              } else if (
                                val.subject
                                  .toLocaleLowerCase()
                                  .includes(searchTerm.toLocaleLowerCase())
                              ) {
                                return val;
                              }
                            })
                            .map((items) => {
                              //   console.log(items[0].values);
                              return (
                                <tr key={items[0].id}>
                                  <td className="table-inbox-checkbox">
                                    <div className="checkbox">
                                      <label>
                                        <input type="checkbox" />
                                      </label>
                                    </div>
                                  </td>
                                  {read ? (
                                    <td>
                                      <Link className="link">
                                        <span class="badge badge-pill text-white font-medium badge-success ">
                                          success
                                        </span>
                                      </Link>
                                    </td>
                                  ) : (
                                    <td>
                                      <Link className="link">
                                        <span class="badge badge-pill text-white font-medium badge-info ">
                                          New
                                        </span>
                                      </Link>
                                    </td>
                                  )}
                                  <td className="name ">
                                    <Link
                                      style={{ textDecoration: "none" }}
                                      to={`/dashboard/openMail/${items[0].values.id}`}
                                      state={{
                                        from: items[0].values.from,
                                        subject: items[0].values.subject,
                                        msgBody: items[0].values.msgBody,
                                        date: items[0].values.date,
                                        // inboxlength: inboxlength,
                                        read: items[0].values.read,
                                        id: items[0].values.id,
                                      }}
                                    >
                                      <span className="bg-dark text-white p-1 rounded">
                                        from-{items[0].values.from}
                                      </span>
                                      &nbsp;
                                      <span className="text-dark">
                                        {items[0].values.subject}
                                      </span>
                                    </Link>
                                  </td>
                                  <td className="subject ">
                                    <Link
                                      className="text-dark"
                                      style={{ textDecoration: "none" }}
                                    >
                                      {items[0].values.msgBody}
                                    </Link>
                                  </td>
                                  <td className="time">{items.date}</td>
                                  <td>
                                    <Link
                                      className="text-dark"
                                      onClick={DeleteHandler}
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

                    {/* send */}
                    <div
                      className="tab-pane fade mt-3"
                      id="nav-profile"
                      role="tabpanel"
                      aria-labelledby="nav-profile-tab "
                    >
                      <table className="table table-hover table-mail">
                        <tbody>
                          {gettoData.map((items) => {
                            // console.log(items[0].values);
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
                                  <Link
                                    style={{ textDecoration: "none" }}
                                    to={`/dashboard/openMail/${items[0].values.id}`}
                                    state={{
                                      key: items[0].id,
                                      to: items[0].values.to,
                                      subject: items[0].values.subject,
                                      msgBody: items[0].values.msgBody,
                                      date: items[0].values.date,
                                      id: items[0].values.id,
                                      from: items[0].values.from,
                                      // inboxlength: inboxlength,
                                    }}
                                  >
                                    <span className="bg-dark text-white p-1 rounded">
                                      To-{items[0].values.to}
                                    </span>
                                    &nbsp;
                                    <span className="text-dark">
                                      {items[0].values.subject}
                                    </span>
                                  </Link>
                                </td>
                                <td className="subject ">
                                  <Link
                                    className="text-dark"
                                    style={{ textDecoration: "none" }}
                                  >
                                    {items[0].values.msgBody}
                                  </Link>
                                </td>
                                <td className="time text-dark">
                                  {items[0].values.date}
                                </td>
                                <td>
                                  <Link
                                    className="text-dark"
                                    onClick={ToDeleteHandler}
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

export default MailBoard;
