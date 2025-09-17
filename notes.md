# Project Notes

This file will serve as a persistent log of our development decisions and plans for future features for the "Momentum" application.

## Development Log

### URL Routing & "Maps" Page Integration
- **Decision:** The dormant UI components for the "Maps" page (located in `components/maps/`) have been officially wired up to the new `/maps` route.
- **Rationale:** Instead of archiving the unused code, we've integrated the existing high-fidelity placeholder. This aligns with the project's roadmap and prepares the ground for implementing the AI-powered planning functionality.
- **Status:** The `/maps` route now renders the placeholder page. This behavior is controlled by the `useUrlRouting` feature flag in `App.tsx`. The legacy state-based navigation to this page remains unaffected.

## Current Focus: "Maps" Page

-   **Objective:** Build out the "Maps" page, which is currently a blank placeholder.
-   **Core Functionality:** The page will feature an AI-powered project planning tool.
-   **Technology:** We will use the Gemini API to take a user's large goal or project and break it down into smaller, actionable steps.
-   **Next Steps:**
    1.  Design and implement the user interface for inputting a goal.
    2.  Integrate the Gemini API to process the user's input.
    3.  Display the generated steps to the user.