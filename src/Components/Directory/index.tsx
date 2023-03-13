import { DirectoryRow } from "../../types"
import Link from "next/link"
import directory from "./Directory.module.css"
import { groupBy } from 'lodash'

export default function Directory({ data }: { data: DirectoryRow[] }) {
  const dataGrouped = groupBy(data, (row) => row.name.charAt(0))

  return <>
    {Object.entries(dataGrouped).map(([alphabet, _data]) => {

      return <>
        {_data.map((row, index) => {

          return (
            <>
              <div className={directory.contact} >
                {index === 0 && alphabet !== "A" && <h1>{alphabet}</h1>}
                <div className={directory.title}>
                  <div className={directory.name}>
                    <strong>{row.name}</strong> - {row.category}
                  </div>
                  <div className={directory.border}>
                  </div>
                  <div className={directory.email}>
                    {row.email}
                  </div>
                </div>
                <div className={directory.title}>
                  <div className={directory.name}>
                    <div className={directory.linksStack}>
                    <p><Link href="#">Twitter</Link></p>
                      <p><Link href="#">Instagram</Link></p>
                      <p><Link href="#">Website</Link></p>
                    </div>
                  </div>
                  <div className={directory.spacer}>
                  </div>
                  <div className={directory.email}>
                    {row.phone}
                  </div>
                </div>
              </div></>
          )
        })}</>

    })}
  </>
}
