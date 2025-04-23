# qhack

## Database Schema

ingredients: id(int), created_at, name (text), carbon_footprint (float)
recipes: tracks id(int), created_at, name(text)
ingredients_to_recipes: id(int), created_at, amount(float), recipe(int), ingredients(foregein-key)
ingredients_home: id(int) created_at, amount(float), ingredients (forgein-key)



### Recipie Import

Bring Picnic to broader audience, by making it easy to import and share recipies.

- Sharing youtube, tiktok ... videos with recipies to import them
- Share Picnic links with recipies


### Dashboard

Making it easy to eat healthy, and make sustainable choices,
by showing nutriational values and your carbon footbprint in a dashboard.
