import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import Modal from "react-bootstrap/Modal";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import Feed from "../components/feed/Feed";
import Rightbar from "../components/rightbar/Rightbar";
import { fetchUser } from "../store/actions/userActions";
import { editUser } from "../store/actions/authActions";

const PF = process.env.REACT_APP_PUBLIC_FOLDER;

export const ProfileView = () => {
  const [file, setFile] = useState(null);
  const { user } = useSelector((state) => state.user);
  const { user: _user } = useSelector((state) => state.auth);
  const { username } = useParams();
  const dispatch = useDispatch();
  const own = user?._id == _user?._id;
  const [showModal, setShowModal] = useState(false);
  const [profileData, setProfileData] = useState({
    city: "",
    from: "",
    relationship: "",
    profilePicture: "",
  });

  useEffect(() => {
    setProfileData({
      city: user.city,
      from: user.from,
      relationship: user.relationship,
      profilePicture: file || user.profilePicture,
    });
  }, [user, file]);

  useEffect(() => {
    dispatch(fetchUser(null, username));
  }, [username, dispatch, _user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);

    const formData = new FormData();

    formData.append("city", profileData.city);
    formData.append("from", profileData.from);
    formData.append("relationship", profileData.relationship);
    formData.append("profilePicture", profileData.profilePicture);

    const formDataObject = {};

    for (const [key, value] of formData.entries()) {
      formDataObject[key] = value;
    }
    dispatch(editUser(formDataObject, _user._id));
  };

  const handleSelectFile = (e) => setFile(e.target.files[0]);

  return (
    <>
      <Header />
      <div className="profile">
        <Sidebar />
        <div className="profile-right">
          <div className="profile-right-top">
            <img
              src={user.coverPicture || PF + "person/noCover.jpeg"}
              alt=""
              className="profile-cover-img"
            />
            {own ? (
              <>
                <img
                  onClick={() => setShowModal(true)}
                  src={user.profilePicture || PF + "person/noAvatar.png"}
                  alt=""
                  className="profile-user-img"
                />
                <div className="edit-icon" onClick={() => setShowModal(true)}>
                  <CameraAltIcon />
                </div>
              </>
            ) : (
              <img
                src={user.profilePicture || PF + "person/noAvatar.png"}
                alt=""
                className="profile-user-img"
              />
            )}
          </div>
          <div className="profile-info">
            <h4 className="profile-info-name">{username}</h4>
            <span className="profile-info-desc">
              {user.desc || "Welcome to my page!"}
            </span>
          </div>
          <div className="profile-right-bottom">
            <Feed username={username} />
            <Rightbar user={user} own={own} setShowModal={setShowModal} />
          </div>
        </div>
      </div>

      <Modal
        size="lg"
        centered
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="modal-form">
            <div>
              <label htmlFor="img-file">
                <img
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : profileData.profilePicture || PF + "person/noAvatar.png"
                  }
                  className="profile-edit-img"
                />
              </label>
              <input
                id="img-file"
                type="file"
                name="profilePicture"
                onChange={handleSelectFile}
                multiple={false}
              />
            </div>
            <input
              onChange={(e) =>
                setProfileData({ ...profileData, city: e.target.value })
              }
              value={profileData.city}
              placeholder="City"
              className="user-input"
            />
            <input
              onChange={(e) =>
                setProfileData({ ...profileData, from: e.target.value })
              }
              value={profileData.from}
              placeholder="From"
              className="user-input"
            />
            <input
              onChange={(e) =>
                setProfileData({ ...profileData, relationship: e.target.value })
              }
              value={profileData.relationship}
              placeholder="Relationship"
              className="user-input"
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
