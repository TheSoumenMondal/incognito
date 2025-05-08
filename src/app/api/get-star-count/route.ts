import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  const githubRepoLink = process.env.NEXT_PUBLIC_GITHUB_URL!;
  const response = await axios.get(githubRepoLink, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
    },
  });
  return NextResponse.json(response.data);
}
