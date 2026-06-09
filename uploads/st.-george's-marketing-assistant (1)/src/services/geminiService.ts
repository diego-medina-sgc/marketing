/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Message, UserInfo } from "../types";

export async function getGeminiDraft(messages: Message[], user: UserInfo) {
  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages, user }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch from Gemini API");
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Gemini service error:", error);
    throw error;
  }
}
