// Helper function to validate hero data
export const isValidHero = (
  hero: unknown
): hero is { id: string; title: string; imageUrl: string; position?: number } => {
  return (
    typeof hero === "object" &&
    hero !== null &&
    "id" in hero &&
    "title" in hero &&
    "imageUrl" in hero &&
    typeof (hero as { id: unknown }).id === "string" &&
    typeof (hero as { title: unknown }).title === "string" &&
    typeof (hero as { imageUrl: unknown }).imageUrl === "string" &&
    String((hero as { title: string }).title).trim() !== "" &&
    String((hero as { imageUrl: string }).imageUrl).trim() !== ""
  );
};
