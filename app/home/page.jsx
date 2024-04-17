import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
import SaleButton from "@/components/SaleButton";
import { redirect } from "next/navigation";
import "../Styles/header.scss";
import SideBar from "@/components/SideBar";
import SaleCard from "@/components/SaleCard";
import MarketLine from "@/components/MarketLine";
import SaleComponent from "@/components/SaleComponent";
export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: existingUsers, error } = await supabase
    .from("users")
    .select()
    .eq("id", user?.id)
    .single();

  const { data: posts } = await supabase.from("posts").select();

  if (!existingUsers) {
    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert([{ id: user?.id, user_mail: user?.email }]);
  }

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col  items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 header">
        <div className="w-full m-4 flex justify-between items-center p-3 text-sm">
          <h1 className="logo-text">BuyInCyprus</h1>
          <div className="flex items-center gap-10">
            <SaleButton></SaleButton>
            <AuthButton />
          </div>
        </div>
        
    
      </nav>

      <div className="animate-in flex-1 flex flex-col  opacity-0 w-full ">
        <MarketLine></MarketLine>

        <SaleComponent user={existingUsers} post={posts}></SaleComponent>

        <SideBar />
        <main className="flex-1 flex flex-col gap-6"></main>
      </div>
    </div>
  );
}
