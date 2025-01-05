import middleware from "../middleware";
import { NextResponse, NextRequest } from "next/server";
import { encrypt } from "@/app/lib/sessions";
import { cookies } from "next/headers";

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

jest.mock("next/server", () => ({
  NextResponse: {
    redirect: jest.fn().mockImplementation((url) => ({ url })),
    next: jest.fn(),
  },
}));

describe("Admin Middleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should redirect to /unauthorized if token is not set", async () => {
    const req = {
      nextUrl: {
        pathname: "/admin/signUp",
        searchParams: new URLSearchParams(),
      },
      url: "http://localhost:3000",
    } as unknown as NextRequest;

    await middleware(req);

    expect(NextResponse.redirect).toHaveBeenCalledTimes(1);
    expect(NextResponse.redirect).toHaveBeenCalledWith(
      new URL("http://localhost:3000/unauthorized")
    );
  });

  it("should redirect to /unauthorized if token is expired", async () => {
    const expiresAt = new Date(Date.now() - 1000 * 60 * 60);
    const payload = { userId: "123", isAdmin: true, expiresAt };
    const expiredToken = await encrypt(payload); // 期限切れのトークンを設定
    const req = {
      nextUrl: {
        pathname: "/admin/signUp",
        searchParams: new URLSearchParams({ token: expiredToken }),
      },
      url: "http://localhost:3000",
    } as unknown as NextRequest;

    await middleware(req);

    expect(NextResponse.redirect).toHaveBeenCalledTimes(1);
    expect(NextResponse.redirect).toHaveBeenCalledWith(
      new URL("http://localhost:3000/unauthorized")
    );
  });

  it("should allow access if token is valid and not expired", async () => {
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60);
    const payload = { userId: "123", isAdmin: true, expiresAt };
    const validToken = await encrypt(payload);
    const req = {
      nextUrl: {
        pathname: "/admin/signUp",
        searchParams: new URLSearchParams({ token: validToken }),
      },
      url: "http://localhost:3000/admin/signUp?token=" + validToken,
    } as unknown as NextRequest;

    const response = await middleware(req);
    expect(response).toEqual(NextResponse.next());
  });

  it("sould redirect to /admin/signIn if session is not set", async () => {
    const req = {
      nextUrl: {
        pathname: "/admin",
        searchParams: new URLSearchParams(),
      },

      url: "http://localhost:3000",
    } as unknown as NextRequest;

    (cookies as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(undefined),
    });

    await middleware(req);
    expect(NextResponse.redirect).toHaveBeenCalledTimes(1);
    expect(NextResponse.redirect).toHaveBeenCalledWith(
      new URL("http://localhost:3000/admin/signIn")
    );
  });

  it("should redirect to /admin/signIn if session admin is false", async () => {
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60);
    const payload = { userId: "123", isAdmin: false, expiresAt };
    const token = await encrypt(payload);
    const req = {
      nextUrl: {
        pathname: "/admin",
        searchParams: new URLSearchParams(),
      },
      url: "http://localhost:3000",
    } as unknown as NextRequest;

    (cookies as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(token),
    });

    await middleware(req);
    expect(NextResponse.redirect).toHaveBeenCalledTimes(1);
    expect(NextResponse.redirect).toHaveBeenCalledWith(
      new URL("http://localhost:3000/admin/signIn")
    );
  });

  it("should allow access if session is set and admin is true", async () => {
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60);
    const payload = { userId: "123", isAdmin: true, expiresAt };
    const token = await encrypt(payload);
    const req = {
      nextUrl: {
        pathname: "/admin",
        searchParams: new URLSearchParams(),
      },
      url: "http://localhost:3000",
    } as unknown as NextRequest;

    (cookies as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue({ value: token }),
    });
    const response = await middleware(req);
    expect(response).toEqual(NextResponse.next());
  });
});
