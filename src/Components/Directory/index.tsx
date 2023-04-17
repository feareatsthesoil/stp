import Link from "next/link"
import directory from "./Directory.module.css"
import { groupBy } from 'lodash'
import { useState } from "react"
import { useContacts } from "../../redux/hooks"

export default function Directory() {
  const [searchText, setSearchText] = useState("")
  const fullData = useContacts()

  const data = searchText === "" ? fullData : fullData.filter((row) => {
    return row.name.toLowerCase().match(new RegExp(searchText.toLowerCase())) ||
      row.email.toLowerCase().match(new RegExp(searchText.toLowerCase())) ||
      row.category.toLowerCase().match(new RegExp(searchText.toLowerCase())) ||
      row.phone.toLowerCase().match(new RegExp(searchText.toLowerCase()))
  })
  const dataGrouped = groupBy(data, (row) => row.name.charAt(0))

  return <>
    <div className={directory.search}>
      <input
        className={directory.input}
        type="text"
        value={searchText}
        placeholder="Search"
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>

    {Object.entries(dataGrouped).map(([alphabet, _data]) => {

      return <>

        {_data.map((row, index) => {
          return (
            <>
              <div className={directory.contact} >
                {index === 0 && alphabet !== "A" && <h1>{alphabet}</h1>}
                <div className={directory.items}>
                  <p><strong>{row.name}</strong> - {row.category}</p>
                  <div className={directory.border} />
                  <p>{row.email}</p>
                </div>
                <div className={directory.items}>
                  {row.twitter && <a href={`http://twitter.com/@${row.twitter}`}>Twitter</a>}
                  {row.instagram && <a href={`http://instgram.com/${row.instagram}`}>Instagram</a>}
                 {row.website && <a rel="noopener noreferrer"  href={row.website}>Website</a>}
                  <div className={directory.spacer} />
                  <p>{row.phone}</p>
                </div>
              </div></>
          )
        })}
      </>
    })}
  </>
}
