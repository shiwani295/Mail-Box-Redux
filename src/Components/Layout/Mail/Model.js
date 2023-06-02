import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { EditorState } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch } from "react-redux";
import { ToSendDataAction } from "../../Store/ModelMailSlice";

const Model = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [recipientEmail, setRecipientEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const loginemail = localStorage.getItem("email");
  const LoginUserPlainEmail = loginemail.replace(/[^a-zA-Z0-9]/g, ""); // which use login by email// from user
  const toPlanEmail = recipientEmail.replace(/[^a-zA-Z0-9]/g, ""); //to i.e. which email address you have send the mail
  // console.log(toPlanEmail);
  // console.log(LoginUserPlainEmail);
  const curDT = new Date().toLocaleString();

  const MailBoxFormHandler = (event) => {
    // console.log("HELLO TEST");
    event.preventDefault();
    if (toPlanEmail.length > 0) {
      fetch(
        `https://mailbox-57936-default-rtdb.firebaseio.com/${toPlanEmail}/inbox.json`, // jispe send kr rhi hu
        {
          method: "POST",
          body: JSON.stringify({
            id: Math.random().toString(),
            to: recipientEmail,
            from: loginemail,
            subject: subject,
            msgBody: editorState.getCurrentContent().getPlainText(),
            date: curDT,
            read: false,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      ).then((res) => {
        if (res.ok) {
          fetch(
            `https://mailbox-57936-default-rtdb.firebaseio.com/${LoginUserPlainEmail}/sendBox.json`, // jisse me login hu
            {
              method: "POST",
              body: JSON.stringify({
                id: Math.random().toString(),
                to: recipientEmail,
                from: loginemail,
                subject: subject,
                msgBody: editorState.getCurrentContent().getPlainText(),
                date: curDT,
                read: false,
              }),
            }
          ).then((res) => {
            if (res.ok) {
              setMessage("Email Sent Successfully");
              setTimeout(() => {
                setMessage("");
                // navigate("/login");
              }, 2000);
            }
          });
          setRecipientEmail("");
          setSubject("");
          setEditorState("");
        } else {
          throw new Error("something went wrong");
        }
      });
      dispatch(
        ToSendDataAction.ToSendData({
          id: Math.random().toString(),
          from: loginemail,
          to: recipientEmail,
          subject: subject,
          msgBody: editorState.getCurrentContent().getPlainText(),
          date: curDT,
          read: false,
        })
      );
    }
  };

  return (
    <div
      className="modal fade"
      id="compose-modal"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-wrapper">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-blue  ">
              <h4 className="modal-title">
                <i className="fa fa-envelope"></i> Compose New Message
              </h4>
            </div>
            <div className="text-center mt-2">
              <p>{message}</p>
            </div>
            <form onSubmit={MailBoxFormHandler}>
              <div className="modal-body">
                <div className="form-group">
                  <input
                    name="to"
                    type="email"
                    className="form-control"
                    placeholder="To"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    name="subject"
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={handleEditorChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  <i className="fa fa-times"></i> Discard
                </button>
                <button type="submit" className="btn btn-dark pull-right">
                  <i className="fa fa-envelope"></i> Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
