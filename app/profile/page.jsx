import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
import SaleButton from "@/components/SaleButton";
import { redirect } from "next/navigation";
import "../Styles/header.scss";
import SideBar from "@/components/SideBar";
import CreateProfile from "@/components/CreateProfile";
import { data } from "autoprefixer";
import Image from "next/image";
import { Alert } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';



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

  console.log(userData[0].user_name)
  return (
    <div className="flex-1 w-full flex flex-col  items-center">
     <Header></Header>

      <div className="animate-in flex-1 flex flex-col  opacity-0 w-full  ">
      {(userData[0].user_name ==  null || userData[0].user_name == "") && (
                <Alert className="flex w-full justify-center" icon={<CheckIcon fontSize="inherit" />} severity="warning">
                    <h1 className="text-center w-full">You need to finalize your profile.</h1>
                </Alert>
            )}
        <CreateProfile user={userData}></CreateProfile>
        <main className="flex-1 flex flex-col gap-6"></main>
      </div>
    
    </div>
  );
}
