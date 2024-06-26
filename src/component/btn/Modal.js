import { useEffect, useRef, useState } from "react";
import anh2 from "../../image/anh2.jpg";
import vongquay from "../../image/VongQuay-piana.png";
import "./Modal.scss";
import { MdOutlineCancel } from "react-icons/md";
import quayngay from "../../image/nutquay.png";
import muiten from "../../image/mui ten.png";
const Modal = (props) => {
  const {
    handleQuay,
    getResult,
    resetModalWheel,
    handleSetModalButton,
    detail_image,
    listPhanqua
  } = props;

  const [isSpinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [valueNoiDung, setValueNoiDung] = useState("");
  const wheelRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenThongBao, setIsThongBao] = useState(false);
  const refOutside = useRef(null);

  // const values = [
  //   { gift: "Voucher 20%", pct: 90 },
  //   { gift: "Vớ tập", pct: 2 },
  //   { gift: "Khăn tập", pct: 2 },
  //   { gift: "Bộ đồ tập Yoga", pct: 2 },
  //   { gift: "Áo thun", pct: 2 },
  //   { gift: "Combo Khăn, Vớ, Áo", pct: 2 },
  // ];
  const sliceSize = 360 / 6;
  const spinWheel = () => {
    if (isSpinning) return;
    const cookieValue = localStorage.getItem("TMWheel");

    if (cookieValue === null) {
      setSpinning(true);
      const fullRots = 6;
      const targetAngle = 300 * fullRots;
      const expanded = listPhanqua.flatMap((user) => Array(user.tile).fill(user));
      let indexRandom = Math.floor(Math.random() * expanded.length); // arr
      const winner = expanded[indexRandom]; // get element
      let findIndexGift = listPhanqua.findIndex((item) => item.name === winner.name);
      getResult(listPhanqua[findIndexGift].name);

      //console.log("index gift is: ", findIndexGift);
      //console.log("winner number: " + JSON.stringify(winner));

      let initialRotation = 360;
      wheelRef.current.style.transition = "none";
      wheelRef.current.style.transform = `rotate(${initialRotation}deg)`;

      const randomAngle =
        Math.random() *
          ((findIndexGift + 1) * sliceSize - findIndexGift * sliceSize + 1) +
        findIndexGift * sliceSize;

      setTimeout(() => {
        wheelRef.current.style.transition = "all ease-out 5s";
        wheelRef.current.style.transform = `rotate(${
          randomAngle + targetAngle
        }deg)`;

        setTimeout(() => {
          setIsOpen(true);
          setSpinning(false);
          handleQuay(true);
          //localStorage.setItem("TMWheel", "OK");
        }, 6000);
      }, 0);
    } else {
      handleQuay(true); // nhận biết để làm mờ màn hình
      getResult("Bạn hết lượt quay !");
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  }, []);
  const handleClickOutside = (e) => {
    if (
      refOutside &&
      refOutside.current &&
      !refOutside.current.contains(e.target)
    ) {
      resetModalWheel();
      handleSetModalButton(false);
    }
  };

  return (
    <>
      <div className="modal-quay" ref={refOutside}>
        <div className="vongquay-btn">
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/images/vongquay/${detail_image?.mui_ten}`}
            alt="anh"
            className="arrow-modal"
          />
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/images/vongquay/${detail_image?.vong_quay}`}
            alt="vong quay"
            ref={wheelRef}
            className="vongquay-modal"
          />

          <div className="btXoay" onClick={() => spinWheel()}>
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/images/vongquay/${detail_image?.nut_quay}`}
              alt="btn-quay"
              className="anh_btn-quay"
            />
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Modal;
