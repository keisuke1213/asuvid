-- CreateTable
CREATE TABLE "Info" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "formUrl" TEXT NOT NULL,

    CONSTRAINT "Info_pkey" PRIMARY KEY ("id")
);
