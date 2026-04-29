export const pageActionsConfig = {
  
  "/dashboard": [
    {
      type: "button",
      label: "Refresh",
      action: "refresh",
    },
  ],

  "/leads": [
    {
      type: "button",
      label: "Add Lead",
      action: "addLead",
      primary: true,
    },
    {
      type: "button",
      label: "Export",
      action: "export",
    },
  ],

  "/google-meet": [
    {
      type: "button",
      label: "Connect Google",
      action: "connectGoogle",
      primary: true,
    },
    {
      type: "button",
      label: "Create Meeting",
      action: "createMeeting",
    },
  ],

  "/meetings": [
    {
      type: "button",
      label: "Schedule Meeting",
      action: "schedule",
      primary: true,
    },
  ],

  "/ads": [
    {
      type: "button",
      label: "Sync Ads",
      action: "syncAds",
      primary: true,
    },
  ],
};