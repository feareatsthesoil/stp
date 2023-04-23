import index from "./Directory.module.css"
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
    <div className={index.search}>
      <input
        className={index.input}
        type="text"
        value={searchText}
        placeholder="Search"
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>

    {Object.entries(dataGrouped).map(([alphabet, _data]) => {

      return <>

        {_data.map((row, i) => {
          return (
            <>
              <div className={index.contact} >
                {i === 0 && alphabet !== "A" && <h1>{alphabet}</h1>}
                <div className={index.items}>
                  <p><strong>{row.name}</strong> - {row.category}</p>
                  <div className={index.border} />
                  <p>{row.email}</p>
                </div>
                <div className={index.items}>
                  {row.twitter && <a href={`http://twitter.com/@${row.twitter}`}>Twitter</a>}
                  {row.instagram && <a href={`http://instgram.com/${row.instagram}`}>Instagram</a>}
                  
                 {row.website && <a rel="noopener noreferrer" target="_blank" href={row.website}>Website</a>}
                  <div className={index.spacer} />
                  {/* <p>{row.phone}</p> */}
                </div>
              </div></>
          )
        })}
      </>
    })}
  </>
}
