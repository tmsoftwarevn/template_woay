import { forwardRef, useImperativeHandle, useState } from "react";
import "./ButtonWheel.scss";

import Modal from "./Modal";
import anhbutton from "../../image/VongQuay-piana.png";
const ButtonWheel = forwardRef((props, ref) => {
  const [isWheel, setIsWheel] = useState(false);
  const {
    handleSetModalButton,
    getResult,
    handleQuay,
    modalFinal,
    detail_image,
  } = props;

  useImperativeHandle(ref, () => ({
    offModalButton() {
      setIsWheel(false);
    },
  }));
  const setModalWheel = () => {
    setIsWheel(true);
  };
  const resetModalWheel = () => {
    setIsWheel(false);
  };
  const handleBtn = () => {
    if (modalFinal) return;
    setModalWheel();
    handleSetModalButton(true);
  };
  return (
    <div className="btn-wheel">
      <div
        className="content"
        onClick={() => {
          handleBtn();
        }}
      >
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/images/vongquay/${detail_image?.vong_quay}`}
          alt="anh"
          className="anh-btn"
        />
      </div>
      {isWheel && (
        <>
          <div className="blur"> </div>
          <div className="modal">
            <Modal
              detail_image={detail_image}
              handleQuay={handleQuay}
              getResult={getResult}
              resetModalWheel={resetModalWheel}
              handleSetModalButton={handleSetModalButton}
            />
          </div>
        </>
      )}
    </div>
  );
});

export default ButtonWheel;
