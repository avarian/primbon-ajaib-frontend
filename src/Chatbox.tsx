import "./Chatbox.css";

const Chatbox = () => {
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
                <ul
                  className="list-unstyled chat-list mt-2 mb-0"
                  style={{
                    overflowY: "auto",
                    height: "70vh",
                  }}
                >
                  <li className="clearfix">
                    <div className="about">
                      <div className="name">Tell me joke</div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="chat">
                <div className="chat-header clearfix">
                  <div className="row">
                    <div className="col-lg-6">
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
                    <li className="clearfix">
                      <div className="message other-message float-right">
                        {" "}
                        Hi Aiden, how are you? How is the project coming along?{" "}
                      </div>
                    </li>

                    <li className="clearfix">
                      <div className="message my-message">
                        Are we meeting today?
                      </div>
                    </li>
                    <li className="clearfix">
                      <div className="message my-message">
                        Are we meeting today?
                      </div>
                    </li>
                    <li className="clearfix">
                      <div className="message my-message">
                        Are we meeting today?
                      </div>
                    </li>
                    <li className="clearfix">
                      <div className="message my-message">
                        Are we meeting today?
                      </div>
                    </li>
                    <li className="clearfix">
                      <div className="message my-message">
                        Are we meeting today?
                      </div>
                    </li>
                    <li className="clearfix">
                      <div className="message my-message">
                        Project has been already finished and I have results to
                        show you.
                      </div>
                    </li>
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
                          placeholder="Enter text here..."
                        />
                        <button
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
