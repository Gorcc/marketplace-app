

import Business from "../../Business";
import {FC} from "react";

interface pageProps{
   params: {slug: string}
}






const page: FC<pageProps> = ({params}) => {
   return (
      <Business></Business>
   )
}

export default page;