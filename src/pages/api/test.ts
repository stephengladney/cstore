import type { NextApiRequest, NextApiResponse } from "next"
import { getCategoryNameToIdMap } from "../../lib/menu"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.send(await getCategoryNameToIdMap(6))
}
