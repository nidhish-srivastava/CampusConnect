-- CreateTable
CREATE TABLE "Auth" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dp" TEXT NOT NULL DEFAULT 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL DEFAULT '',
    "authId" INTEGER NOT NULL,
    "email" TEXT NOT NULL DEFAULT '',
    "github" TEXT NOT NULL DEFAULT '',
    "linkedin" TEXT NOT NULL DEFAULT '',
    "leetcode" TEXT NOT NULL DEFAULT '',
    "college" TEXT NOT NULL DEFAULT '',
    "collegeLocation" TEXT NOT NULL DEFAULT '',
    "collegeCity" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserFollowers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Auth_username_key" ON "Auth"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_UserFollowers_AB_unique" ON "_UserFollowers"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFollowers_B_index" ON "_UserFollowers"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_authId_fkey" FOREIGN KEY ("authId") REFERENCES "Auth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollowers" ADD CONSTRAINT "_UserFollowers_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollowers" ADD CONSTRAINT "_UserFollowers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
