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
import Image from "next/image";
import ChangingText from "../components/ChangingText";
import "./Styles/Landing.scss";
import Footer from "../components/Footer.jsx"

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

  if (user) {
    return redirect("/home");
  }
  return (
    <div className="flex-1 w-full flex flex-col items-center landing">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 header">
        <div className="w-full m-4 flex justify-between items-center p-3 text-sm">
          <Image
            alt="Logo"
            className=""
            src="https://cdn.jsdelivr.net/gh/Gorcc/cdn@main/marketplaceapp/ilancık%20(2).png"
            width={80}
            height={80}
          ></Image>
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>

      <div className="animate-in flex-1 flex flex-col h-full w-full">
        <main className="landing-1">
          <div className="main-left text-center">
            <h1 className="mt-20 font-bold flex justify-center items-center">
              Welcome to ilancık !
            </h1>
            <h2 className="font-bold text-l">Where you can Buy & Sell</h2>

            <ChangingText />
            <a href="/login">Get Started</a>
          </div>
          <div className="main-right">
            <Image
              src="https://cdn.jsdelivr.net/gh/Gorcc/cdn@main/marketplaceapp/Adsız%20tasarım%20(2).png"
              alt="Image"
              width={400}
              height={540}
            ></Image>
          </div>
        </main>
        <div className="landing-2 flex flex-col items-center justify-center">
          <h1 className="m-20">ANYTHING YOU'RE LOOKING FOR</h1>
          <div className="carousel flex carousel-center rounded-box">
            <div className="carousel-item">
              <img
                src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
                alt="Pizza"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg"
                alt="Pizza"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg"
                alt="Pizza"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg"
                alt="Pizza"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg"
                alt="Pizza"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg"
                alt="Pizza"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg"
                alt="Pizza"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
