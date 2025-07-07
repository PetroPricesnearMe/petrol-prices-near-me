import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "https://my-app.com/plasmic-host",     // Get this from Plasmic Studio URL
      token: "R0TycBUJoQyjc8t9i5Kh9Bx9n3gR9jYOAp31WO8RmBkDm4zgcrnHNl2wsbYuXAMzv55ouVWjOklW0K8vtbPA" // Get this from the "Code" button in Plasmic Studio
    }
  ],
  preview: true, // Set to false for production
});
