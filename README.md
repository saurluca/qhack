# qhack

## Database Schema

ingredients: id(int), created_at, name (text), carbon_footprint (float)
recipes: tracks id(int), created_at, name(text)
ingredients_to_recipes: id(int), created_at, amount(float), recipe(int), ingredients(foregein-key)
ingredients_home: id(int) created_at, amount(float), ingredients (forgein-key)

## Supabase Setup

1. Create a Supabase project at [https://supabase.com](https://supabase.com)
2. After creating a project, get your project URL and anon key from the API settings
3. Add these credentials to your `.env` file:
   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
4. Run the SQL in `supabase/setup.sql` in the SQL Editor of your Supabase project to set up the tables and permissions

## Running the Project

1. Install dependencies:
   ```
   npm install
   ```
2. Start the development server:
   ```
   npm run dev
   ```

### Recipie Import

Bring Picnic to broader audience, by making it easy to import and share recipies.

- Sharing youtube, tiktok ... videos with recipies to import them
- Share Picnic links with recipies


### Dashboard

Making it easy to eat healthy, and make sustainable choices,
by showing nutriational values and your carbon footbprint in a dashboard.
