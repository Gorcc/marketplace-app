

import Filter from "../../Filter"
import {FC} from "react";

interface pageProps{
   params: {slug: string}
}






const page: FC<pageProps> = ({params}) => {
   return (
      <Filter></Filter>
   )
}

export default page;