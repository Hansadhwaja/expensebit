import { headers } from "next/headers"

export async function getRequestMetadata() {
  const headerList = await headers()

  const ipAddress =
    headerList.get("x-forwarded-for")?.split(",")[0].trim() ??
    headerList.get("x-real-ip") ??
    "unknown"

  const userAgent = headerList.get("user-agent") ?? "unknown"

  return {
    ipAddress,
    userAgent,
  }
}
