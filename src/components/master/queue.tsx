import { IconButton } from "@/components/core/buttons";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProjectionStore } from "@/stores/projection.store";
import { Add01Icon } from "@hugeicons-pro/core-stroke-rounded";

export function MasterTabs() {
    const projections = useProjectionStore((s) => s.projections);

    return (
        <TabsList className="justify-start overflow-scroll *:px-6">
            <TabsTrigger value="master-1">Master 1</TabsTrigger>
            <TabsTrigger value="master-2">Master 2</TabsTrigger>
            {projections.map((p) => (
                <TabsTrigger key={p.id} value={p.id}>
                    {p.title}
                </TabsTrigger>
            ))}
        </TabsList>
    );
}

export function AddMasterButton() {
    const onClick = () => {
        useProjectionStore.getState().addProjection({
            title: "Sample Master",
            bg: "./__temp/videos/essentials/background_ex_1080.webm",
            transition: "fade",
            contents: [
                {
                    type: "Text",
                    content: "Text Content",
                },
            ],
        });
    };

    return (
        <IconButton
            label={"Add Queue"}
            icon={Add01Icon}
            iconStrokeWidth={2.5}
            onClick={onClick}
            accelerator={{
                key: "A",
                shift: true,
            }}
        />
    );
}
