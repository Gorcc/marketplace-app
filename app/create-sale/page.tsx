import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
import SaleButton from "@/components/SaleButton";
import { redirect } from "next/navigation";
import "../Styles/header.scss";
import SideBar from "@/components/SideBar";
import CreateSale from "@/components/CreateSale";
import { data } from "autoprefixer";
import Image from "next/image";
export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userData } = await supabase
    .from("users")
    .select()
    .eq("id", user?.id);

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col  items-center">
      <Header></Header>

      <div className="animate-in flex-1 flex flex-col  opacity-0 w-full  ">
        <CreateSale user={userData}></CreateSale>
        <main className="flex-1 flex flex-col gap-6"></main>
      </div>
    </div>
  );
}
