ALTER TABLE raid_plans ADD COLUMN IF NOT EXISTS participants JSONB DEFAULT '[]'::jsonb;
