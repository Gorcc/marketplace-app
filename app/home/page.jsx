import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import SaleButton from "@/components/SaleButton";
import { redirect } from "next/navigation";
import "../Styles/header.scss";
import SideBar from "@/components/SideBar";
import SaleCard from "@/components/SaleCard";
import MarketLine from "@/components/MarketLine";
import SaleComponent from "@/components/SaleComponent";
import Image from "next/image";
import "../Styles/Landing.scss";
import { TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { faUserTag } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
export default async function ProtectedPage({ searchParams }) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: existingUsers, error } = await supabase
    .from("users")
    .select()
    .eq("id", user?.id)
    .single();

  if (!user) {
    return redirect("/login");
  }

  if (existingUsers.user_name == null || existingUsers.user_name == "") {
    return redirect("/profile");
  }

  const searchTerm = searchParams?.search || "";

  const { data: posts } = await supabase
    .from("posts")
    .select()
    .ilike("post_title", `%${searchTerm}%`);

  if (!existingUsers) {
    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert([{ id: user?.id, user_mail: user?.email }]);
  }

  return (
    <div className="flex-1 w-full flex flex-col  items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 header">
        <div className="w-full m-4 flex justify-between items-center p-3 text-sm">
          <div className="flex justify-center items-center">
            <Image
              className=""
              src="https://cdn.jsdelivr.net/gh/Gorcc/cdn@main/marketplaceapp/ilancık%20(2).png"
              width={100}
              height={100}
            ></Image>
            <form action="" method="GET" className="mx-12">
              <input
                type="text"
                name="search"
                placeholder="Search products"
                defaultValue={searchTerm}
              />
              <button type="submit">Send</button>
            </form>
          </div>

          <div className="flex header-items items-center gap-10">
          <a href="/wishlists"><FontAwesomeIcon className="mx-2" icon={faHeart}></FontAwesomeIcon>Wishlist</a>
            <SaleButton></SaleButton>
           
            <AuthButton />
          </div>
        </div>
      </nav>

      <div className="animate-in flex-1 flex flex-col  opacity-0 w-full ">
        <SaleComponent user={existingUsers} post={posts}></SaleComponent>

        <SideBar />
        <main className="flex-1 flex flex-col gap-6"></main>
      </div>
    </div>
  );
}
