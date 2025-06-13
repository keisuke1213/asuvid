-- CreateTable
CREATE TABLE "DeliveryHistory" (
    "id" SERIAL NOT NULL,
    "deliveryDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeliveryHistory_pkey" PRIMARY KEY ("id")
);
