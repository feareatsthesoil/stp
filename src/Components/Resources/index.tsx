import { useAuth } from "@clerk/nextjs";
import { Button, Link, Grid } from "@mui/material";
import { Tooltip } from "@mui/material";
import { useState } from "react";
import { Element } from "react-scroll";

import css from "../../styles/Resources.module.css";
import { useResources } from "../../redux/hooks";
import { Resource } from "../../types/index";

interface ResourceItemProps {
    resource: Resource;
    userId?: string;
    showTimestamp?: boolean;
}

function ResourceItem({ resource, userId, showTimestamp }: ResourceItemProps) {
    return (

        <div key={resource.id} className={css.item}>
            <Grid container>
                {showTimestamp &&
                    <Grid item xs={12} sm={2} className={css.time}>
                        <p >
                            {new Date(resource.createdAt).toLocaleString()}
                        </p>
                    </Grid>
                }
                <Grid item xs={12} sm={2} className={css.name}>
                    <Tooltip title={resource.link} arrow>
                        <a
                            target="webapp-tab"
                            href={resource.link}
                            className={css.link}>
                            <p>{resource.name}</p>
                        </a>
                    </Tooltip>
                </Grid>
                <Grid item xs={12} sm={2}>
                    {userId === resource.userId ?
                        <div className={css.edit}>
                            <Link sx={{ color: "#000000ab !important" }} href={`/resources/${resource.id}/edit`}>Edit</Link>
                        </div>
                        : null}
                </Grid>
            </Grid>
        </div>
    );
}

export default function ResourcesList() {
    const resources = useResources();
    const { userId: authUserId } = useAuth();
    const userId = authUserId || undefined;

    const [viewOption, setViewOption] = useState<'chronological' | 'categorized'>('chronological');
    const [sortOrder, setSortOrder] = useState<'oldest' | 'newest'>('newest');
    const [globalSortOrder, setGlobalSortOrder] = useState<'Alphabetical' | 'Most Recently Added'>('Most Recently Added');

    const resourcesByCategory: Record<string, Resource[]> = {};
    resources.forEach(resource => {
        const category = resource.category ? resource.category : 'No Category';
        if (!resourcesByCategory[category]) {
            resourcesByCategory[category] = [];
        }
        resourcesByCategory[category].push(resource);
    });

    const categoryKeys = Object.keys(resourcesByCategory).sort((a, b) => {
        if (a === 'No Category') return 1;
        if (b === 'No Category') return -1;
        return a.localeCompare(b);
    });

    const handleViewOptionToggle = () => {
        setViewOption(prev => prev === 'categorized' ? 'chronological' : 'categorized');
    };

    const handleSortOrderToggle = () => {
        if (viewOption === 'chronological') {
            setSortOrder(prev => prev === 'oldest' ? 'newest' : 'oldest');
        } else {
            setGlobalSortOrder(prev => prev === 'Alphabetical' ? 'Most Recently Added' : 'Alphabetical');
        }
    };

    const getSortButtonLabel = () => {
        if (viewOption === 'chronological') {
            return sortOrder === 'oldest' ? 'Oldest First' : 'Newest First';
        } else {
            return globalSortOrder === 'Alphabetical' ? 'Alphabetical' : 'Most Recently Added';
        }
    };

    const sortResources = (resources: Resource[]) => {
        let sortedResources = [...resources];

        switch (globalSortOrder) {
            case 'Alphabetical':
                sortedResources.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'Most Recently Added':
                sortedResources.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
        }

        return sortedResources;
    };

    return (
        <>
            <Button
                sx={{
                    margin: "-89px 0 0 75px!important",
                    minWidth: 200,
                    "@media screen and (min-width: 1120px) and (max-width: 1228px)": {
                        marginTop: "-89px !important",
                    }
                }}
                className={css.button}
                onClick={handleViewOptionToggle}>
                Switch to {viewOption === 'categorized' ? 'Chronological' : 'Categorized'} View
            </Button>

            <Button
                sx={{
                    margin: "-90px 0px 0 10px!important",
                    minWidth: 150,
                    "@media screen and (min-width: 0px) and (max-width: 445px)": {
                        margin: "-40px 200px 0 0!important",
                    }
                }}
                className={css.button}
                onClick={handleSortOrderToggle}>
                {getSortButtonLabel()}
            </Button>
            {viewOption === 'categorized' ? (
                <>
                    {categoryKeys.map(category => (
                        <Element className={css.listWrapper} name={category} key={category}>
                            <h1 className={css.header}> {category}</h1>
                            {sortResources(resourcesByCategory[category]).map(resource => (
                                <ResourceItem resource={resource} userId={userId} />
                            ))}
                        </Element>
                    ))}
                </>
            ) : (
                <>
                    {resources.sort((a, b) => {
                        if (sortOrder === 'oldest') {
                            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                        } else {
                            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                        }
                    }).map(resource => (
                        <ResourceItem resource={resource} userId={userId} showTimestamp={true} />
                    ))}
                </>
            )}
        </>
    );
}