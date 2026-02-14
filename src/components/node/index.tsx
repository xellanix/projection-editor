import { cn } from "@/lib/utils";
import { typeNodeToColor, typeNodeToIcon } from "@/lib/node";
import { HugeiconsIcon } from "@hugeicons/react";
import type { NodeType } from "@/types/node";

function NodeContainer({ children }: { children?: React.ReactNode }) {
    return <div className="flex h-full flex-row items-start px-4">{children}</div>;
}

interface NodeProps {
    type: NodeType;
    label?: string;
}
function Node(props: NodeProps) {
    const typeColor = typeNodeToColor(props.type);
    const typeIcon = typeNodeToIcon(props.type);

    return (
        <div
            className={cn(
                "flex w-24 shrink-0 flex-row items-center justify-start gap-1 rounded-sm border px-2 py-1 select-none md:w-32",
                typeColor,
            )}
        >
            <HugeiconsIcon icon={typeIcon} className="size-3.5 shrink-0" strokeWidth={2.25} />
            <span className="truncate text-sm">{props.label ?? "Item"}</span>
        </div>
    );
}

export { Node, NodeContainer };
