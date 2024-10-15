import { fetchDataById } from "@/app/serverAction/fetchDataById";
import { EditInfo } from "./EditInfo";

export default async function EditPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const info = await fetchDataById(Number(id));

  return <EditInfo info={info!} />;
}
