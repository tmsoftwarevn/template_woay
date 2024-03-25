import "./finalResult.scss";
import { MdOutlineCancel } from "react-icons/md";
const InfoResult = (props) => {
  const { result, setModalFinalResult, handleSetModalButton } = props;
  return (
    <div className="final">
      <div className="blur"></div>
      <div className="content">
        <div className="group">
          <p className="a">cảm ơn bạn đã xác nhận thông tin !</p>
          <p style={{ marginTop: "10px" }}>
            Đây là phần quà của bạn: <span>{result}</span>
          </p>
          <p style={{ marginTop: "20px" }}>
            Chúc bạn có những giây phút vui vẻ tại Piana Yoga!
          </p>
          <div
            className="btn-off"
            onClick={() => {
              setModalFinalResult(false);
              handleSetModalButton(false);
            }}
          >
            <MdOutlineCancel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoResult;
// tat modal
