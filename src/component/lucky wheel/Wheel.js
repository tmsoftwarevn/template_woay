import { useRef, useState } from "react";
import anh2 from "../../image/anh2.jpg";

import muiten from "../../image/mui ten.png";
import vongquay from "../../image/VongQuay-piana.png";
import quayngay from "../../image/nutquay.png";
import "./Wheel.scss";
const Wheel = (props) => {
  const { handleQuay, getResult ,detail_image} = props;
  const [isSpinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const wheelRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const values = [
    { gift: "Voucher 20%", pct: 90 },
    { gift: "Vớ tập", pct: 2 },
    { gift: "Khăn tập", pct: 2 },
    { gift: "Bộ đồ tập Yoga", pct: 2 },
    { gift: "Áo thun", pct: 2 },
    { gift: "Combo Khăn, Vớ, Áo", pct: 2 },
  ];
  const sliceSize = 360 / 6;
  const spinWheel = () => {
    if (isSpinning) return;
    const cookieValue = localStorage.getItem("TMWheel");

    if (cookieValue === null) {
      setSpinning(true);
      const fullRots = 6;
      const targetAngle = 300 * fullRots;
      const expanded = values.flatMap((user) => Array(user.pct).fill(user));
      let indexRandom = Math.floor(Math.random() * expanded.length); // arr
      const winner = expanded[indexRandom]; // get element
      let findIndexGift = values.findIndex((item) => item.gift === winner.gift);
      getResult(values[findIndexGift].gift);
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
      handleQuay(true);
      getResult("Bạn hết lượt quay !");
    }
  };

  return (
    <>
      <div className="vongquay-container">
        <img src={`${process.env.REACT_APP_BACKEND_URL}/images/anh_nen/${detail_image?.anh_nen}`} alt="anh" className="anh_2" />

        <div className="vongquay">
          <img src={`${process.env.REACT_APP_BACKEND_URL}/images/vongquay/${detail_image?.mui_ten}`} alt="vong quay" className="arrow" />
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/images/vongquay/${detail_image?.vong_quay}`}
            alt="vong quay"
            ref={wheelRef}
            className="anh_vongquay"
          />
          <div className="btXoay" onClick={() => spinWheel()}>
            <img src={`${process.env.REACT_APP_BACKEND_URL}/images/vongquay/${detail_image?.nut_quay}`} alt="btn-quay" className="anh_btn-quay" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Wheel;
