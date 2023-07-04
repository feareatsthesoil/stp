import { useAuth } from "@clerk/nextjs";
import { Button, Link, Grid, Tooltip } from "@mui/material";
import { useState } from "react";
import { Element } from "react-scroll";

import css from "../../styles/Resources.module.css";
import { useResources } from "../../redux/hooks";
import { Resource } from "../../types/index";
import { Listbox, Menu } from "@headlessui/react";

interface ResourceItemProps {
    resource: Resource;
    userId?: string;
}

function ResourceItem({ resource, userId }: ResourceItemProps) {
    return (
        <div key={resource.id} className="pb-2">
            <Grid container>
                <Grid item className="pr-2">
                    <p>
                        {new Date(resource.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'long', day: 'numeric'
                        })}:
                    </p>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Tooltip title={resource.link} arrow>
                        <a
                            target="webapp-tab"
                            href={resource.link}
                            className={`${css.link} text-blue-600 hover:text-indigo-600`}>
                            <p className="min-w-max">{resource.name}</p>
                        </a>
                    </Tooltip>
                </Grid>
                <Grid item xs={12}>
                    {userId === resource.userId ?
                        <div className={css.edit}>
                            <Link sx={{ color: "#000000ab !important" }} href={`/links/${resource.id}/edit`}>[Edit]</Link>
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

    const [viewOption, setViewOption] = useState<'Chronological' | 'Categorized'>('Chronological');

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

    const handleViewOptionChange = (option: 'Chronological' | 'Categorized') => {
        setViewOption(option);
    };

    const viewOptions = ['Chronological', 'Categorized'];

    const sortResources = (resources: Resource[]) => {
        return [...resources].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    };

    return (
        <>
            <Listbox value={viewOption} onChange={setViewOption}>
                <div className="relative mt-1">
                    <Listbox.Button className="absolute right-0 py-2 pl-3 pr-10 text-left bg-white rounded-lg cursor-pointer focus:outline-none font-sans text-xs">
                        <span className="block truncate">{viewOption}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <svg
                                className="w-5 h-5 text-gray-400"
                                viewBox="0 0 20 20"
                                fill="none"
                                stroke="currentColor">
                                <path
                                    d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                    </Listbox.Button>
                    <Listbox.Options className="absolute top-8 right-0 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none font-sans text-xs">
                        {viewOptions.map((option, optionIdx) => (
                            <Listbox.Option
                                key={optionIdx}
                                className={({ active }) =>
                                    `${active ? 'bg-[#F4F4FE] cursor-pointer' : 'text-gray-900'}
                                    cursor-default select-none relative py-2 pl-4 pr-4`
                                }
                                value={option}>
                                {({ selected, active }) => (
                                    <>
                                        <span
                                            className={`${selected ? 'font-medium' : 'font-normal'
                                                } block truncate`}>
                                            {option}
                                        </span>
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </div>
            </Listbox>
            {viewOption === 'Categorized' ? (
                <>
                    {categoryKeys.map(category => (
                        <Element className={css.listWrapper} name={category} key={category}>
                            <h1 className="pb-1 text-blue-600 underline font-bold"> {category}</h1>
                            {sortResources(resourcesByCategory[category]).map(resource => (
                                <ResourceItem resource={resource} userId={userId} />
                            ))}
                        </Element>
                    ))}
                </>
            ) : (
                <>
                    {sortResources(resources).map(resource => (
                        <ResourceItem resource={resource} userId={userId} />
                    ))}
                </>
            )}
        </>
    );
}
