import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";

const Profile = () => {
  const [myPics, setMyPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");
  //console.log(state);
  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setMyPics(result.mypost);
      });
  }, []);
  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "my-instagram");
      data.append("cloud_name", "tqn");
      fetch("https://api.cloudinary.com/v1_1/tqn/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          fetch("/updatepic", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              localStorage.setItem(
                "user",
                JSON.stringify({ ...state, pic: result.pic })
              );
              dispatch({ type: "UPDATEPIC", payload: result.pic });
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image]);
  const updatePhoto = (file) => {
    setImage(file);
  };
  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "15px 0px",
          borderBottom: "1px solid grey",
        }}
      >
        <div>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "100px" }}
            src={state ? state.pic : "loading"}
          />

          <div
            className="file-field input-field"
            
          >
            <div className="btn #64b5f6 blue darken-2"
            style={{ margin: "0px 0px 10px 5px" }}>
              <span>Upload Picture</span>
              <input
                type="file"
                onChange={(e) => updatePhoto(e.target.files[0])}
              />
            </div>
            {/* <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div> */}
          </div>
        </div>

        <div>
          <h4>{state ? state.name : "loading"}</h4>
          <h5>{state ? state.email : "loading"}</h5>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "110%",
            }}
          >
            <h6>{myPics.length} posts</h6>
            <h6>{state ? state.followers.length : "0"} followers</h6>
            <h6>{state ? state.following.length : "0"} Following</h6>
          </div>
        </div>
      </div>
      <div className="gallery">
        {myPics.map((item) => {
          return (
            <img
              key={item._id}
              className="item"
              src={item.photo}
              alt={item.title}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Profile;
