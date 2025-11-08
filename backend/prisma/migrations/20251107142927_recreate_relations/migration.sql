-- CreateTable
CREATE TABLE "Sheet" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Sheet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProblemToSheet" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProblemToSheet_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ProblemToSheet_B_index" ON "_ProblemToSheet"("B");

-- AddForeignKey
ALTER TABLE "_ProblemToSheet" ADD CONSTRAINT "_ProblemToSheet_A_fkey" FOREIGN KEY ("A") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProblemToSheet" ADD CONSTRAINT "_ProblemToSheet_B_fkey" FOREIGN KEY ("B") REFERENCES "Sheet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
