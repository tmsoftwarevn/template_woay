import { message } from "antd";
import "./form.scss";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import styled from "styled-components";
const FormUser = (props) => {
  const { setModalFinalResult, handleSetModalButton, handleQuay, result } =
    props;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const refName = useRef(null);
  const refPhone = useRef(null);

  const [arrApi, setArrApi] = useState([]);
  const [arrTinh, setArrTinh] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSetName = (e) => {
    setName(e.target.value);
  };
  const handleSetPhone = (e) => {
    setPhone(e.target.value);
  };
  const callAPI = () => {
    const dataBody = {
      code: "1153831028",
      name: name,
      phone: phone,
      prize: result,
      sex: "",
      address: "",
    };

    fetch("https://tmsoftware.vn/Woay/API/add.php", {
      method: "POST",
      body: JSON.stringify(dataBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result && result["message"] === "already") {
          message.error("Số điện thoại đã được dùng");
        } else if (result && result["message"] === "success") {
          setModalFinalResult(true);
          handleSetModalButton(true);
          handleQuay(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const isVietnamesePhoneNumber = (number) => {
    return /(03|05|07|08|09)+([0-9]{8})\b/.test(number);
  };
  const checkForm = () => {
    if (!name) {
      refName.current.focus();
      refName.current.style.border = "1px solid red";
    } else {
      refName.current.style.border = "none";
    }
    if (!phone) {
      refPhone.current.focus();
      refPhone.current.style.border = "1px solid red";
      return;
    } else {
      refPhone.current.style.border = "none";
    }
    if (!isVietnamesePhoneNumber(phone)) {
      message.error("Số điện thoại không đúng");
      return;
    }

    if (name && phone) {
      //callAPI();

      setModalFinalResult(true);
      handleSetModalButton(true);
      handleQuay(false);
      //localStorage.setItem("TMWheel", "OK");
    }
  };

  const customArrTinh = (arrApi) => {
    let arr = [];
    if (arrApi) {
      arrApi.map((item) => {
        arr.push({
          value: item.name,
          label: item.name,
        });
      });
      setArrTinh(arr);
    }
  };
  const customStyles = {
    control: (provided) => ({
      ...provided,
      //background: "#fff",
      //borderColor: "#9e9e9e",

      minHeight: "30px",
      height: "30px",
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: "30px",
      padding: "0 6px",
    }),

    input: (provided, state) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "30px",
    }),
  };
  return (
    <div className="form">
      <input
        placeholder="Họ và tên"
        className="field"
        ref={refName}
        onChange={(e) => {
          handleSetName(e);
        }}
      ></input>

      <input
        placeholder="Số điện thoại"
        className="field"
        ref={refPhone}
        onChange={(e) => {
          handleSetPhone(e);
        }}
      ></input>

      <div className="btn-div">
        <div className="btn-ok" onClick={checkForm}>
          Xác Nhận
        </div>
      </div>
    </div>
  );
};

export default FormUser;
