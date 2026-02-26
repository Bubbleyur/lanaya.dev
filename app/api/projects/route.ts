import { NextResponse } from "next/server";
import { getGithubProjects } from "@/lib/github";

export async function GET() {
  try {
    const projects = await getGithubProjects();
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}
