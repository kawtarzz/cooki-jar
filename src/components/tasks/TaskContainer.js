import { useState } from "react"
import { TaskList } from "./TaskList.js"
import { TaskSearch } from "./TaskSearch.js"


export const TicketContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <> 
    <TicketSearch setterFunction={setSearchTerms} />
    <TicketList searchTermState={searchTerms}/>
    </>
}