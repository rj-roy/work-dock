interface WorkspaceAboutProps {
  fullDescription: string;
}

export default function WorkspaceAbout({ fullDescription }: WorkspaceAboutProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        About this space
      </h2>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
        {fullDescription}
      </p>
    </div>
  );
}