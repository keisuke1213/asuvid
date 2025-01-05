import { decrypt } from "@/app/lib/sessions";
import { encrypt } from "@/app/lib/sessions";

describe("decrypt", () => {
  it("should return the payload for a valid token", async () => {
    // トークンを生成
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60);
    const payload = { userId: "123", isAdmin: true, expiresAt };
    const token = await encrypt(payload);

    // トークンをデコード
    const result = await decrypt(token);

    // 期待結果を確認
    const { iat, exp, ...resultWithoutIatExp } = result!;
    expect(resultWithoutIatExp).toEqual({
      ...payload,
      expiresAt: expiresAt.toISOString(),
    });
  });

  it("should log an error and return undefined for an invalid token", async () => {
    // 無効なトークンをデコード
    const result = await decrypt("invalid-token");

    // 期待結果を確認
    expect(result).toBeNull();
  });
});
