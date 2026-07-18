"use client";

import { useAuth } from "@clerk/nextjs";

export default function DebugPage() {
  const { getToken } = useAuth();

  async function testApi() {
    const token = await getToken();

    console.log("Token:", token);

    const response = await fetch("http://localhost:5000/debug-auth", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    console.log(data);
    // alert(JSON.stringify(data, null, 2));
  }

  return (
    <div className="p-10">
      <button
        onClick={testApi}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Test API
      </button>
    </div>
  );
}