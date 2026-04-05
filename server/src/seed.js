import "dotenv/config";
import mongoose from "mongoose";
import { Official } from "./models/Official.js";
import { Issue } from "./models/Issue.js";

// ⚠️ Make sure this path exists
import { mockOfficials, mockIssues } from "../index.js";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/civicchain";

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("[seed] Connected to MongoDB");

  // ─── Officials ─────────────────────────────
  let officialsInserted = 0;
  let officialsSkipped = 0;

  for (const official of mockOfficials) {
    const existing = await Official.findOne({ _id: official.id });

    if (existing) {
      officialsSkipped++;
      continue;
    }

    const { id, ...rest } = official;

    await Official.create({
      _id: id,
      ...rest,
    });

    officialsInserted++;
  }

  console.log(
    `[seed] Officials — ${officialsInserted} inserted, ${officialsSkipped} skipped`
  );

  // ─── Issues ─────────────────────────────
  let issuesInserted = 0;
  let issuesSkipped = 0;

  for (const issue of mockIssues) {
    const existing = await Issue.findOne({ _id: issue.id });

    if (existing) {
      issuesSkipped++;
      continue;
    }

    const { id, ...rest } = issue;

    await Issue.create({
      _id: id,
      ...rest,
    });

    issuesInserted++;
  }

  console.log(
    `[seed] Issues — ${issuesInserted} inserted, ${issuesSkipped} skipped`
  );

  await mongoose.disconnect();
  console.log("[seed] Done");
}

seed().catch((err) => {
  console.error("[seed] Failed:", err);
  process.exit(1);
});