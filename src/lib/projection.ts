import type { ProjectionItem } from "@/types";

export function createItemName(c: ProjectionItem) {
    return c.name || (c.type !== "Component" && c.content) || "Untitled";
}
