import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { writeFile } from "fs/promises";
import { join } from "path";

const EXCEPTION_EMAILS_FILE = join(process.cwd(), "config", "exception-emails.json");

// Helper to check if user is admin (allowed domains or specific admin emails)
function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  
  const adminEmails = ['david@thebigsmoke.com.au', 'dev@tbsdigitallabs.com.au'];
  if (adminEmails.includes(email)) return true;
  
  const adminDomains = ['@thebigsmoke.com', '@thebigsmoke.com.au', '@tbsdigitallabs.com', '@tbsdigitallabs.com.au'];
  const userDomain = email.substring(email.lastIndexOf('@'));
  return adminDomains.includes(userDomain);
}

// Read exception emails from file
async function getExceptionEmails(): Promise<string[]> {
  try {
    const data = await readFile(EXCEPTION_EMAILS_FILE, "utf-8");
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    // File doesn't exist, return default list
    return [
      'stephanie.maticevski@gmail.com',
      'zorasphone@gmail.com',
      'brearnerose22@gmail.com'
    ];
  }
}

// Write exception emails to file
async function saveExceptionEmails(emails: string[]): Promise<void> {
  // Ensure config directory exists
  const { mkdir } = await import("fs/promises");
  const configDir = join(process.cwd(), "config");
  await mkdir(configDir, { recursive: true });
  
  await writeFile(EXCEPTION_EMAILS_FILE, JSON.stringify(emails, null, 2), "utf-8");
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isAdmin(session.user.email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const emails = await getExceptionEmails();
    return NextResponse.json({ emails });
  } catch (error) {
    console.error("Error fetching exception emails:", error);
    return NextResponse.json({ error: "Failed to fetch exception emails" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isAdmin(session.user.email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { emails } = await req.json();
    
    if (!Array.isArray(emails)) {
      return NextResponse.json({ error: "emails must be an array" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    for (const email of emails) {
      if (typeof email !== 'string' || !emailRegex.test(email)) {
        return NextResponse.json({ error: `Invalid email format: ${email}` }, { status: 400 });
      }
    }

    await saveExceptionEmails(emails);
    
    // Clear the cache in the auth route so it picks up the new emails
    // Note: This is a simple approach - in production with multiple instances, 
    // you might want a more sophisticated cache invalidation strategy
    return NextResponse.json({ 
      success: true, 
      emails,
      message: "Exception emails updated. Changes will take effect within 1 minute (cache TTL)."
    });
  } catch (error) {
    console.error("Error updating exception emails:", error);
    return NextResponse.json({ error: "Failed to update exception emails" }, { status: 500 });
  }
}
