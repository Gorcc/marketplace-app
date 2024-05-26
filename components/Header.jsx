"use client"
import NextLogo from "./NextLogo";
import SupabaseLogo from "./SupabaseLogo";
import Image from "next/image";
import SaleButton from "./SaleButton";
import "../app/Styles/header.scss";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCartShopping, faHeart, faPerson, faUserTag } from "@fortawesome/free-solid-svg-icons";


const signOut = async () => {
  

  const supabase = createClient();
  await supabase.auth.signOut();
  
};
export default function Header() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 header">
      <div className="w-full m-4 flex justify-between items-center p-3 text-sm">
        <a href="/">
        <Image
          className=""
          src="https://cdn.jsdelivr.net/gh/Gorcc/cdn@main/marketplaceapp/ilancık%20(2).png"
          width={100}
          height={100}
        ></Image></a>
        <div className="flex header-items items-center gap-10">
          <a href="/wishlists"><FontAwesomeIcon className="mx-2" icon={faHeart}></FontAwesomeIcon>Wishlist</a>
          <a href="/profile"><FontAwesomeIcon className="mx-2" icon={faUserTag}></FontAwesomeIcon>Profile</a>
          <SaleButton></SaleButton>
          <a href="/checkout"><FontAwesomeIcon className="mx-2" icon={faCartShopping}></FontAwesomeIcon>Cart</a>
          <a className="cursor-pointer" onClick={signOut}><FontAwesomeIcon className="mx-2" icon={faArrowLeft}></FontAwesomeIcon>Logout</a>
        </div>
      </div>
    </nav>
  );
}
