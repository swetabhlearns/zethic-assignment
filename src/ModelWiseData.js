import React, { useState } from "react";
import Pagination from "./Pagination";

const ModelWiseData = ({ modelWiseUserData }) => {
  const [userData, setUserData] = useState({});
  const [modal, setModal] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const data = Object.keys(modelWiseUserData);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  return (
    <div className="container">
      {modal ? (
        <div className="grid-container">
          {Object.keys(modelWiseUserData)
            .slice(indexOfFirstPost, indexOfLastPost)
            .map((model, index) => (
              <div
                key={index}
                className="model-wise-data"
                onClick={() => {
                  setUserData(model);
                  setModal(!modal);
                }}
              >
                <img src="/car.jpg" alt="car" />

                {`Model: ${model}`}
              </div>
            ))}
        </div>
      ) : (
        <div className="modal-container">
          <button onClick={() => setModal(!modal)}>Close</button>
          {modelWiseUserData[userData].map((user) => (
            <div className="user">
              <h2>{user}</h2>
            </div>
          ))}
        </div>
      )}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={data.length}
        paginate={paginate}
      />
    </div>
  );
};

export default ModelWiseData;
