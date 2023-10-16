import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import axios from "../api/Axios";
import authHeader from "../services/auth.header";
import "./Chatbox.css";

const CHATBOX_LIST_URL = "/openai/chatbox/list";
const CHATBOX_MESSAGE_URL = "/openai/chatbox/message";
const CHATBOX_SEND_MESSAGE = "/openai/chatbox";

interface chatboxLst {
  code: string;
  name: string;
}

interface chatboxMsg {
  id: string;
  code: string;
  name: string;
  content: string;
}

const Chatbox = () => {
  let uuid = v4();
  const navigate = useNavigate();
  const [chatboxList, setChatboxList] = useState<Array<chatboxLst>>([]);
  const [chatboxMessage, setChatboxMessage] = useState<Array<chatboxMsg>>([]);
  const [codeChatboxList, setCodeChatboxList] = useState("");
  const [message, setMessage] = useState("");
  const [chatboxCode, setChatboxCode] = useState("");

  useEffect(() => {
    const fetchDataChatboxList = async () => {
      const response = await axios.get(CHATBOX_LIST_URL, {
        headers: authHeader(),
      });
      setChatboxList(response.data.data);
    };

    fetchDataChatboxList().catch((err) => {
      if (err.response.status == "401" || err.response.status == "412") {
        navigate("/login");
      }
    });
  }, []);

  const clickChatboxList = async (
    // e: React.MouseEvent<HTMLLIElement>,
    code: string
  ) => {
    const fetchDataChatboxMessage = async () => {
      const response = await axios.get(CHATBOX_MESSAGE_URL + "/" + code, {
        headers: authHeader(),
      });
      setChatboxMessage(response.data.data);
    };

    fetchDataChatboxMessage().catch((err) => {
      setChatboxMessage([]);
      if (err.response.status == "401" || err.response.status == "412") {
        navigate("/login");
      }
    });
    setCodeChatboxList(code);
    setChatboxCode(code);
  };

  const clickNewChatbox = async () => {
    let code = uuid;
    setChatboxList([{ code: code, name: "New Chat" }, ...chatboxList]);
    setCodeChatboxList(code);
    setChatboxMessage([]);
  };

  const handleSubmit2 = async () => {
    let id = uuid;
    setChatboxMessage([
      ...chatboxMessage,
      {
        id: id,
        code: id,
        name: "user",
        content: message,
      },
    ]);
    const postChatboxMessage = async () => {
      const response = await axios.post(
        CHATBOX_SEND_MESSAGE,
        JSON.stringify({ chatbox_code: chatboxCode, message: message }),
        {
          headers: authHeader(),
        }
      );
      return response;
    };

    postChatboxMessage()
      .then((response) => {
        setChatboxCode(response.data.data.chatbox_code);
        let id2 = uuid;
        let id3 = uuid;
        setChatboxMessage([
          ...chatboxMessage,
          {
            id: id2 + "a",
            code: response.data.data.chatbox_code,
            name: "user",
            content: message,
          },
          {
            id: id3 + "b",
            code: response.data.data.chatbox_code,
            name: response.data.data.result.role,
            content: response.data.data.result.content,
          },
        ]);
      })
      .catch((err) => {
        setChatboxMessage([]);
        if (err.response.status == "401" || err.response.status == "412") {
          navigate("/login");
        }
      });
    setMessage("");
  };

  return (
    <section>
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <div className="container">
        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="card chat-app" style={{ height: "95vh" }}>
              <div id="plist" className="people-list">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="secondary"
                        id="dropdown-profile"
                      >
                        <i className="fa fa-user"></i> Profile
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          Change Password
                        </Dropdown.Item>
                        <Dropdown.Item href="/login">Log Out</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div>
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      style={{ position: "absolute", right: 0 }}
                      onClick={clickNewChatbox}
                    >
                      New Chat
                    </button>
                  </div>
                </div>
                <ul
                  className="list-unstyled chat-list mt-2 mb-0"
                  style={{
                    overflowY: "auto",
                    height: "70vh",
                  }}
                >
                  {chatboxList.map((chatboxList) => (
                    <li
                      className={
                        codeChatboxList == chatboxList.code
                          ? "clearfix selected"
                          : "clearfix"
                      }
                      id={chatboxList.code}
                      key={chatboxList.code}
                      onClick={() => {
                        clickChatboxList(chatboxList.code);
                      }}
                    >
                      <div className="about">
                        <div className="name">
                          <a>{chatboxList.name}</a>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="chat">
                <div className="chat-header clearfix">
                  <div className="row">
                    <div className="col-lg-6">
                      <div>
                        <img src="/src/assets/primbon-ajaib-logo.png" alt="" />
                      </div>
                      <div className="chat-about">
                        <h3 className="m-b-0">Primbon Chatbox</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="chat-history"
                  style={{
                    overflow: "auto",
                    display: "flex",
                    flexDirection: "column-reverse",
                    height: "75vh",
                  }}
                >
                  <ul className="m-b-0">
                    {chatboxMessage.map((chatboxMessage) => (
                      <li
                        className="clearfix"
                        id={chatboxMessage.id}
                        key={chatboxMessage.id}
                      >
                        <div
                          className={
                            chatboxMessage.name == "user"
                              ? "message other-message float-right"
                              : "message my-message"
                          }
                          style={{ whiteSpace: "pre-line" }}
                        >
                          {chatboxMessage.content}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="chat-message clearfix">
                  <form>
                    <div className="textarea-container">
                      <div className="input-group">
                        <textarea
                          rows={2}
                          cols={90}
                          className="form-control"
                          onChange={(e) => setMessage(e.target.value)}
                          value={message}
                          placeholder="Enter text here..."
                        />
                        <button
                          onClick={handleSubmit2}
                          className="btn btn-outline-secondary"
                          type="button"
                        >
                          Button
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chatbox;
