import ButtonWheel from "../btn/ButtonWheel";
import Wheel from "../lucky wheel/Wheel";
import "./LandingPage.scss";
import React, { useEffect, useRef, useState } from "react";
import InfoResult from "../info result/InfoResult";
import Result from "../result/Result";
import banner from "../../image/banner.jpg";
import anh3 from "../../image/anh3.jpg";
import { Divider } from "antd";

import { call_get_image } from "../../service/api";
import { useParams } from "react-router-dom";
const LandingPage = () => {
  const [isModal, setIsModal] = useState(false);
  const [result, setResult] = useState("");
  const refModalButton = useRef();
  const [onModalButton, setOnModalButton] = useState(false);
  const [modalFinal, setModalFinal] = useState(false);

  const params = useParams();
  const [detail_image, setDetail_image] = useState();

  const handleQuay = (check) => {
    setIsModal(check);
  };
  const handleSetModalButton = (b) => {
    setOnModalButton(b); // nhận biết khi modal được bật lên
  };

  const getResult = (r) => {
    setResult(r);
  };
  const hanleOffModalButton = () => {
    refModalButton.current.offModalButton(); // ẩn modal click button
  };
  const setModalFinalResult = (b) => {
    setModalFinal(b);
  };
  useEffect(() => {
    hanleOffModalButton();
  }, [isModal]);

  const fetch_info_image = async() =>{
    let res = await call_get_image(params.id);
    if(res && res.EC === 1){
      setDetail_image(res.data)
    }
  }
  useEffect(() =>{
    fetch_info_image();
  },[])

  return (
    <>
      <div
        className="container"
        style={
          isModal || onModalButton
            ? { pointerEvents: "none", opacity: "0.5" }
            : {}
        }
      >
        <div className="parent">
          <img src={`${process.env.REACT_APP_BACKEND_URL}/images/banner/${detail_image?.banner}`} alt="anh" className="anh_1" />
          <div>
            <Wheel detail_image={detail_image} handleQuay={handleQuay} getResult={getResult} />
          </div>
          <img src={`${process.env.REACT_APP_BACKEND_URL}/images/footer/${detail_image?.footer}`} alt="anh" className="anh_3" />
          <Divider />
          <div
            style={{ textAlign: "center", fontFamily: "Roboto" }}
            className="by"
          >
            Design Created by{" "}
            <b onClick={() => window.open("https://tmsoftware.vn/", "_blank")}>
              tmsoftware.vn
            </b>
          </div>
        </div>
      </div>

      <ButtonWheel
        handleQuay={handleQuay}
        handleSetModalButton={handleSetModalButton}
        getResult={getResult}
        ref={refModalButton}
        modalFinal={modalFinal}
        detail_image = {detail_image}
      />
      {isModal && (
        <Result
          detail_image={detail_image}
          handleQuay={handleQuay}
          result={result}
          hanleOffModalButton={hanleOffModalButton} // off modal btn
          handleSetModalButton={handleSetModalButton} // blur screen
          setModalFinalResult={setModalFinalResult}
        />
      )}
      {modalFinal && (
        <InfoResult
          result={result}
          setModalFinalResult={setModalFinalResult}
          handleSetModalButton={handleSetModalButton}
        />
      )}
    </>
  );
};
export default LandingPage;
