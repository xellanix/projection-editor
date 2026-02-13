import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Viewer } from "@/components/viewer";
import { GlobalKeyboardProvider } from "@/context/GlobalKeyboardContext";
import { Editor } from "@/components/editor";

export default function App() {
    return (
        <ResizablePanelGroup orientation="vertical" className="size-full">
            <ResizablePanel defaultSize="55%" className="bg-sidebar-accent relative">
                <Viewer currentIndex={0} currentProjection={0} />
            </ResizablePanel>
            <ResizableHandle
                withHandle
                className="bg-sidebar-accent *:bg-sidebar-accent focus-visible:ring-0"
            />
            <GlobalKeyboardProvider>
                <TooltipProvider>
                    <ResizablePanel defaultSize="45%" className="flex flex-col gap-2 py-2">
                        <Editor />
                    </ResizablePanel>
                </TooltipProvider>
            </GlobalKeyboardProvider>
        </ResizablePanelGroup>
    );
}
