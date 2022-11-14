import React, { useCallback } from "react";
import useModalStore from "@/store/useModalStore";
import CloseIcon from "@mui/icons-material/Close";
import TitleInput from "./TitleInput/TitleInput";

const WriteModal = (): JSX.Element => {
  const { isOpened, closeModal } = useModalStore((state) => ({
    isOpened: state.isWritingModalOpened,
    closeModal: state.closeWritingModal,
  }));

  const clickCloseBtn = useCallback(() => {
    closeModal();
  }, []);

  return (
    <div className={isOpened ? "modal open" : "modal close"}>
      <button onClick={clickCloseBtn} className={"modal__close"}>
        <CloseIcon className={"modal__close__icon"} />
      </button>
      {/* <SnapShotNav /> */}
      <form>
        <TitleInput />
        {/* <Editor /> */}
      </form>
    </div>
  );
};

export default WriteModal;