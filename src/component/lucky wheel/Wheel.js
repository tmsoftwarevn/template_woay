import { useRef, useState } from "react";
import anh2 from "../../image/anh2.jpg";

import muiten from "../../image/mui ten.png";
import vongquay from "../../image/VongQuay-piana.png";
import quayngay from "../../image/nutquay.png";
import "./Wheel.scss";
const Wheel = (props) => {
  const { handleQuay, getResult, detail_image, listPhanqua } = props;
  const [isSpinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const wheelRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  // const values = [
  //   { name: "Voucher 20%", tile: 9 },
  //   { name: "Vớ tập", tile: 20 },
  //   { name: "Khăn tập", tile: 20 },
  //   { name: "Bộ đồ tập Yoga", tile: 20 },
  //   { name: "Áo thun", tile: 20 },
  //   { name: "Combo Khăn, Vớ, Áo", tile: 20 },
  // ];
  const sliceSize = 360 / 6; // listqua .length
  const spinWheel = () => {
    if (isSpinning) return;
    const cookieValue = localStorage.getItem("TMWheel");

    if (cookieValue === null) {
      setSpinning(true);
      const fullRots = 6;
      const targetAngle = 300 * fullRots;

      const expanded = listPhanqua.flatMap((user) =>
        Array(user.tile).fill(user)
      ); // chuyển arr => 100 p tử
      let indexRandom = Math.floor(Math.random() * expanded.length); // arr
      const winner = expanded[indexRandom]; // get quà

      let findIndexGift = listPhanqua.findIndex(
        (item) => item.name === winner.name
      );
      getResult(listPhanqua[findIndexGift].name);

      //console.log("index gift is: ", findIndexGift);
      //console.log("winner number: " + JSON.stringify(winner));

      let initialRotation = 360;
      wheelRef.current.style.transition = "none";
      wheelRef.current.style.transform = `rotate(${initialRotation}deg)`;

      const randomAngle =
        Math.random() *
          ((findIndexGift + 1) * sliceSize - findIndexGift * sliceSize + 1) +
        findIndexGift * sliceSize; // cố định vòng quay, ko random

      setTimeout(() => {
        wheelRef.current.style.transition = "all ease-out 4s";
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
      <div className="g-container">
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/images/anh_nen/${detail_image?.anh_nen}`}
          alt="anh_nen"
          className="anh_nen"
        />

        <div className="vongquay-group">
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/images/vongquay/${detail_image?.mui_ten}`}
            className="arrow"
          />
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/images/vongquay/${detail_image?.vong_quay}`}
            ref={wheelRef}
            className="anh_vongquay"
          />
          <div className="btXoay" onClick={() => spinWheel()}>
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/images/vongquay/${detail_image?.nut_quay}`}
              className="anh_btn-quay"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Wheel;
