import { useAuth } from "@clerk/nextjs";
import { Listbox } from "@headlessui/react";
import { Grid, Link, Tooltip } from "@mui/material";
import { useState } from "react";
import { Element } from "react-scroll";
import { useResources } from "../../redux/hooks";
import { Resource } from "../../types/index";

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
            {new Date(resource.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            :
          </p>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Tooltip title={resource.link} arrow>
            <a
              target="webapp-tab"
              href={resource.link}
              className="text-blue-600 hover:text-indigo-600"
            >
              <p className="min-w-max">{resource.name}</p>
            </a>
          </Tooltip>
        </Grid>
        <Grid item xs={12}>
          {userId === resource.userId ? (
            <div style={{ color: "#000" }}>
              <Link
                sx={{
                  textDecoration: "none",
                  color: "#000 !important",
                  "&:hover": { textDecoration: "underline #000" },
                }}
                href={`/links/${resource.id}/edit`}
              >
                [Edit]
              </Link>
            </div>
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
}

export default function ResourcesList() {
  const resources = useResources();
  const { userId: authUserId } = useAuth();
  const userId = authUserId || undefined;

  const [viewOption, setViewOption] = useState<"Chronological" | "Categorized">(
    "Chronological"
  );

  const resourcesByCategory: Record<string, Resource[]> = {};
  resources.forEach((resource) => {
    const category = resource.category ? resource.category : "No Category";
    if (!resourcesByCategory[category]) {
      resourcesByCategory[category] = [];
    }
    resourcesByCategory[category].push(resource);
  });

  const categoryKeys = Object.keys(resourcesByCategory).sort((a, b) => {
    if (a === "No Category") return 1;
    if (b === "No Category") return -1;
    return a.localeCompare(b);
  });

  const handleViewOptionChange = (option: "Chronological" | "Categorized") => {
    setViewOption(option);
  };

  const viewOptions = ["Chronological", "Categorized"];

  const sortResources = (resources: Resource[]) => {
    return [...resources].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  };

  return (
    <>
      <Listbox value={viewOption} onChange={setViewOption}>
        <div className="relative mt-1">
          <Listbox.Button className="absolute right-0 cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left font-sans text-xs focus:outline-none">
            <span className="block truncate">{viewOption}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute right-0 top-8 mt-1 max-h-60 overflow-auto rounded-md bg-white font-sans text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {viewOptions.map((option, optionIdx) => (
              <Listbox.Option
                key={optionIdx}
                className={({ active }) =>
                  `${active ? "cursor-pointer bg-[#F4F4FE]" : "text-gray-900"}
                                    relative cursor-default select-none py-2 pl-4 pr-4`
                }
                value={option}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`${
                        selected ? "font-medium" : "font-normal"
                      } block truncate`}
                    >
                      {option}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
      {viewOption === "Categorized" ? (
        <>
          {categoryKeys.map((category) => (
            <Element className="pb-4" name={category} key={category}>
              <h1 className="pb-1 font-bold text-blue-600 underline">
                {" "}
                {category}
              </h1>
              {sortResources(resourcesByCategory[category]).map((resource) => (
                <ResourceItem resource={resource} userId={userId} />
              ))}
            </Element>
          ))}
        </>
      ) : (
        <>
          {sortResources(resources).map((resource) => (
            <ResourceItem resource={resource} userId={userId} />
          ))}
        </>
      )}
    </>
  );
}
