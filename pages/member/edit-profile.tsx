import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import Input from "../../components/atoms/Input";
import SideBar from "../../components/organisms/SideBar";
import { JWTPayloadTypes, UserTypes } from "../../services/data-types";

export default function EditProfile() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    avatar: '',
  });
  const [imagePreview, setImagePreview] = useState(null);
  useEffect(() => {
    const token = Cookies.get('token');
    if(token){
      const jwtToken = atob(token);
      const payload: JWTPayloadTypes = jwtDecode(jwtToken);
      const userFromPayload: UserTypes = payload.player;
      setUser(userFromPayload);
    }
  }, []);
  const onSubmit = () => {
    console.log('Data: ', user)
  };
  return (
    <section className="edit-profile overflow-auto">
      <SideBar activeMenu="settings" />
      <main className="main-wrapper">
        <div className="ps-lg-0">
          <h2 className="text-4xl fw-bold color-palette-1 mb-30">Settings</h2>
          <div className="bg-card pt-30 ps-30 pe-30 pb-30">
            <form action="">
              <div className="photo d-flex">
                <div className="image-upload">
                  <label htmlFor="avatar">
                    {imagePreview ? (
                      <img src={`${imagePreview}`} alt="icon upload" width={90} height={90}/>
                    ) : (
                      <img src={`/img/${user.avatar}`} alt="icon upload" width={90} height={90}/>
                    )}
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={(event) => {
                      const img = event.target.files[0];
                      setImagePreview(URL.createObjectURL(img));
                      return setUser({
                        ...user,
                        avatar: img,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="pt-30">
                <Input label="Full Name" value={user.username} onChange={(event) => setUser({
                  ...user,
                  username: event.target.value,
                })}/>
              </div>
              <div className="pt-30">
                <Input label="Email Address" disabled value={user.email}/>
              </div>
              {/* <div className="pt-30">
                <Input label="Phone" />
              </div> */}
              <div className="button-group d-flex flex-column pt-50">
                <button
                  type="button"
                  className="btn btn-save fw-medium text-lg text-white rounded-pill"
                  onClick={onSubmit}
                >
                  Save My Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
}
