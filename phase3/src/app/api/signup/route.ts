import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, confirm_password } = body;

    if (!email || !password || !confirm_password) {
      return NextResponse.json(
        { detail: "Email, password, and confirm_password are required" },
        { status: 400 }
      );
    }

    if (password !== confirm_password) {
      return NextResponse.json(
        { detail: "Passwords do not match" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { detail: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // Mocked response
    const data = {
      user: {
        id: "mock-user-id",
        email: email,
      },
      access_token: "mock-access-token",
    };

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { detail: "Internal server error" },
      { status: 500 }
    );
  }
}
