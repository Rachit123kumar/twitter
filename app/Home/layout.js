import NavBar from "../_components/NavBar";
import Search from "../_components/Search";

export default function Layout({children}){

    return <div className="max-w-[1280px] mx-auto px-3 flex flex-1">
            {/* <Login/> */}
            {/* <AppBar /> */}

            <div className="hidden md:block">

          <NavBar />

            </div>
            <div className="flex-grow">
              {children}
            </div>

            <div className="px-2 hidden md:block">
              <Search />
            </div>
   </div>
}