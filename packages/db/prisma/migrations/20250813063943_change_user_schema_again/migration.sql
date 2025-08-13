-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "friendList" JSONB NOT NULL DEFAULT '[]';
