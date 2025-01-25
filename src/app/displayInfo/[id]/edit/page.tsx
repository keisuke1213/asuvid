import { fetchDataById } from "@/app/serverAction/fetchDataById";
import { EditInfo } from "./EditInfo";

export default async function EditPage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;

  const {
    id
  } = params;

  const info = await fetchDataById(Number(id));

  return <EditInfo info={info!} />;
}
