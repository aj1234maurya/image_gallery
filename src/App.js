import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageModal from "./ImageModal";

function App() {
  const API_URL = "https://api.unsplash.com/search/photos";
  const API_KEY = process.env.REACT_APP_API_KEY;
  const API_List = `https://api.unsplash.com/collections?&client_id=${API_KEY}`;

  const [search, setSearch] = useState("");
  const [images, setImages] = useState([]);
  const [mode, setMode] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  async function fetchData(url) {
    try {
      const result = await axios.get(url);
      const data = result.data;
      setImages(data.results || data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData(API_List);
  }, []);

  useEffect(() => {
    if (search) {
      fetchData(`${API_URL}?query=${search}&client_id=${API_KEY}`);
    } else {
      fetchData(API_List);
    }
  }, [search]);

  function handleChange(event) {
    const typing = event.target.value;
    setSearch(typing);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  function openModal(image) {
    setSelectedImage(image);
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const innerDivStyle = {
    backgroundColor: mode ? "black" : "whitesmoke",
    color: mode ? "whitesmoke" : "black",
    border: 0,
    padding: "0px",
    borderRadius: "5px",
    cursor: "pointer",
  };
  function handleToggleMode() {
    setMode(!mode);
    document.body.classList.toggle("dark-mode-button");
  }

  return (
    <>
      <header>
        <h1>Image Galery </h1>
        <button onClick={handleToggleMode}>
          {mode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>
      <div className="inputSearch">
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            name="search"
            placeholder="type here to search"
            value={search}
          />
        </form>
      </div>
      <div className="imgdiv">
        {images.map((pic) => {
          let imageUrl = "";
          if (pic.cover_photo) {
            imageUrl = pic.cover_photo.urls.thumb;
          } else {
            imageUrl = pic.urls.thumb;
          }

          let altdescription = "";
          if (pic.cover_photo) {
            altdescription = pic.cover_photo.alt_description;
          } else {
            altdescription = pic.alt_description;
          }
          return (
            <div className="innerDiv" style={innerDivStyle}>
              <img
                className="imageCard"
                key={pic.id}
                src={imageUrl}
                alt={altdescription}
                onClick={() => openModal(pic)}
              />
              <div className="left">
                <img
                  className="profile"
                  src={pic.user.profile_image.small}
                  alt="profile"
                />
                <ul className="username">
                  <li>{pic.user.name}</li>
                  <li>@{pic.user.username}</li>
                </ul>

                <div className="likes">
                  <ul>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-hand-thumbs-up"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                    </svg>
                    <p>{pic.user.total_likes}</p>
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ImageModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        image={selectedImage}
        colorMode={mode}
      />
    </>
  );
}

export default App;
