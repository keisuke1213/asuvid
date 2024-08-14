import { DisplayInfo } from "../../displayInfo";
import { Header } from "../../../ui/header";
import EditModal from "../../modal/editModal";

const Edit = () => {
  return (
    <>
      <Header />
      <DisplayInfo  />
      <EditModal open />
    </>
  );
};

export default Edit;
