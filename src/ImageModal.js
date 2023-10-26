import React from "react";

function ImageModal({ isOpen, onClose, image, colorMode }) {
  if (!isOpen) {
    return null;
  }

  const imageUrl = image.cover_photo
    ? image.cover_photo.urls.full
    : image.urls.full;

  const altdescription = image.cover_photo
    ? image.cover_photo.alt_description
    : image.alt_description;

  const downloadUrl = image.cover_photo
    ? image.cover_photo.links.download
    : image.links.download;

  const innerDivStyle = {
    backgroundColor: colorMode ? "black" : "whitesmoke",
    color: colorMode ? "whitesmoke" : "black",
    border: 0,
    padding: "0px",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const mostInnerDiv = {
    backgroundColor: colorMode ? "black" : "whitesmoke",
    color: colorMode ? "whitesmoke" : "black",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div className="modal" style={innerDivStyle}>
      <button onClick={onClose}>Close</button>
      <img src={imageUrl} alt={altdescription} />
      <div className="modal-details" style={mostInnerDiv}>
        <h2>User Details</h2>
        <img src={image.user.profile_image.small} alt="profile" />
        <p>Name: {image.user.name}</p>
        <p>Username: {image.user.username}</p>
      </div>
    </div>
  );
}

export default ImageModal;
