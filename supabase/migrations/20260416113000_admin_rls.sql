ALTER TABLE quickscan_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE intake_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read quickscan_submissions"
  ON quickscan_submissions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can read intake_submissions"
  ON intake_submissions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update intake_submissions status"
  ON intake_submissions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
