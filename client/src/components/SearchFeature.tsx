import { AuthId } from "@/types"
import { useState } from "react"
import { baseUrl } from "@/utils";
import { useEffect } from "react";
import { debounce } from "@/utils";

function SearchFeature() {
    const [searchResults,setSearchResults] = useState<AuthId[]>([])
  const [query, setQuery] = useState("");
  const getUsername = async () => {
    try {
      const response = await fetch(`${baseUrl}/user?username=${query}`);
      const data = await response.json();
      // console.log(data);
      setSearchResults(data);
    } catch (error) {}
  };
  
  useEffect(() => {
    let id = debounce(query,getUsername,setSearchResults)
    return () => clearInterval(id);
  }, [query]);

  return (
    <div>SearchFeature</div>
  )
}

export default SearchFeature