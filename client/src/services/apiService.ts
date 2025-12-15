import { auth } from "@/lib/firebase";

export async function callSecureApi(prompt: string) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not logged in");
  }

  // ✅ THIS IS WHERE IT GOES
  const token = await user.getIdToken();

  const res = await fetch("http://localhost:8000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    throw new Error("Backend error");
  }

  return res.json();
}
