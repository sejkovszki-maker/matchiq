CREATE TABLE IF NOT EXISTS provider_entity_mappings (id TEXT PRIMARY KEY, provider TEXT NOT NULL, entity_type TEXT NOT NULL, external_id TEXT NOT NULL, internal_id TEXT NOT NULL, confidence INTEGER NOT NULL, review_required INTEGER NOT NULL DEFAULT 0, updated_at TEXT NOT NULL);
CREATE UNIQUE INDEX IF NOT EXISTS idx_provider_mapping_external ON provider_entity_mappings(provider, entity_type, external_id);
CREATE TABLE IF NOT EXISTS odds_history (id TEXT PRIMARY KEY, match_id TEXT NOT NULL, provider TEXT NOT NULL, bookmaker TEXT NOT NULL, market TEXT NOT NULL, selection TEXT NOT NULL, odds REAL NOT NULL, quote_kind TEXT NOT NULL, captured_at TEXT NOT NULL);
CREATE INDEX IF NOT EXISTS idx_odds_history_match_time ON odds_history(match_id, captured_at);
CREATE TABLE IF NOT EXISTS production_snapshots (id TEXT PRIMARY KEY, match_id TEXT NOT NULL, model_version TEXT NOT NULL, snapshot_type TEXT NOT NULL, payload_json TEXT NOT NULL, locked INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL);
CREATE INDEX IF NOT EXISTS idx_production_snapshots_match_time ON production_snapshots(match_id, created_at);
CREATE TABLE IF NOT EXISTS provider_health (provider TEXT PRIMARY KEY, status TEXT NOT NULL, last_success_at TEXT, last_error_at TEXT, last_error TEXT, updated_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS match_results (match_id TEXT PRIMARY KEY, home_goals INTEGER NOT NULL, away_goals INTEGER NOT NULL, closing_odds_json TEXT, evaluated_at TEXT NOT NULL);
PRAGMA optimize;
