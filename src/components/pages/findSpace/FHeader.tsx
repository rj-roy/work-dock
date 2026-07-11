type Props = {
    category: string;
}

export default function FHeader({ category }: Props) {
    const categoryData = {
        all: {
            title: "All Spaces",
            description: "Browse every workspace available, from private offices and meeting rooms to creative studios.",
        },
        "private-office": {
            title: "Private Offices",
            description: "Fully furnished, secure private offices designed for focused work, small teams, and long-term productivity.",
        },
        "meeting-room": {
            title: "Meeting Rooms",
            description: "Professional meeting spaces equipped for client presentations, team collaborations, workshops, and video conferences.",
        },
        studio: {
            title: "Studios",
            description: "Flexible studio spaces ideal for photography, video production, podcasts, creative projects, and content creation.",
        },
    };

    const currentData = categoryData[category as keyof typeof categoryData];

    return (
        <div className="space-y-2">
            <h1 className="text-2xl font-serif font-bold text-secondary">
                {currentData.title}
            </h1>
            <p className="text-neutral text-sm dark:text-white/60 max-w-xl">
                {currentData.description}
            </p>
        </div>
    );
}