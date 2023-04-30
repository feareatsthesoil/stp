import css from "./Directory.module.css"
import { groupBy } from 'lodash'
import { useState } from "react"
import { useContacts } from "../../redux/hooks"
import { useAuth } from "@clerk/nextjs"
import { TextField } from "@mui/material"
import Link from "next/link"


export default function Directory() {
  const [searchText, setSearchText] = useState("")
  const fullData = useContacts()
  const { userId } = useAuth()

  console.log({ userId })
  const data = searchText === "" ? fullData : fullData.filter((row) => {
    return row.name.toLowerCase().match(new RegExp(searchText.toLowerCase())) ||
      row.email.toLowerCase().match(new RegExp(searchText.toLowerCase())) ||
      row.category.toLowerCase().match(new RegExp(searchText.toLowerCase())) ||
      row.phone.toLowerCase().match(new RegExp(searchText.toLowerCase()))
  })
  const dataGrouped = groupBy(data, (row) => row.name.charAt(0))

  return <>
    <div className={css.search}>
      <TextField
        className={css.input}
        type="text"
        value={searchText}
        placeholder="Search"
        onChange={(e) => setSearchText(e.target.value)}
        sx={{
          "& fieldset": {
            alignSelf: "center",
            border: "1px solid black",
            borderRadius: "0",
          },
          "& input": {
            fontFamily: "Times New Roman",
            fontSize: ".9em",
            padding: "11px",
          },
          "&::placeholder ": {
            color: "#000!important",
          }
        }}
      />
    </div>
    {Object.entries(dataGrouped).map(([alphabet, _data]) => {
      return <>
        {_data.map((row, i) => {
          return (
            <>
              <div className={css.contact} >
                {i === 0 && alphabet !== "A" && <h1>{alphabet}</h1>}
                <Link href={`/directory`}>
                  <div className={css.items}>
                    <p><strong>{row.name}</strong> {row.pronouns && `- ${row.pronouns}`} - {row.category}</p>
                    <div className={css.border} />
                    <p>{row.email}</p>
                  </div>
                </Link>
                <div className={css.items}>
                  {row.twitter && <a href={`http://twitter.com/@${row.twitter}`} target="webapp-tab">Twitter</a>}
                  {row.instagram && <a href={`http://instgram.com/${row.instagram}`} target="webapp-tab">Instagram</a>}
                  {row.website && <a rel="noopener noreferrer" target="_blank" href={row.website}>Website</a>}
                  {userId === row.userId &&
                    <Link className={css.edit} href={`/directory/${row.id}/edit`}>
                      Edit
                    </Link>
                  }
                </div>
              </div></>
          )
        })}
      </>
    })}
  </>
}
