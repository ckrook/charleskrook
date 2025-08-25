# Section Components

This directory contains modular section components for the homepage. Each section is now its own component, making the code more maintainable and reusable.

## Components

### HeroSection

- **Purpose**: Displays the main hero section with the PageHeader component
- **Props**: None
- **Location**: `HeroSection.tsx`

### SelectedWorkSection

- **Purpose**: Displays selected work projects with descriptions
- **Props**:
  - `selectedWork: Work[]` - Array of selected work projects
- **Location**: `SelectedWorkSection.tsx`

### ExperiencesSection

- **Purpose**: Displays work experiences using the ExperiencesList component
- **Props**:
  - `experiences: Experience[]` - Array of work experiences
- **Location**: `ExperiencesSection.tsx`

### BlogPostsSection

- **Purpose**: Displays blog posts using HoverImageBlogPost components
- **Props**:
  - `blogPosts: BlogPost[]` - Array of blog posts
- **Location**: `BlogPostsSection.tsx`

### SideProjectsSection

- **Purpose**: Displays side projects using CardItem components
- **Props**:
  - `sideProjects: Work[]` - Array of side projects
- **Location**: `SideProjectsSection.tsx`

## Usage

Import all section components from the index file:

```tsx
import {
  HeroSection,
  SelectedWorkSection,
  ExperiencesSection,
  BlogPostsSection,
  SideProjectsSection,
} from "./components/sections";
```

## Benefits

1. **Modularity**: Each section is self-contained and can be easily modified
2. **Reusability**: Sections can be reused on other pages if needed
3. **Maintainability**: Easier to find and update specific sections
4. **Testing**: Each section can be tested independently
5. **Cleaner main page**: The main page.tsx is now much cleaner and focused on data fetching and layout
