import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

export async function POST() {
  try {
    const { stdout, stderr } = await execPromise("node prisma/seed.js");
    return NextResponse.json({
      success: true,
      message: "Demo student data reset to pristine state.",
      output: stdout,
    });
  } catch (error) {
    console.error("Failed to reset demo data:", error);
    return NextResponse.json(
      { error: "Failed to reset demo data", details: String(error) },
      { status: 500 }
    );
  }
}
