

import Product from "../../product";
import {FC} from "react";

interface pageProps{
   params: {slug: string}
}






const page: FC<pageProps> = ({params}) => {
   return (
      <Product></Product>
   )
}

export default page;