import { PrismaClient } from "@prisma/client";
import { InfoDetail } from "./InfoDetail";
import { verifyAdminSession } from "@/app/serverAction/auth";
import { unstable_cache } from "next/cache";

const fetchData = unstable_cache(
  async (id: number) => {
    const prisma = new PrismaClient();
    try {
      console.time("fetchData");
      const data = await prisma.info.findUnique({
        where: {
          id,
        },
        include: {
          dates: true,
        },
      });
      console.timeEnd("fetchData");
      return data;
    } catch (error: any) {
      console.error("Error:", error.message);
    } finally {
      await prisma.$disconnect();
    }
  },
  ["fetchData"],
  {
    revalidate: 3600,
  }
);

export default async function InfoDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;

  const { id } = params;

  const info = await fetchData(Number(id));
  const isSessionValid = await verifyAdminSession();
  if (!info) {
    return <div>データがありません</div>;
  }

  return (
    <>
      <InfoDetail info={info} isSessionValid={isSessionValid} />
    </>
  );
}
