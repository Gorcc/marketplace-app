import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import "./Styles/header.scss";
import SideBar from "@/components/SideBar";
import SaleCard from "@/components/SaleCard";
import { redirect } from "next/navigation";

export default async function Index() {
  const canInitSupabaseClient = () => {
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if(user){
    return redirect("/home");
  }
  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 header">
        <div className="w-full m-4 flex justify-between items-center p-3 text-sm">
          <h1 className="logo-text">BuyInCyprus</h1>
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>

      <div className="animate-in flex-1 flex flex-col h-full w-full">
        <main className="flex-1 flex flex-col gap-6 items-center justify-center">
          <h1>
            Welcome to <span className="font-bold">Buy In Cyprus</span>
          </h1>
          <h1>This page will be replaced soon, we are working on it.</h1>
        </main>
      </div>
    </div>
  );
}
