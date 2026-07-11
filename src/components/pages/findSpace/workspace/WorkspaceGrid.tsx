import WorkspaceCard from './WorkspaceCard';
import NoResults from './NoResults';
import FHeader from '../FHeader';
import { WorkspaceGridProps } from '@/types/workspaceType';

export default function WorkspaceGrid({
    workspaces = [],
    clearFiltersHref = '/find-space',
    category
}: WorkspaceGridProps) {

    if (workspaces.length === 0) {
        return <NoResults clearFiltersHref={clearFiltersHref} />;
    };

    return (
        <>
            <div className="mb-8">
                <FHeader category={category || "all"} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workspaces.map((workspace) => (
                    <WorkspaceCard key={workspace._id} workspace={workspace} />
                ))}
            </div>
        </>
    );
}