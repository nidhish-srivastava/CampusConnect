-- CreateTable
CREATE TABLE "College" (
    "id" SERIAL NOT NULL,
    "colleges" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "College_pkey" PRIMARY KEY ("id")
);
