import { fetchDataById } from "@/app/serverAction/fetchDataById";
import { EditInfo } from "./EditInfo";
import { PrismaClient } from "@prisma/client";

export default async function EditPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const prisma = new PrismaClient();
  const info = await fetchDataById(Number(id));

  return <EditInfo info={info!} />;
}
