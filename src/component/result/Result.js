import "./Result.scss";
import FormUser from "../form/Form";

import Swal from "sweetalert2";
import { MdOutlineCancel } from "react-icons/md";
import { useEffect, useRef } from "react";

const Result = (props) => {
  const {
    handleQuay,
    result,
    hanleOffModalButton,
    handleSetModalButton,
    setModalFinalResult,
    detail_image,
  } = props;

  useEffect(() => {
    Swal.fire({
      title: "Chúc mừng bạn đã trúng phần quà",
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      showCancelButton: true,
      allowOutsideClick: false,

      html: `
      <p class="ten-qua">animate__animated
      animate__fadeOutDown
      animate__faster </p>
      
    <input class="swal2-input" id="name" type="text" placeholder="Họ và tên" />
    <input class="swal2-input" id="phone" type="text" placeholder="Số điện thoại" />
  `,
    }).then(function (isConfirm) {
      if (isConfirm) {
        // call api
        handleQuay(false);
      };
    });
  }, []);

  return (
    <div className="modal">
      {result === "Bạn hết lượt quay !" && (
        <>
          <div className="hetluot">
            <p>Bạn hết lượt quay !</p>
          </div>
          <p
            className="trangchu"
            onClick={() =>
              window.open("https://www.facebook.com/piana.vn", "_blank")
            }
          >
            Đến trang chủ
          </p>
        </>
      )}
    </div>
  );
};

export default Result;
