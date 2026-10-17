import { neon } from '@neondatabase/serverless';
import { UserProgress } from '../types';

const NEON_DB_URL =
  (import.meta as any).env?.VITE_NEON_DATABASE_URL ||
  'postgresql://neondb_owner:npg_sFzK4eC5PJGj@ep-long-sea-b4nbojas-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require';

let sqlClient: ReturnType<typeof neon> | null = null;

function getSql() {
  if (!sqlClient) {
    sqlClient = neon(NEON_DB_URL);
  }
  return sqlClient;
}

/**
 * Initializes the user_progress table in Neon DB if it does not already exist.
 */
export async function ensureNeonSchema(): Promise<boolean> {
  try {
    const sql = getSql();
    await sql`
      CREATE TABLE IF NOT EXISTS user_progress (
        username VARCHAR(255) PRIMARY KEY,
        xp INT DEFAULT 0,
        streak INT DEFAULT 1,
        completed_modules INT[] DEFAULT '{}',
        completed_beats TEXT[] DEFAULT '{}',
        unlocked_badges TEXT[] DEFAULT '{}',
        quiz_scores JSONB DEFAULT '{}',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;
    return true;
  } catch (err) {
    console.warn('[Neon DB] Schema check failed or offline:', err);
    return false;
  }
}

/**
 * Loads a user's progress from Neon DB.
 * If user does not exist, creates their initial record.
 */
export async function loadUserFromNeon(
  username: string,
  fallbackProgress: UserProgress
): Promise<{ progress: UserProgress; isNew: boolean } | null> {
  const cleanUsername = username.trim().toLowerCase();
  if (!cleanUsername) return null;

  try {
    const sql = getSql();
    const rows = (await sql`
      SELECT username, xp, streak, completed_modules, completed_beats, unlocked_badges, quiz_scores
      FROM user_progress
      WHERE username = ${cleanUsername}
      LIMIT 1;
    `) as any[];

    if (rows && rows.length > 0) {
      const r = rows[0];
      const loaded: UserProgress = {
        xp: Number(r.xp || 0),
        streak: Number(r.streak || 1),
        lastActiveDate: new Date().toISOString().split('T')[0],
        completedModules: Array.isArray(r.completed_modules) ? r.completed_modules : [],
        completedBeats: Array.isArray(r.completed_beats) ? r.completed_beats : [],
        unlockedBadges: Array.isArray(r.unlocked_badges) ? r.unlocked_badges : [],
        quizScores: (r.quiz_scores as Record<string, number>) || {},
      };
      return { progress: loaded, isNew: false };
    }

    // Insert new user record
    await sql`
      INSERT INTO user_progress (
        username, xp, streak, completed_modules, completed_beats, unlocked_badges, quiz_scores, updated_at
      ) VALUES (
        ${cleanUsername},
        ${fallbackProgress.xp},
        ${fallbackProgress.streak},
        ${fallbackProgress.completedModules},
        ${fallbackProgress.completedBeats},
        ${fallbackProgress.unlockedBadges},
        ${JSON.stringify(fallbackProgress.quizScores)},
        NOW()
      )
      ON CONFLICT (username) DO NOTHING;
    `;

    return { progress: fallbackProgress, isNew: true };
  } catch (err) {
    console.error('[Neon DB] Failed to load user:', err);
    return null;
  }
}

/**
 * Upserts a user's latest progress to Neon DB.
 */
export async function syncProgressToNeon(
  username: string,
  progress: UserProgress
): Promise<boolean> {
  const cleanUsername = username.trim().toLowerCase();
  if (!cleanUsername) return false;

  try {
    const sql = getSql();
    await sql`
      INSERT INTO user_progress (
        username, xp, streak, completed_modules, completed_beats, unlocked_badges, quiz_scores, updated_at
      ) VALUES (
        ${cleanUsername},
        ${progress.xp},
        ${progress.streak},
        ${progress.completedModules},
        ${progress.completedBeats},
        ${progress.unlockedBadges},
        ${JSON.stringify(progress.quizScores)},
        NOW()
      )
      ON CONFLICT (username) DO UPDATE SET
        xp = EXCLUDED.xp,
        streak = EXCLUDED.streak,
        completed_modules = EXCLUDED.completed_modules,
        completed_beats = EXCLUDED.completed_beats,
        unlocked_badges = EXCLUDED.unlocked_badges,
        quiz_scores = EXCLUDED.quiz_scores,
        updated_at = NOW();
    `;
    return true;
  } catch (err) {
    console.error('[Neon DB] Sync failed:', err);
    return false;
  }
}
