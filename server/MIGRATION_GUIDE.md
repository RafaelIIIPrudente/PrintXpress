# MongoDB to Supabase Migration Guide

## Overview
This guide will help you migrate your PrintXpress application from MongoDB to Supabase.

## Prerequisites
1. A Supabase account and project
2. Node.js and npm installed
3. Your existing PrintXpress project

## Step 1: Set Up Supabase Project

1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Note down your project URL and anon key from Settings > API

## Step 2: Create Database Schema

1. In your Supabase dashboard, go to SQL Editor
2. Copy and paste the contents of `supabase_schema.sql`
3. Run the SQL commands to create the table and indexes

## Step 3: Configure Environment Variables

1. Create a `.env` file in your server directory:
```bash
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=5000
```

2. Replace the placeholder values with your actual Supabase credentials

## Step 4: Test the Migration

1. Start your server: `npm run dev`
2. Check the console for "Connected to Supabase database" message
3. Test the upload endpoint with a PDF file
4. Verify the file appears in your Supabase database

## Step 5: Data Migration (Optional)

If you have existing data in MongoDB that you want to migrate:

1. Export your MongoDB data to JSON
2. Create a migration script to insert data into Supabase
3. Run the migration script

## Key Changes Made

### Database Operations
- **Upload**: Now uses `supabase.from('pdf_details').insert()`
- **Get Latest**: Uses `supabase.from('pdf_details').select().order('created_at', { ascending: false }).limit(1)`
- **Get All**: Uses `supabase.from('pdf_details').select().order('created_at', { ascending: false })`

### Schema Changes
- Added `created_at` and `updated_at` timestamps
- Added automatic timestamp updates via triggers
- Added proper indexing for performance

### Security
- Row Level Security (RLS) enabled
- Policies configured for basic access

## Benefits of Supabase

1. **Real-time**: Built-in real-time subscriptions
2. **Authentication**: Built-in auth system
3. **Storage**: File storage capabilities
4. **API**: Auto-generated REST and GraphQL APIs
5. **Dashboard**: Built-in database management interface

## Troubleshooting

### Connection Issues
- Verify your Supabase URL and key are correct
- Check that your IP is not blocked by Supabase
- Ensure your project is active

### Permission Issues
- Check RLS policies in Supabase dashboard
- Verify your API key has the correct permissions

### Data Issues
- Check the table structure matches the schema
- Verify data types match expected formats

## Next Steps

1. **Real-time Features**: Implement real-time updates for file uploads
2. **Authentication**: Add user authentication using Supabase Auth
3. **File Storage**: Move file storage to Supabase Storage
4. **Performance**: Add more indexes based on your query patterns
