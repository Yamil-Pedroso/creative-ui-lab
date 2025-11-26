import { getRedis } from "../config/redis";

export async function cacheGet(key: string) {
  const client = getRedis();
  const data = await client.get(key);
  return data ? JSON.parse(data) : null;
}

export async function cacheSet(key: string, value: any, ttlSeconds = 60) {
  const client = getRedis();
  await client.setEx(key, ttlSeconds, JSON.stringify(value));
}

export async function cacheDel(key: string) {
  const client = getRedis();
  await client.del(key);
}
