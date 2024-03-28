import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Managers = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({
    site: "",
    username: "",
    password: "",
  });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    let passwordsArray;
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast("Copy to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    passwordRef.current.type = "text";
    console.log(ref.current.src);
    if (ref.current.src.includes("assets/delete.png")) {
      ref.current.src = "assets/eye.png";
      passwordRef.current.type = "password";
    } else {
      passwordRef.current.type = "text";
      ref.current.src = "assets/delete.png";
    }
  };

  const savePassword = () => {
    if(form.site.length > 3 && form.username.length > 3 && form.password.length >3){

    console.log(form);
    setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    localStorage.setItem(
      "passwords",
      JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
    );
    console.log([...passwordArray, form]);
    setForm({
      site: "",
      username: "",
      password: "",
    });
    toast("Password saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    else{
      toast("Error: Password not saved")
    }
  };

  const deletePassword = (id) => {
    let c = confirm("Do you really want to delete this password ?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id != id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id != id))
      );
      toast("Password Deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const editPassword = (id) => {
    setForm(passwordArray.filter((i) => i.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id != id));

  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="px-2 md:myContainer  z-0 pt-[98px]">
        <h1 className="text-3xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own Password Manager
        </p>
        <div className="flex flex-col text-black p-3 gap-6 items-center">
          <input
            type="text"
            placeholder="Enter website URL"
            name="site"
            id="site"
            value={form.site}
            onChange={handleChange}
            className="w-full rounded-full border border-green-500 px-4 py-0.5 outline-none"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-4">
            <input
              type="text"
              placeholder="Enter Username"
              name="username"
              id="username"
              value={form.username}
              onChange={handleChange}
              className="w-full rounded-full border border-green-500 px-4 py-0.5 outline-none"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                name="password"
                id="password"
                className="w-full rounded-full border border-green-500 px-4 py-0.5 outline-none"
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  width={26}
                  className="p-1"
                  src="/assets/eye.png"
                  alt=""
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-green-400 hover:bg-green-300 px-7 py-2 rounded-full w-fit gap-2 border border-green-700"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              style={{ width: "25px", height: "25px" }}
            ></lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-xl py-2">Your Password</h2>
          {passwordArray.length === 0 && <div>No Password to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className=" py-1 border border-white text-center ">
                        <div className="flex justify-center items-center">
                          <a href={item.site} target="blank">
                            {item.site}{" "}
                          </a>
                          <div
                            className="size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-1 border border-white text-center">
                        <div className="flex justify-center items-center">
                          {item.username}
                          <div
                            className="size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-1 border border-white text-center">
                        <div className="flex justify-center items-center">
                          <span>{item.password}</span>
                          <div
                            className="size-7 cursor-pointer loardiconcopy"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-1 border border-white text-center">
                        <div className="flex justify-center items-center">
                          <span
                            className="cursor-pointer mx-1"
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/gwlusjdu.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                            ></lord-icon>
                          </span>

                          <span
                            className="cursor-pointer mx-1"
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                            ></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Managers;
