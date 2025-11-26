import { connectRedis, getRedis } from "../src/config/redis";

async function test() {
  await connectRedis();

  const client = getRedis();

  await client.set("test", "hello redis!");
  const val = await client.get("test");

  console.log("Redis value:", val);
  process.exit(0);
}

test();
