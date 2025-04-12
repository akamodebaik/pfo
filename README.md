# Aka's Developer Portfolio

A professional, modern, and responsive portfolio website built with Next.js and TailwindCSS showcasing Aka's skills and projects.

## Features

- **Multi-language Support**: Switch between English and Indonesian
- **Theme Toggle**: Choose between light (futuristic blue) and dark (luxury gold) themes
- **Responsive Design**: Looks great on all devices from mobile to desktop
- **Modern UI Components**:
  - Animated loading screens
  - Welcome popup
  - Progress bar while scrolling
  - Background gradient animations
  - Framer Motion animations for smooth transitions
- **Audio Player**: Background music with full controls
- **Eye Comfort Mode**: Reduce brightness for better viewing
- **Admin Dashboard**: Secure admin area to edit all content
- **SEO Optimized**: Meta tags and structured data for better visibility
- **PWA Support**: Can be installed as a Progressive Web App
- **Dynamic Content**: All data loaded from database.json

## Deployment on Vercel

1. Clone this repository
2. Install dependencies: `npm install` or `yarn install`
3. Run development server: `npm run dev` or `yarn dev`
4. Build for production: `npm run build` or `yarn build`
5. Deploy to Vercel:
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect Next.js and apply the optimal settings
   - The site will be built and deployed

## Editing Content

All site content is stored in `database.json` in the root directory. You can edit this file in two ways:

1. **Admin Dashboard**: Login at `/admin` with the credentials in database.json
2. **Direct Editing**: Modify the database.json file directly

### Database Structure

- **profile**: Personal information like name, bio, avatar
- **social**: Social media links
- **friends**: List of friends/colleagues
- **projects**: Portfolio projects
- **updates**: Changelog/updates
- **donations**: Donation platform links
- **admin**: Admin credentials
- **stats**: Visitor statistics

## Project Structure

