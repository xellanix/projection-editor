import { Node, NodeContainer } from "@/components/node";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { TabsContent } from "@/components/ui/tabs";
import { projectionToNode } from "@/lib/node";
import { createItemName } from "@/lib/projection";
import { useProjectionStore } from "@/stores/projection.store";

export function MasterContents() {
    const projections = useProjectionStore((s) => s.projections);

    return (
        <>
            <MasterContent id="master-1">
                <Node type="text" />
                <Node type="image" />
                <Node type="video" />
            </MasterContent>
            <MasterContent id="master-2">Master 2 content</MasterContent>
            {projections.map((p) => (
                <MasterContent key={p.id} id={p.id}>
                    {p.contents.map((c, i) => (
                        <Node key={i} type={projectionToNode(c.type)} label={createItemName(c)} />
                    ))}
                </MasterContent>
            ))}
        </>
    );
}

interface MasterContentProps {
    id: string;
    children?: React.ReactNode;
}
function MasterContent({ id, children }: MasterContentProps) {
    return (
        <TabsContent value={id}>
            <ResizablePanelGroup
                orientation="vertical"
                className="h-full w-auto overflow-x-scroll! *:max-w-none! *:overflow-visible! *:data-[slot=resizable-panel]:w-fit!"
            >
                <ResizablePanel
                    defaultSize="10rem"
                    minSize="5rem"
                    className="Nodes-start flex max-w-none! flex-col gap-2 py-2"
                >
                    <span className="text-muted-foreground sticky left-0 px-4 text-xs">
                        Content
                    </span>
                    <NodeContainer>{children}</NodeContainer>
                </ResizablePanel>
                <ResizableHandle className="sticky left-0 h-px!" />
                <ResizablePanel
                    defaultSize="5rem"
                    minSize="5rem"
                    className="Nodes-start flex max-w-none! flex-col gap-2 py-2"
                >
                    <span className="text-muted-foreground sticky left-0 px-4 text-xs">
                        Background
                    </span>
                    <NodeContainer>
                        <Node type="background" />
                        <Node type="background" />
                        <Node type="background" />
                    </NodeContainer>
                </ResizablePanel>
                <ResizableHandle className="sticky left-0 h-px!" />
                <ResizablePanel
                    defaultSize="5rem"
                    minSize="5rem"
                    className="Nodes-start flex max-w-none! flex-col gap-2 py-2"
                >
                    <span className="text-muted-foreground sticky left-0 px-4 text-xs">
                        Transition
                    </span>
                    <NodeContainer>
                        <Node type="transition" />
                        <Node type="transition" />
                        <Node type="transition" />
                    </NodeContainer>
                </ResizablePanel>
            </ResizablePanelGroup>
        </TabsContent>
    );
}
