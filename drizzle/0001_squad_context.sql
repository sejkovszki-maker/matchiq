CREATE TABLE IF NOT EXISTS squad_context_updates (id TEXT PRIMARY KEY,match_id TEXT NOT NULL,team_id TEXT NOT NULL,payload_json TEXT NOT NULL,source TEXT NOT NULL,source_confidence REAL NOT NULL,updated_at TEXT NOT NULL,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE INDEX IF NOT EXISTS idx_squad_context_match_updated ON squad_context_updates(match_id,updated_at);
CREATE TABLE IF NOT EXISTS prediction_changes (id TEXT PRIMARY KEY,match_id TEXT NOT NULL,previous_probability REAL NOT NULL,new_probability REAL NOT NULL,change_reason TEXT NOT NULL,source TEXT NOT NULL,important INTEGER NOT NULL DEFAULT 0,updated_at TEXT NOT NULL);
CREATE INDEX IF NOT EXISTS idx_prediction_changes_match_updated ON prediction_changes(match_id,updated_at);
PRAGMA optimize;
