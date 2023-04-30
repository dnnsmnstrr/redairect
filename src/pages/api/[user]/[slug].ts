import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db/client";

const UserUrlApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user, slug } = req.query;
  console.log(user, slug);

  if (!slug || typeof slug !== "string") {
    return res.status(400).json({
      error: "[X] Error: Missing slug? Remember that urls start like this: /u/yourLink",
    });
  }

  const userData = await prisma.user.findFirst({
    where: {
      username: {
        equals: user,
      },
    },
  });

  if (!userData) {
    return res.status(404).json({
      error: "[X] Error: User not found or removed.",
    });
  }

  const data = await prisma.link.findFirst({
    where: {
      OR: [
        {
          slug: {
            equals: slug,
          }
        },
        {
          aliases: {
            contains: slug,
          }
        }
      ],
      creatorId: {
        equals: userData?.id,
      }
    },
  });

  if (!data) {
    return res.status(404).json({
      error: "[X] Error: Link not found or removed. Go to slug.vercel.app and create a new link.",
    });
  }

  // Cache:
  res.setHeader("Cache-Control", "s-maxage=1000000, stale-while-revalidate");

  return res.json(data);
};

export default UserUrlApi;