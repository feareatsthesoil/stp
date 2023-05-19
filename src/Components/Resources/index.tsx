import { useAuth } from "@clerk/nextjs";
import { Select, MenuItem, Link, Grid, Button, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";

import css from "../../styles/Resources.module.css";
import { useResources } from "../../redux/hooks"
import DeleteResourceButton from "./DeleteResourceButton";
import { Resource } from "../../types/index"
import { useRouter } from "next/router";
import { Link as ScrollLink, animateScroll as scroll, scrollSpy, scroller } from "react-scroll";
import { Element } from "react-scroll";

export default function ResourcesList() {
    const router = useRouter();
    const resources = useResources();
    const { userId } = useAuth();

    const [viewOption, setViewOption] = useState<'chronological' | 'categorized'>('chronological');
    const [sortOrder, setSortOrder] = useState<'oldest' | 'newest'>('newest');

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

    const initialSortTypes: Record<string, 'Alphabetical' | 'Most Recently Added'> = {};
    categoryKeys.forEach((category) => {
        initialSortTypes[category] = 'Most Recently Added';
    });

    const [sortType, setSortType] = useState(initialSortTypes);

    const handleSortChange = (category: string) => {
        setSortType(prev => ({
            ...prev,
            [category]: prev[category] === 'Alphabetical' ? 'Most Recently Added' : 'Alphabetical'
        }));
    };

    const handleViewOptionToggle = () => {
        setViewOption(prev => prev === 'categorized' ? 'chronological' : 'categorized');
    };

    const handleSortOrderToggle = () => {
        setSortOrder(prev => prev === 'oldest' ? 'newest' : 'oldest');
    };

    const sortResources = (resources: Resource[], category: string) => {
        let sortedResources = [...resources];

        switch (sortType[category]) {
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
            <Button sx={{
                margin: "-109px 0 0 75px!important",
                minWidth: 200,
                "@media screen and (min-width: 1120px) and (max-width: 1142px)": {
                    marginTop: "-110px !important"
                }
            }} className={css.button} onClick={handleViewOptionToggle}>
                Switch to {viewOption === 'categorized' ? 'Chronological' : 'Categorized'} View
            </Button>
            {viewOption === 'categorized' ? (
                categoryKeys.map(category => (
                    <Element className={css.listWrapper} name={category} key={category}>
                        <ScrollLink
                            to={category}
                            smooth={true}
                            duration={500}
                            style={{ cursor: "pointer" }}
                        >
                            <h1 className={css.header}> {category}</h1>
                        </ScrollLink>
                        {resourcesByCategory[category].length > 1 && (
                            <Button className={css.button} onClick={() => handleSortChange(category)}>
                                {sortType[category] === 'Most Recently Added' ? 'Most Recently Added' : 'Alphabetical'}
                            </Button>
                        )}
                        {sortResources(resourcesByCategory[category], category).map(resource => (
                            <div key={resource.id} className={css.item}>
                                <Grid container>
                                    <Grid className={css.name} item xs={12}>
                                        <p>{resource.name}</p>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <p>
                                            <a target="webapp-tab" href={resource.link} className={css.link}>
                                                {resource.link}
                                            </a>
                                        </p>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {userId === resource.userId ?
                                            <div className={css.edit}>
                                                <Link href={`/resources/${resource.id}/edit`}>EDIT</Link>
                                            </div>
                                            : null}
                                    </Grid>
                                </Grid>
                            </div>

                        ))}
                    </Element>
                ))
            ) :
                (<>
                    <Button sx={{
                        margin: "-110px 0px 0 10px!important",
                        minWidth: 120,
                        "@media screen and (min-width: 575px) and (max-width: 1141px)": {
                            margin: "-60px 0 0 0!important"
                        },
                        "@media screen and (min-width: 0px) and (max-width: 445px)": {
                            margin: "-60px 200px 0 0!important",
                        }
                    }} className={css.button} onClick={handleSortOrderToggle}>
                        {sortOrder === 'oldest' ? 'Oldest First' : 'Newest First'}
                    </Button>
                    {resources.sort((a, b) => {
                        if (sortOrder === 'oldest') {
                            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                        } else {
                            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                        }
                    }).map(resource => (
                        <div key={resource.id} className={css.item}>
                            <Grid container>
                                <Grid className={css.name} item xs={6} sm={3}>
                                    <p>{resource.name}</p>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <p>
                                        <a target="webapp-tab" href={resource.link} className={css.link}>
                                            {resource.link}
                                        </a>
                                    </p>
                                </Grid>
                                <Grid item xs={12} sm={6}
                                    sx={{
                                        // sm: { textAlign: 'right' } 
                                        "@media screen and (min-width: 1712px) and (max-width: 4045px)": {
                                            textAlign: "right",
                                        },
                                        "@media screen and (min-width: 600px) and (max-width: 675px)": {
                                            display: "none",
                                        }
                                    }}>
                                    <p>
                                        Created at: {new Date(resource.createdAt).toLocaleString()}
                                    </p>
                                </Grid>
                                <Grid item xs={12}>
                                    {userId === resource.userId ?
                                        <div className={css.edit}>
                                            <Link href={`/resources/${resource.id}/edit`}>EDIT</Link>
                                        </div>
                                        : null}
                                </Grid>
                            </Grid>
                        </div>
                    ))
                    } </>
                )
            }
        </>
    );
}