import "./Result.scss";
import FormUser from "../form/Form";

import Swal from "sweetalert2";
import { MdOutlineCancel } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { call_post_baocao } from "../../service/api";
import { message } from "antd";

const Result = (props) => {
  const {
    handleQuay,
    result,
    hanleOffModalButton,
    handleSetModalButton,
    setModalFinalResult,
    detail_image,
  } = props;

  const location = useLocation();

  const url = location.pathname;
  const parts = url.split("-");
  const id = parts[parts.length - 1]; // id_game

  useEffect(() => {
    if (result === "Bạn hết lượt quay !") {
      Swal.fire("Bạn hết lượt quay!");
      handleQuay(false);
      handleSetModalButton(false);  //off btn góc nhỏ
    } else modal_result();

  }, []);

  const isVietnamesePhoneNumber = (number) => {
    return /(03|05|07|08|09)+([0-9]{8})\b/.test(number);
  };

  const modal_result = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Chúc Mừng Bạn Đã Trúng Phần Quà: ",
      width: "600px",
      html: `
      <div class="ten-qua">${result} </div>
      <input placeholder="Họ và tên" id="swal-input1" class="swal2-input">
      <input placeholder="Số điện thoại" id="swal-input2" class="swal2-input" pattern="(03|05|07|08|09)[0-9]{8}">
      `,
      focusConfirm: false,
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      showCancelButton: true,
      allowOutsideClick: false,
      preConfirm: () => {
        if (
          !isVietnamesePhoneNumber(document.getElementById("swal-input2").value)
        ) {
          Swal.showValidationMessage("Số điện thoại không đúng !");
        }
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
        ];
      },
    });
    handleQuay(false);
    handleSetModalButton(false);
    if (formValues) {
      let res = await call_post_baocao(
        formValues[0],
        formValues[1],
        result,
        id
      );
      if (res && res.EC === 1) {
        Swal.fire("Đã xác nhận !");
      } else {
        message.error("Có lỗi. Hãy thử lại !");

      }
    }
  };

  return (
    <div className="modal">
      
    </div>
  );
};

export default Result;
