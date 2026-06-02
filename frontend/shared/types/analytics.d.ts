export {};

declare global {
  interface Window {
    lintrk?: (
      action: "track",
      data: { conversion_id: number },
    ) => void;
    _linkedin_data_partner_ids?: string[];
  }
}
