-- Create the pdf_details table
CREATE TABLE IF NOT EXISTS pdf_details (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    pdf TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on created_at for better performance on sorting
CREATE INDEX IF NOT EXISTS idx_pdf_details_created_at ON pdf_details(created_at);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_pdf_details_updated_at 
    BEFORE UPDATE ON pdf_details 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE pdf_details ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (you can customize this based on your needs)
CREATE POLICY "Allow all operations on pdf_details" ON pdf_details
    FOR ALL USING (true)
    WITH CHECK (true);
