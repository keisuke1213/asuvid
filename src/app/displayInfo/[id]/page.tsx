import { PrismaClient } from "@prisma/client";
import { InfoDetail } from "./InfoDetail";

const fetchData = async (id: number) => {
  const prisma = new PrismaClient();
  try {
    const data = await prisma.info.findUnique({
      where: {
        id,
      },
      include: {
        dates: true,
      },
    });
    return data;
  } catch (error: any) {
    console.error("Error:", error.message);
  } finally {
    await prisma.$disconnect();
  }
};

export default async function InfoDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const info = await fetchData(Number(id));
  if (!info) {
    return <div>データがありません</div>;
  }

  return (
    <>
      <InfoDetail info={info} />
    </>
  );
}
