"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Save } from "lucide-react";
import ClientPageHeader from "@/components/ClientPageHeader";
import { Container } from "@/components/Container";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [emails, setEmails] = useState<string[]>([]);
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else if (status === "authenticated") {
      // Check if user is admin
      const email = session?.user?.email;
      const isAdmin = email && (
        email === 'david@thebigsmoke.com.au' ||
        email === 'dev@tbsdigitallabs.com.au' ||
        email.endsWith('@thebigsmoke.com') ||
        email.endsWith('@thebigsmoke.com.au') ||
        email.endsWith('@tbsdigitallabs.com') ||
        email.endsWith('@tbsdigitallabs.com.au')
      );

      if (!isAdmin) {
        router.push("/");
        return;
      }

      fetchEmails();
    }
  }, [status, session, router]);

  const fetchEmails = async () => {
    try {
      const response = await fetch("/api/admin/exception-emails");
      if (response.ok) {
        const data = await response.json();
        setEmails(data.emails || []);
      } else {
        setError("Failed to load exception emails");
      }
    } catch (error) {
      console.error("Error fetching emails:", error);
      setError("Failed to load exception emails");
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmail = () => {
    if (!newEmail.trim()) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail.trim())) {
      setError("Invalid email format");
      return;
    }

    if (emails.includes(newEmail.trim())) {
      setError("Email already in list");
      return;
    }

    setEmails([...emails, newEmail.trim()]);
    setNewEmail("");
    setError(null);
  };

  const handleRemoveEmail = (index: number) => {
    setEmails(emails.filter((_, i) => i !== index));
    setError(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/admin/exception-emails", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emails }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        const data = await response.json();
        setError(data.error || "Failed to save exception emails");
      }
    } catch (error) {
      console.error("Error saving emails:", error);
      setError("Failed to save exception emails");
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-surface flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyber-cyan mx-auto mb-4" />
          <p className="text-content-secondary mono-text text-sm">LOADING...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-surface">
      <ClientPageHeader />

      <main className="pt-20 pb-8 px-4 md:px-8 lg:px-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="bg-surface-card border border-border-primary rounded-lg p-6 shadow-lg">
              <div className="mb-6">
                <h1 className="text-2xl font-heading font-bold text-content-primary mb-2">
                  Exception Emails Management
                </h1>
                <p className="text-content-secondary mono-text text-sm">
                  Manage the list of email addresses that are allowed to sign in, even if they don't match the allowed domains.
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-500/10 border border-red-300 dark:border-red-500/30 rounded text-red-700 dark:text-red-400 mono-text text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-4 p-3 bg-green-100 dark:bg-green-500/10 border border-green-300 dark:border-green-500/30 rounded text-green-700 dark:text-green-400 mono-text text-sm">
                  Exception emails saved successfully. Note: Server restart may be required for changes to take effect.
                </div>
              )}

              <div className="mb-6">
                <div className="flex gap-2 mb-4">
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => {
                      setNewEmail(e.target.value);
                      setError(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddEmail();
                      }
                    }}
                    placeholder="Enter email address"
                    className="flex-1 px-3 py-2 bg-surface-tertiary border border-cyber-cyan/30 rounded text-content-primary placeholder-content-tertiary focus:outline-none focus:border-cyber-cyan mono-text text-sm"
                  />
                  <button
                    onClick={handleAddEmail}
                    className="px-4 py-2 bg-cyber-cyan text-oxford-blue rounded hover:bg-cyber-cyan/80 transition-colors mono-label flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>

                <div className="space-y-2">
                  {emails.length === 0 ? (
                    <div className="p-4 bg-surface-tertiary border border-dashed border-border-primary rounded text-center text-content-secondary mono-text text-sm">
                      No exception emails configured
                    </div>
                  ) : (
                    emails.map((email, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-surface-tertiary border border-border-primary rounded"
                      >
                        <span className="text-content-primary mono-text text-sm">{email}</span>
                        <button
                          onClick={() => handleRemoveEmail(index)}
                          className="p-1 text-red-400 hover:text-red-300 transition-colors"
                          title="Remove email"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="btn-primary flex items-center justify-center gap-2 px-4 py-2 rounded mono-label transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-3 h-3" />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>

              <div className="mt-6 p-4 bg-surface-tertiary border border-border-primary rounded">
                <p className="text-content-secondary mono-text text-xs">
                  <strong className="text-content-primary">Note:</strong> Changes to exception emails are saved to the configuration file.
                  The authentication system will use these emails on the next request. If changes don't appear immediately,
                  a server restart may be required.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
